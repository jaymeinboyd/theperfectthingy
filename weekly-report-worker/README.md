# TPT Weekly Visitor Question Report Worker

This Cloudflare Worker sends the founder a weekly report generated from the
same `QUESTION_LOG` KV namespace used by the public AI guide.

## What the question log stores

- exact question text entered by the visitor
- timestamp/day
- broad topic
- generalized theme
- answered / partial / unknown status
- owner-review flag

It does **not** intentionally store visitor IP address, location, or device
identity in the question log.

The public guide's per-IP rate limiter is separate and temporary.

## Report behavior

The weekly email contains:

1. Questions flagged for owner review, with exact wording.
2. Topic and theme counts.
3. Answer coverage and possible knowledge gaps.
4. Every exact question represented in that week's report.

A review flag is a prompt for human attention, not a claim that a visitor is
dangerous or has malicious intent.

After the email sends successfully, the reported KV records are deleted.
The email becomes the retained weekly archive.

## Cloudflare setup

### 1. Create one KV namespace

Create a Workers KV namespace named something recognizable, for example:

`tpt-public-ai-questions`

Bind that **same namespace** to:

- the existing The Perfect Thingy Pages project as `QUESTION_LOG`
- this weekly-report Worker as `QUESTION_LOG`

### 2. Onboard theperfectthingy.com to Cloudflare Email Sending

In Cloudflare:

Compute -> Email Service -> Email Sending -> Onboard Domain

Use:

- sender: `reports@theperfectthingy.com`
- recipient: `founder@theperfectthingy.com`

### 3. Add an Email binding to this Worker

Binding name:

`EMAIL`

Restrict the destination to `founder@theperfectthingy.com` if desired.

### 4. Add a weekly Cron Trigger

Suggested schedule:

`0 16 * * 1`

Cloudflare Cron Triggers use UTC. This sends on Monday afternoon UTC,
which is Monday morning in the U.S. Pacific time zone.

### 5. Deploy and test

Before relying on the weekly schedule, use Cloudflare's Worker testing tools
to trigger the scheduled handler once and confirm that the report arrives.

## Data retention

The public guide gives new question records a 35-day TTL as a fail-safe.
Normally they are removed much sooner: immediately after a successful weekly
report email.
