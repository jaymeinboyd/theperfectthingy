import hashlib
import json
import tempfile
import unittest
from pathlib import Path
from controller import guarded_request, ReLifeError

class GateTests(unittest.TestCase):
    def test_fail_closed(self):
        with tempfile.TemporaryDirectory() as d:
            vault = Path(d)
            path = vault / 'core.md'
            content = b'Companion name: Rowan.\nRule: disclose failed verification.\n'
            path.write_bytes(content)
            manifest = {'schema':'tpt-relife/0.4','files':[{'path':'core.md','bytes':len(content),'sha256':hashlib.sha256(content).hexdigest()}]}
            (vault/'manifest.json').write_text(json.dumps(manifest))
            calls = []
            def model(instructions, message):
                calls.append((instructions, message))
                return 'model called'
            self.assertEqual(guarded_request(vault,'hello',model),'model called')
            self.assertIn('Rowan', calls[0][0])
            self.assertEqual(len(calls),1)
            path.write_bytes(content[:-5])
            with self.assertRaises(ReLifeError): guarded_request(vault,'hello',model)
            self.assertEqual(len(calls),1)
            path.write_bytes(content.replace(b'Rowan',b'Ronan'))
            with self.assertRaises(ReLifeError): guarded_request(vault,'hello',model)
            self.assertEqual(len(calls),1)
            path.unlink()
            with self.assertRaises(ReLifeError): guarded_request(vault,'hello',model)
            self.assertEqual(len(calls),1)

if __name__=='__main__': unittest.main(verbosity=2)
