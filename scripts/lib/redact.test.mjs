// Run with: npm run test:scripts   (node --test, no dependencies)
//
// Fixture secrets are assembled from fragments at runtime so this file never
// contains a scannable token literal (GitHub push protection would flag it).
import test from 'node:test'
import assert from 'node:assert/strict'
import { redact, residual, assertClean, redactAndVerify } from './redact.mjs'

const j = (...parts) => parts.join('')
const body = 'Ab3dE6gH9jK2mN5pQ8sT1vW4yZ7'

const SECRETS = {
    'stripe live secret': j('sk_', 'live_', body),
    'stripe test secret': j('sk_', 'test_', body),
    'stripe restricted': j('rk_', 'live_', body),
    'stripe publishable': j('pk_', 'test_', body),
    'stripe webhook': j('whsec_', body),
    'anthropic key': j('sk-', 'ant-api03-', body, '-AA'),
    'openai key': j('sk-', 'proj-', body, body),
    'github pat': j('ghp_', body, 'Ab3dE6gH9j'),
    'github fine-grained': j('github_', 'pat_', body, '_', body),
    'aws access key': j('AKIA', 'IOSFODNN7EXAMPLE'),
    'slack token': j('xox', 'b-123456789012-abcdefABCDEF'),
    'google api key': j('AIza', 'SyA-1234567890abcdefghijklmnopqrstu'),
    jwt: j('eyJ', 'hbGciOiJIUzI1NiJ9', '.eyJ', 'zdWIiOiIxMjM0NTY3ODkwIn0', '.', 'dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'),
    'bearer header': j('Authorization: Bearer ', 'abcdEFGH1234ijklMNOP5678'),
}

for (const [label, secret] of Object.entries(SECRETS)) {
    test(`redacts ${label}`, () => {
        const { text } = redact(`before ${secret} after`)
        assert.ok(!text.includes(secret.replace('Authorization: Bearer ', '')), `secret survived: ${text}`)
        assert.ok(text.includes('[REDACTED:'))
        assert.deepEqual(residual(text), [])
    })
}

test('redacts multi-line PEM private key blocks', () => {
    const pem = j('-----BEGIN ', 'RSA PRIVATE KEY-----\nMIIEow', 'IBAAKCAQEA1234\nabcdEFGH5678\n-----END ', 'RSA PRIVATE KEY-----')
    const { text } = redact(`key:\n${pem}\ndone`)
    assert.ok(!text.includes('MIIEow'))
    assert.ok(text.includes('done'))
    assert.deepEqual(residual(text), [])
})

test('redacts secret-looking env assignments but keeps the variable name', () => {
    const { text } = redact('STRIPE_SECRET_KEY=hunter2hunter2\nDATABASE_PASSWORD="p@ss w0rd"\napi_key: abc123')
    assert.ok(!text.includes('hunter2'))
    assert.ok(!text.includes('p@ss'))
    assert.ok(!text.includes('abc123'))
    assert.match(text, /STRIPE_SECRET_KEY=\[REDACTED:secret-assignment\]/)
    assert.deepEqual(residual(text), [])
})

test('redacts JSON-style secret fields', () => {
    const { text } = redact('{"client_secret": "shhh-not-a-real-value", "name": "ok"}')
    assert.ok(!text.includes('shhh-not-a-real-value'))
    assert.ok(text.includes('"name": "ok"'))
})

test('strips credentials from URLs but keeps scheme and host', () => {
    const { text } = redact('clone https://ryan:s3cretpass@github.com/supermanzer/repo.git now')
    assert.ok(!text.includes('s3cretpass'))
    assert.ok(text.includes('@github.com/supermanzer/repo.git'))
})

test('redacts secret query parameters but keeps the URL shape', () => {
    const { text } = redact('GET https://api.example.com/v1/x?page=2&token=abc123def456&sort=asc')
    assert.ok(!text.includes('abc123def456'))
    assert.ok(text.includes('page=2'))
    assert.ok(text.includes('sort=asc'))
})

test('redacts emails, including the owner’s', () => {
    const { text } = redact('mail ryan.manzer@gmail.com or a.b+c@sub.example.co.uk')
    assert.ok(!text.includes('ryan.manzer'))
    assert.ok(!text.includes('a.b+c'))
    assert.deepEqual(residual(text), [])
})

