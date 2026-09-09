const REPORT_TO = "founder@theperfectthingy.com";
const REPORT_FROM = "reports@theperfectthingy.com";
const GUIDE_NAME = "The Perfect Thingy Public AI Guide";

function cleanLine(value) {
  return String(value || "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function listEvents(env) {
  const events = [];
  let cursor;

  do {
    const page = await env.QUESTION_LOG.list({
      prefix: "event:",
      limit: 1000,
      ...(cursor ? { cursor } : {})
    });

    const names = page.keys.map((key) => key.name);

    for (let i = 0; i < names.length; i += 100) {
      const batch = names.slice(i, i + 100);
      const values = await env.QUESTION_LOG.get(batch);

      for (const key of batch) {
        const raw = values.get(key);
        if (!raw) continue;

        try {
          const record = JSON.parse(raw);
          events.push({
            key,
            timestamp: cleanLine(record.timestamp),
            day: cleanLine(record.day),
            question: cleanLine(record.question),
            topic: cleanLine(record.topic) || "Other",
            theme: cleanLine(record.theme) || "uncategorized question",
            status: cleanLine(record.status) || "partial",
            review: record.review === true,
            safetyCapture: record.safetyCapture === true,
            sourceIp: cleanLine(record.sourceIp),
            cfRay: cleanLine(record.cfRay)
          });
        } catch {
          // Leave malformed records in KV for manual inspection rather than deleting them.
        }
      }
    }

    if (page.list_complete) break;
    cursor = page.cursor;
  } while (cursor);

  return events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

function countBy(events, field) {
  const counts = new Map();

  for (const event of events) {
    const label = event[field] || "Other";
    counts.set(label, (counts.get(label) || 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });
}

function bullets(entries, limit = 20) {
  if (!entries.length) return "  None";

  return entries
    .slice(0, limit)
    .map(([label, count]) => `  • ${label}: ${count}`)
    .join("\n");
}

function questionLines(events) {
  if (!events.length) return "  None";

  return events
    .map((event, index) => {
      const flag = event.review ? " [REVIEW]" : "";
      const safety = event.safetyCapture ? " [SAFETY EVIDENCE PRESERVED]" : "";
      const lines = [
        `${index + 1}. ${event.timestamp || event.day}${flag}${safety}`,
        `   Topic: ${event.topic} | Status: ${event.status} | Theme: ${event.theme}`,
        `   Question: ${event.question || "(empty question)"}`
      ];

      if (event.safetyCapture) {
        lines.push(`   Source IP: ${event.sourceIp || "unavailable"}`);
        lines.push(`   Cloudflare Ray ID: ${event.cfRay || "unavailable"}`);
      }

      return lines.join("\n");
    })
    .join("\n\n");
}

function buildReport(events) {
  const today = new Date().toISOString().slice(0, 10);
  const flagged = events.filter((event) => event.review);
  const gaps = events.filter(
    (event) => event.status === "unknown" || event.status === "partial"
  );

  const topicCounts = countBy(events, "topic");
  const themeCounts = countBy(events, "theme");
  const statusCounts = countBy(events, "status");
  const gapThemeCounts = countBy(gaps, "theme");

  const days = events.map((event) => event.day).filter(Boolean).sort();
  const period = days.length
    ? `${days[0]} through ${days[days.length - 1]}`
    : "since the previous report";

  const text = [
    `Weekly visitor-question report for ${GUIDE_NAME}`,
    `Report date: ${today}`,
    `Period represented: ${period}`,
    `Questions represented: ${events.length}`,
    "",
    "QUESTIONS TO REVIEW",
    flagged.length
      ? "These were flagged because their wording or topic may warrant owner review. A flag is not a conclusion about the visitor's intent."
      : "No questions were flagged for owner review.",
    "",
    questionLines(flagged),
    "",
    "WHAT PEOPLE ARE ASKING ABOUT",
    bullets(topicCounts),
    "",
    "COMMON THEMES",
    bullets(themeCounts, 25),
    "",
    "HOW WELL THE CURRENT PUBLIC KNOWLEDGE COVERED THEM",
    bullets(statusCounts),
    "",
    "POSSIBLE KNOWLEDGE GAPS TO REVIEW",
    gaps.length
      ? bullets(gapThemeCounts, 25)
      : "  None — all logged questions were classified as answered.",
    "",
    "ALL QUESTIONS — EXACT WORDING",
    questionLines(events),
    "",
    "PRIVACY / RETENTION",
    "The ordinary question log stores the exact text entered, timestamp, topic, generalized theme, answer-status classification, and review flag.",
    "Ordinary question records do not store visitor IP address, location, or device identity.",
    "If a question is flagged for a potential safety or abuse concern, the source IP address and Cloudflare Ray ID may be preserved with that question. This is evidence for human review, not proof of the visitor's identity or intent.",
    "After this email is sent successfully, the weekly event records represented here are deleted. Safety-evidence copies are retained separately for up to 180 days unless they expire or are handled through a later retention process."
  ].join("\n");

  return {
    subject: `What People Are Asking — ${GUIDE_NAME}`,
    text
  };
}

async function deleteEvents(env, events) {
  for (let i = 0; i < events.length; i += 100) {
    const batch = events.slice(i, i + 100);
    await Promise.all(batch.map((event) => env.QUESTION_LOG.delete(event.key)));
  }
}

async function sendReport(env) {
  if (!env.QUESTION_LOG) {
    throw new Error("QUESTION_LOG KV binding is missing.");
  }

  if (!env.EMAIL) {
    throw new Error("EMAIL send binding is missing.");
  }

  const events = await listEvents(env);
  const report = buildReport(events);

  await env.EMAIL.send({
    to: REPORT_TO,
    from: REPORT_FROM,
    subject: report.subject,
    text: report.text
  });

  if (events.length) {
    await deleteEvents(env, events);
  }

  return events.length;
}

export default {
  async scheduled(controller, env, ctx) {
    await sendReport(env);
  }
};
