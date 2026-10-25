/**
 * TPT ReLife Gate 0.1 — synthetic local-file proof of concept.
 * Run: node prototypes/relife-gate-01.mjs
 * No credentials, no network, no model requests, no customer vault access.
 */
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import assert from 'node:assert/strict';

const sha256 = data => createHash('sha256').update(data).digest('hex');
const encoder = new TextEncoder();

export async function verifyAndPrepare({ root, manifest }) {
  if (manifest.schema !== 'tpt-relife-manifest/0.1') throw Error('Unsupported manifest');
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) throw Error('Empty manifest');
  const seen = new Set();
  const verified = [];
  for (const item of manifest.files) {
    if (!item.path || typeof item.path !== 'string' || seen.has(item.path)) throw Error('Invalid/duplicate path');
    seen.add(item.path);
    const base = resolve(root);
    const target = resolve(base, item.path);
    if (!target.startsWith(base + sep)) throw Error('Path outside vault');
    if (!Number.isSafeInteger(item.bytes) || item.bytes < 1 || !/^[a-f0-9]{64}$/.test(item.sha256)) throw Error('Invalid manifest entry');
    let bytes;
    try { bytes = await readFile(target); } catch { throw Error('Missing required file: ' + item.path); }
    if (bytes.length !== item.bytes) throw Error('Incomplete file: ' + item.path);
    if (sha256(bytes) !== item.sha256) throw Error('Hash mismatch: ' + item.path);
    verified.push({ path: item.path, text: new TextDecoder('utf-8', { fatal: true }).decode(bytes) });
  }
  // Only verified files are released, in manifest order.
  return Object.freeze({ status: 'VERIFIED', files: verified });
}

export async function guardedSession({ root, manifest, firstMessage, deliver }) {
  // deliver is the model entry point; never called on failure.
  const prepared = await verifyAndPrepare({ root, manifest });
  return deliver({ verifiedFiles: prepared.files, firstMessage });
}

async function selfTest() {
  const root = await mkdtemp(join(tmpdir(), 'tpt-relife-test-'));
  try {
    await mkdir(join(root, 'core'));
    const path = 'core/START.md';
    const original = '# Synthetic ReLife Core\nRule: do not claim success before verification.\n';
    await writeFile(join(root, path), original);
    const manifest = { schema: 'tpt-relife-manifest/0.1', files: [{
      path, bytes: encoder.encode(original).length, sha256: sha256(encoder.encode(original))
    }] };
    let calls = 0;
    const deliver = ({ verifiedFiles, firstMessage }) => { calls++; return { verifiedFiles, firstMessage }; };
    const success = await guardedSession({ root, manifest, firstMessage: 'Hello', deliver });
    assert.equal(success.verifiedFiles[0].text, original);
    assert.equal(calls, 1);
    await writeFile(join(root, path), original.slice(0, -12));
    await assert.rejects(guardedSession({ root, manifest, firstMessage: 'Hello', deliver }), /Incomplete file/);
    assert.equal(calls, 1, 'Truncated file must never reach model');
    await rm(join(root, path));
    await assert.rejects(guardedSession({ root, manifest, firstMessage: 'Hello', deliver }), /Missing required file/);
    assert.equal(calls, 1, 'Missing file must never reach model');
    console.log('PASS: complete file opens; truncated and missing files fail closed.');
  } finally { await rm(root, { recursive: true, force: true }); }
}
if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  selfTest().catch(e => { console.error(e); process.exitCode = 1; });
}
