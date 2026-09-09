# TPT Weekly Visitor Question Report Worker

This Cloudflare Worker sends a weekly report from the public AI guide's
`QUESTION_LOG` KV namespace through a private Google Apps Script webhook.

## Delivery architecture

`QUESTION_LOG -> weekly Cloudflare Worker -> Google Apps Script -> founder@theperfectthingy.com`

The Worker does not need Cloudflare's paid Email Sending feature.

## Required Worker bindings / variables

- KV binding: `QUESTION_LOG` -> `tpt-public-ai-questions`
- Secret: `REPORT_WEBHOOK_URL` -> deployed Google Apps Script Web App URL
- Secret: `REPORT_WEBHOOK_SECRET` -> shared secret that must match the Apps Script property

## Weekly schedule

The Wrangler config includes:

`0 16 * * 1`

Cloudflare Cron Triggers use UTC. This is Monday morning in U.S. Pacific time
during daylight-saving time and Monday morning/early day in standard time.

## What the question log stores

Ordinary records:
- exact question text entered by the visitor
- timestamp/day
- broad topic
- generalized theme
- answered / partial / unknown status
- owner-review flag

Potential safety/abuse events may additionally retain:
- source IP address
- Cloudflare Ray ID

A safety flag is evidence for human review, not a conclusion about identity or intent.

## Report behavior

The weekly email contains:
1. Questions flagged for owner review, with exact wording.
2. Topic and theme counts.
3. Answer coverage and possible knowledge gaps.
4. Every exact question represented in that week's report.
5. Source IP and Cloudflare Ray ID only for flagged safety-evidence events.

After Google Apps Script confirms the email was sent successfully, the Worker
deletes the ordinary weekly event records represented in the report.
Separate safety-evidence copies remain for up to 180 days.

## Google Apps Script

Create a standalone Apps Script project with this code:

```javascript
const REPORT_TO = 'founder@theperfectthingy.com';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const expected = PropertiesService.getScriptProperties().getProperty('REPORT_WEBHOOK_SECRET');

    if (!expected || body.secret !== expected) {
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    if (body.source !== 'tpt-public-ai-weekly-report') {
      return jsonResponse({ ok: false, error: 'invalid source' });
    }

    const subject = String(body.subject || 'TPT Public AI Guide report').slice(0, 250);
    const text = String(body.text || '').slice(0, 100000);

    if (!text) {
      return jsonResponse({ ok: false, error: 'empty report' });
    }

    MailApp.sendEmail({
      to: REPORT_TO,
      subject: subject,
      body: text,
      name: 'The Perfect Thingy AI Guide',
      replyTo: REPORT_TO
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Then:
1. Project Settings -> Script Properties -> add `REPORT_WEBHOOK_SECRET`
   with a long random value.
2. Deploy -> New deployment -> Web app.
3. Execute as: Me.
4. Who has access: Anyone.
5. Copy the Web App URL.
6. In the Cloudflare Worker, add both the Web App URL and the same shared
   secret as encrypted secrets named `REPORT_WEBHOOK_URL` and
   `REPORT_WEBHOOK_SECRET`.

The Apps Script URL is reachable publicly, but the shared secret is required
before it will send mail.

## Failure behavior

If the webhook is unavailable, rejects the request, or does not explicitly
return `{"ok":true}`, the Worker does not delete that week's KV records.
