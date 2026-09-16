const GUIDE_NAME = "The Perfect Thingy Public AI Guide";
const LISTENING_NAME = "The Perfect Thingy Customer Listener";

function cleanLine(value) {
  return String(value || "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function listQuestionEvents(env) {
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

async function listFeedback(env) {
  const feedback = [];
  let cursor;

  do {
    const page = await env.QUESTION_LOG.list({
      prefix: "feedback:",
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
          const conversation = Array.isArray(record.conversation)
            ? record.conversation
                .filter(
                  (message) =>
                    message &&
                    (message.role === "user" || message.role === "assistant") &&
                    typeof message.content === "string"
                )
                .slice(-10)
                .map((message) => ({
                  role: message.role,
                  content: cleanLine(message.content).slice(0, 1800)
                }))
            : [];

          feedback.push({
            key,
            createdAt: cleanLine(record.createdAt || record.updatedAt),
            updatedAt: cleanLine(record.updatedAt || record.createdAt),
            day: cleanLine(record.day),
            sessionId: cleanLine(record.sessionId),
            conversation,
            signalType: cleanLine(record.signalType) || "other",
            theme: cleanLine(record.theme) || "uncategorized feedback",
            summary: cleanLine(record.summary) || "not yet summarized",
            need: cleanLine(record.need) || "not stated",
            workaround: cleanLine(record.workaround) || "not stated",
            frequency: cleanLine(record.frequency) || "not stated",
            impact: cleanLine(record.impact) || "not stated",
            status: cleanLine(record.status) || "in_progress",
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

  return feedback.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

function countBy(items, field) {
  const counts = new Map();

  for (const item of items) {
    const label = item[field] || "Other";
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

function feedbackLines(feedback) {
  if (!feedback.length) return "  None";

  return feedback
    .map((item, index) => {
      const flag = item.review ? " [REVIEW]" : "";
      const safety = item.safetyCapture ? " [SAFETY EVIDENCE PRESERVED]" : "";
      const customerMessages = item.conversation.filter((message) => message.role === "user");
      const exactWords = customerMessages.length
        ? customerMessages
            .map((message, messageIndex) => `      ${messageIndex + 1}. ${message.content}`)
            .join("\n")
        : "      (no visitor wording available)";

      const lines = [
        `${index + 1}. ${item.createdAt || item.day}${flag}${safety}`,
        `   Signal: ${item.signalType} | Status: ${item.status} | Theme: ${item.theme}`,
        `   Summary: ${item.summary}`,
        `   Need / desired outcome: ${item.need}`,
        `   Current workaround: ${item.workaround}`,
        `   Frequency: ${item.frequency}`,
        `   Impact: ${item.impact}`,
        "   Customer wording — exact messages:",
        exactWords
      ];

      if (item.safetyCapture) {
        lines.push(`   Source IP: ${item.sourceIp || "unavailable"}`);
        lines.push(`   Cloudflare Ray ID: ${item.cfRay || "unavailable"}`);
      }

      return lines.join("\n");
    })
    .join("\n\n");
}

function buildReport(events, feedback) {
  const today = new Date().toISOString().slice(0, 10);
  const flagged = events.filter((event) => event.review);
  const gaps = events.filter(
    (event) =>
      (event.status === "unknown" || event.status === "partial") &&
      event.review !== true &&
      event.safetyCapture !== true &&
      event.topic !== "Private or family information"
  );

  const questionTopicCounts = countBy(events, "topic");
  const questionThemeCounts = countBy(events, "theme");
  const questionStatusCounts = countBy(events, "status");
  const gapThemeCounts = countBy(gaps, "theme");

  const feedbackSignalCounts = countBy(feedback, "signalType");
  const feedbackThemeCounts = countBy(feedback, "theme");
  const feedbackStatusCounts = countBy(feedback, "status");
  const feedbackReview = feedback.filter((item) => item.review);

  const days = [
    ...events.map((event) => event.day),
    ...feedback.map((item) => item.day)
  ]
    .filter(Boolean)
    .sort();

  const period = days.length
    ? `${days[0]} through ${days[days.length - 1]}`
    : "since the previous report";

  const text = [
    "Weekly customer-learning report for The Perfect Thingy",
    `Report date: ${today}`,
    `Period represented: ${period}`,
    `Public-guide questions represented: ${events.length}`,
    `Customer-listening conversations represented: ${feedback.length}`,
    "",
    "============================================================",
    "WHAT CUSTOMERS ARE TELLING US",
    "============================================================",
    "",
    `Customer-listening source: ${LISTENING_NAME}`,
    "The listening system preserves the customer's exact messages and also supplies a neutral structured interpretation for clustering and review. The interpretation should never replace the source wording.",
    "",
    "SIGNAL TYPES",
    bullets(feedbackSignalCounts),
    "",
    "COMMON FEEDBACK THEMES",
    bullets(feedbackThemeCounts, 25),
    "",
    "CONVERSATION COMPLETION",
    bullets(feedbackStatusCounts),
    "",
    "FEEDBACK REQUIRING OWNER REVIEW",
    feedbackReview.length
      ? "These conversations were flagged for a privacy, safety, abuse, or other non-routine boundary reason. A flag is not a conclusion about the visitor's intent."
      : "No customer-listening conversations were flagged for owner review.",
    "",
    feedbackLines(feedbackReview),
    "",
    "ALL CUSTOMER FEEDBACK — SOURCE WORDING + INTERPRETATION",
    feedbackLines(feedback),
    "",
    "============================================================",
    "WHAT PEOPLE ARE ASKING",
    "============================================================",
    "",
    `Public-guide source: ${GUIDE_NAME}`,
    "",
    "QUESTIONS TO REVIEW",
    flagged.length
      ? "These were flagged because their wording or topic may warrant owner review. A flag is not a conclusion about the visitor's intent."
      : "No questions were flagged for owner review.",
    "",
    questionLines(flagged),
    "",
    "WHAT PEOPLE ARE ASKING ABOUT",
    bullets(questionTopicCounts),
    "",
    "COMMON QUESTION THEMES",
    bullets(questionThemeCounts, 25),
    "",
    "HOW WELL THE CURRENT PUBLIC KNOWLEDGE COVERED THEM",
    bullets(questionStatusCounts),
    "",
    "POSSIBLE KNOWLEDGE GAPS TO REVIEW",
    gaps.length
      ? bullets(gapThemeCounts, 25)
      : "  None — all logged questions were classified as answered.",
    "",
    "ALL QUESTIONS — EXACT WORDING",
    questionLines(events),
    "",
    "============================================================",
    "PRIVACY / RETENTION",
    "============================================================",
    "",
    "Ordinary public-guide question records store the exact text entered, timestamp, topic, generalized theme, answer-status classification, and review flag.",
    "Ordinary customer-listening records store the conversation text plus structured fields such as signal type, generalized theme, summary, stated need, workaround, frequency, impact, completion status, and review flag.",
    "Ordinary question and feedback records do not intentionally store visitor IP address, location, or device identity.",
    "If content is flagged for a potential safety or abuse concern, the source IP address and Cloudflare Ray ID may be preserved with that record. This is evidence for human review, not proof of the visitor's identity or intent.",
    "After this email is sent successfully, the ordinary question events and feedback snapshots represented here are deleted. Separate safety-evidence copies may remain for up to 180 days."
  ].join("\n");

  return {
    subject: "What People Are Asking and Telling Us — The Perfect Thingy",
    text
  };
}

async function deleteRecords(env, records) {
  for (let i = 0; i < records.length; i += 100) {
    const batch = records.slice(i, i + 100);
    await Promise.all(batch.map((record) => env.QUESTION_LOG.delete(record.key)));
  }
}

async function deliverReport(env, report) {
  if (!env.REPORT_WEBHOOK_URL) {
    throw new Error("REPORT_WEBHOOK_URL is missing.");
  }

  if (!env.REPORT_WEBHOOK_SECRET) {
    throw new Error("REPORT_WEBHOOK_SECRET is missing.");
  }

  const response = await fetch(env.REPORT_WEBHOOK_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      secret: env.REPORT_WEBHOOK_SECRET,
      source: "tpt-public-ai-weekly-report",
      subject: report.subject,
      text: report.text
    })
  });

  if (!response.ok) {
    throw new Error(`Report webhook failed with HTTP ${response.status}.`);
  }

  let result = null;
  try {
    result = await response.json();
  } catch {
    throw new Error("Report webhook did not return JSON confirmation.");
  }

  if (result?.ok !== true) {
    throw new Error("Report webhook did not confirm successful delivery.");
  }
}

async function sendReport(env) {
  if (!env.QUESTION_LOG) {
    throw new Error("QUESTION_LOG KV binding is missing.");
  }

  const [events, feedback] = await Promise.all([
    listQuestionEvents(env),
    listFeedback(env)
  ]);
  const report = buildReport(events, feedback);

  await deliverReport(env, report);

  if (events.length) await deleteRecords(env, events);
  if (feedback.length) await deleteRecords(env, feedback);

  return { questionCount: events.length, feedbackCount: feedback.length };
}

export default {
  async scheduled(controller, env, ctx) {
    console.log("[weekly-report] scheduled invocation started", {
      cron: controller.cron,
      scheduledTime: controller.scheduledTime
    });

    try {
      const counts = await sendReport(env);
      console.log("[weekly-report] completed successfully", counts);
    } catch (error) {
      console.error("[weekly-report] failed", {
        message: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }
};
