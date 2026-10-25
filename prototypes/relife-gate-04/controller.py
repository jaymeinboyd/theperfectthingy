"""TPT ReLife Controller 0.4. Standard-library-only, local customer vault."""
import hashlib
import json
from pathlib import Path

class ReLifeError(Exception):
    pass

def load_verified(vault: Path):
    vault = Path(vault).resolve()
    try:
        manifest = json.loads((vault / 'manifest.json').read_text(encoding='utf-8'))
    except (OSError, ValueError) as exc:
        raise ReLifeError('Manifest missing or invalid') from exc
    if manifest.get('schema') != 'tpt-relife/0.4' or not isinstance(manifest.get('files'), list) or not manifest['files']:
        raise ReLifeError('Unsupported or empty manifest')
    verified = []
    seen = set()
    for entry in manifest['files']:
        try:
            rel = entry['path']
            expected_size = entry['bytes']
            expected_hash = entry['sha256']
            if not isinstance(rel, str) or not rel or rel in seen or not isinstance(expected_size, int) or expected_size <= 0 or not isinstance(expected_hash, str) or len(expected_hash) != 64:
                raise ValueError()
            seen.add(rel)
            path = (vault / rel).resolve()
            if not path.is_relative_to(vault) or path == vault:
                raise ValueError()
            data = path.read_bytes()
        except (KeyError, ValueError, OSError) as exc:
            raise ReLifeError('Missing or invalid required file: ' + str(entry.get('path', '?'))) from exc
        if len(data) != expected_size:
            raise ReLifeError('Truncated/incorrect length: ' + rel)
        if hashlib.sha256(data).hexdigest() != expected_hash:
            raise ReLifeError('Altered file: ' + rel)
        try:
            content = data.decode('utf-8')
        except UnicodeDecodeError as exc:
            raise ReLifeError('Invalid text encoding: ' + rel) from exc
        verified.append({'path': rel, 'content': content})
    return verified

def guarded_request(vault, message, send_to_model):
    verified = load_verified(vault)
    instructions = '\n\n'.join(f"--- {f['path']} ---\n{f['content']}" for f in verified)
    return send_to_model(instructions, message)