test('redacts IPv4 addresses but not loopback', () => {
    const { text } = redact('droplet 203.0.113.42, lan 192.168.1.20, local 127.0.0.1:8421')
    assert.ok(!text.includes('203.0.113.42'))
    assert.ok(!text.includes('192.168.1.20'))
    assert.ok(text.includes('127.0.0.1:8421'))
    assert.deepEqual(residual(text), [])
})

test('rewrites home directory paths to ~', () => {
    const { text } = redact('cd /Users/ryan/Projects/WebDev/app && ls /home/deploy/site C:\\Users\\Ryan\\code')
    assert.ok(!/\/Users\/ryan|\/home\/deploy|Users\\Ryan/.test(text))
    assert.ok(text.includes('~/Projects/WebDev/app'))
    assert.deepEqual(residual(text), [])
})

test("rewrites Claude Code's dashed project dir names", () => {
    const { text } = redact('-Users-ryan-Projects-WebDev-app')
    assert.ok(!text.includes('ryan'))
    assert.deepEqual(residual(text), [])
})

test('redacts UUIDs (session ids)', () => {
    const { text } = redact('session 315b626b-8b00-44ee-8f82-1403ae489bf6 ended')
    assert.ok(!text.includes('315b626b'))
})

test('redacts Luhn-valid card numbers only', () => {
    const { text } = redact('card 4242 4242 4242 4242 vs order 1234567890123456')
    assert.ok(!text.includes('4242 4242'))
    assert.ok(text.includes('1234567890123456'))
})

test('card redaction does not swallow the following space', () => {
    const { text } = redact('use 4000000000000259 to test')
    assert.equal(text, 'use [REDACTED:card-number] to test')
})

test('redacts long high-entropy blobs but leaves ordinary long words and shas alone', () => {
    const blob = 'x9Kq2LmZ8vB4nR7tY1cW5eH3jP6sD0fG2aQz'
    const sha = 'a'.repeat(0) + '9525024e89f68a3c4d5b6a7f8091a2b3c4d5e6f7'
    const { text } = redact(`token-ish ${blob}; commit ${sha}; word internationalizationconfigurationmanager`)
    assert.ok(!text.includes(blob))
    assert.ok(text.includes(sha))
    assert.ok(text.includes('internationalizationconfigurationmanager'))
})

test('leaves ordinary prose, versions, and the public domain untouched', () => {
    const prose = 'Upgraded to Nuxt 4.3.1 on supermanzer.io; fixed the 404 in blog/[...slug].vue (v0.1.6).'
    const { text, hits } = redact(prose)
    assert.equal(text, prose)
    assert.deepEqual(hits, {})
})

test('is idempotent', () => {
    const input = `${SECRETS['stripe live secret']} ryan.manzer@gmail.com /Users/ryan/x 203.0.113.9`
    const once = redact(input).text
    assert.equal(redact(once).text, once)
})

test('residual() catches unredacted secrets and reports rule names, not values', () => {
    const leaked = `oops ${SECRETS['github pat']}`
    assert.ok(residual(leaked).includes('github-token'))
    assert.throws(
        () => assertClean(leaked, 'draft'),
        (err) => /github-token/.test(err.message) && !err.message.includes(SECRETS['github pat']),
    )
})

test('redactAndVerify passes clean output through', () => {
    const { text } = redactAndVerify(`key ${SECRETS['stripe live secret']}`, 'draft')
    assert.deepEqual(residual(text), [])
})

test('supports per-machine literal and pattern rules', () => {
    const extra = [
        { name: 'custom', re: /my-droplet-host/gi },
        { name: 'custom', re: /acme-\w+/gi },
    ]
    const { text } = redact('ssh my-droplet-host for acme-client work', { extraRules: extra })
    assert.ok(!text.includes('my-droplet-host'))
    assert.ok(!text.includes('acme-client'))
    assert.deepEqual(residual(text, { extraRules: extra }), [])
})

test('handles multi-megabyte input in reasonable time', () => {
    const chunk = 'The quick brown fox jumps over the lazy dog. key: value token = 12 /Users/ryan/x\n'
    const big = chunk.repeat(60000) // ~5MB
    const start = Date.now()
    redact(big)
    assert.ok(Date.now() - start < 20000, `too slow: ${Date.now() - start}ms`)
})
