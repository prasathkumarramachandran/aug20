const topics = [
  {
    id: "factory-floor",
    label: "Factory Floor Edge",
    x: 12,
    y: 21,
    summary: "Devices generate operational, quality, maintenance, and sensor events close to production lines across global factories.",
    questions: [
      "Which machines and systems produce events in this layer?",
      "Why is local collection important before sending events onward?",
      "Which event types would you separate early, and why?"
    ],
    keywords: ["CNC", "PLC", "robot", "vision", "sensor", "local", "event"],
    hints: "Listen for concrete device sources: CNC machines, PLC controllers, robotic arms, vision inspection, barcode scanners, operator stations, and environmental sensors. Direction: ask how noisy raw signals become business events."
  },
  {
    id: "global-factories",
    label: "12 Global Factories",
    x: 52,
    y: 18,
    summary: "The diagram shows geographically distributed factories, so latency and standardization become central design concerns.",
    questions: [
      "What changes when the same architecture runs in 12 factories?",
      "How would you handle factory-specific network conditions?",
      "What should be standardized globally versus configured locally?"
    ],
    keywords: ["12", "global", "latency", "standard", "factory", "regional", "resilience"],
    hints: "Strong answers mention one edge gateway per factory, common schemas, local buffering, regional differences, observability, and avoiding long-haul operational dependency."
  },
  {
    id: "edge-gateway",
    label: "Factory Edge Gateway",
    x: 52,
    y: 47,
    summary: "The edge gateway is the collection and normalization point between factory devices and the downstream event platform.",
    questions: [
      "What responsibilities belong in the edge gateway?",
      "How should it behave during cloud or network outages?",
      "How would you secure and manage device identity here?"
    ],
    keywords: ["gateway", "normalize", "buffer", "cache", "registry", "security", "offline"],
    hints: "Look for normalization, protocol translation, local cache, device registry, authentication, retry, deduplication, and backpressure. Direction: ask what must still work if the WAN link is down."
  },
  {
    id: "mqtt-edge",
    label: "MQTT and Local Rules",
    x: 19,
    y: 76,
    summary: "Factory edge computing uses MQTT brokers, local cache, device registry, and rules to decouple machines from central services.",
    questions: [
      "Why use MQTT at the factory edge?",
      "What should the local rules engine decide before Kafka ingest?",
      "What data should be cached locally?"
    ],
    keywords: ["MQTT", "rules", "cache", "registry", "analytics", "filter", "offline"],
    hints: "Expected points: lightweight pub/sub, local analytics, filtering, alarm decisions, device registry, cached state, and resilient store-and-forward behavior."
  },
  {
    id: "kafka",
    label: "Kafka Cluster and Topics",
    x: 50,
    y: 75,
    summary: "Kafka separates production, machine-health, quality, and downtime event streams for scalable downstream processing.",
    questions: [
      "Why split events into these Kafka topics?",
      "How would you choose partitions and keys?",
      "What causes Kafka ingest rate limit risk here?"
    ],
    keywords: ["Kafka", "topic", "partition", "key", "throughput", "schema", "backpressure"],
    hints: "Good answers cover topic separation by domain, partitioning by factory/machine/line, schema governance, throughput limits, ordering, replay, and backpressure."
  },
  {
    id: "processing",
    label: "Processing Services",
    x: 82,
    y: 63,
    summary: "Processing services consume events and route curated data into lake, SQL, and time-series stores.",
    questions: [
      "What processing should happen before persistence?",
      "How would services scale with two million events per hour?",
      "Where can service compute bottlenecks appear?"
    ],
    keywords: ["processing", "scale", "consumer", "enrich", "aggregate", "compute", "bottleneck"],
    hints: "Listen for stream processing, consumer groups, enrichment, validation, aggregation, autoscaling, idempotency, and bottleneck detection through lag and service metrics."
  },
  {
    id: "storage",
    label: "Manufacturing Data Stores",
    x: 86,
    y: 82,
    summary: "Different stores serve different query patterns: lake for historical analytics, SQL for transactional views, and time series for telemetry trends.",
    questions: [
      "Which data belongs in each storage target?",
      "How would you prevent duplicate or inconsistent writes?",
      "How would you support analytics and operational dashboards?"
    ],
    keywords: ["data lake", "SQL", "time series", "telemetry", "analytics", "idempotent", "dashboard"],
    hints: "Expected direction: data lake for raw/curated history, SQL for production records, time-series DB for telemetry, plus idempotent writes and lineage."
  },
  {
    id: "risks",
    label: "Architecture Risks",
    x: 70,
    y: 51,
    summary: "The diagram calls out latency, Kafka ingest limits, service compute bottlenecks, and general downstream risk points.",
    questions: [
      "Which risk would you address first and why?",
      "What metrics would prove the architecture is healthy?",
      "How would you design graceful degradation?"
    ],
    keywords: ["latency", "rate limit", "bottleneck", "lag", "monitoring", "degradation", "SLA"],
    hints: "Look for prioritization: avoid long-haul dependency, monitor Kafka lag and throughput, autoscale processors, buffer locally, alert on data freshness and error rates."
  }
];

const scenarioSections = [
  {
    title: "Company Context",
    body: "Imagine you have joined a global manufacturing company that produces industrial equipment across 12 factories in regions including Europe, Asia, North America, and South America."
  },
  {
    title: "Factory Event Sources",
    body: "Each factory has CNC machines, PLC controllers, robotic arms, conveyor systems, environmental sensors, barcode scanners, and vision-based quality inspection stations. These devices generate approximately two million events every hour. The events include machine start and stop signals, completed and rejected parts, temperature and vibration readings, quality inspection results, operator activity, downtime alerts, and maintenance notifications."
  },
  {
    title: "Edge and Cloud Flow",
    body: "Within each factory, events first pass through an edge gateway. The gateway provides device authentication, local buffering, filtering, and store-and-forward capability when the cloud connection is unavailable. Events are then transmitted through MQTT into a centrally hosted cloud platform."
  },
  {
    title: "Kafka and Microservices",
    body: "In the cloud, the events enter a shared Kafka cluster. Separate topics are used for production, machine health, quality, downtime, operator, and maintenance events. Several microservices consume those events: Production, Quality, Downtime, Operator, and Maintenance."
  },
  {
    title: "Data and Dashboards",
    body: "The services use a shared PostgreSQL environment for operational data and a shared Redis cluster for frequently accessed machine, operator, shift, and production information. A stream-processing layer calculates OEE, yield, throughput, machine utilization, downtime trends, and scrap rate. Results are written to analytics storage and displayed through factory-manager, operations, maintenance, and executive dashboards."
  },
  {
    title: "Monitoring and Deployment",
    body: "Monitoring currently includes infrastructure metrics, application logs, distributed tracing, alerts, and Kafka consumer-lag monitoring. A Data Quality Service appears in the architecture, but its coverage and operational effectiveness are unclear. The platform is currently deployed in one primary cloud region, even though factories are globally distributed."
  },
  {
    title: "Business Problems",
    body: "First, physical production records sometimes show 10,000 completed units while the executive dashboard shows only 9,200, so factory managers are losing trust. Second, recorded downtime has increased by 18 percent even though machine-health telemetry shows the machines are largely healthy. Third, at the 6 AM, 2 PM, and 10 PM shift changes, Kafka consumer lag increases significantly and dashboards can be delayed by approximately 20 minutes. The company also expects to expand from 12 factories to 62 factories."
  },
  {
    title: "Candidate Instruction",
    body: "Treat this as a living production system. Explain your assumptions, develop hypotheses, describe what evidence you would collect, and then describe technical improvements you would consider. You may ask clarifying questions about the scenario."
  }
];

const challenges = [
  {
    id: "reconciliation",
    title: "Challenge 1: Dashboard Trust and Production Count Mismatch",
    prompt: "Physical production records show 10,000 completed units while the executive dashboard shows 9,200. How would you approach this without jumping directly to a fix?",
    candidateFocus: [
      "State assumptions about event completeness, duplicate handling, late events, rejected parts, and dashboard aggregation windows.",
      "Develop hypotheses for missing, delayed, filtered, duplicated, or incorrectly joined production events.",
      "Explain what evidence you would collect across edge gateway, MQTT, Kafka, services, PostgreSQL, Redis, stream processing, and dashboard queries."
    ],
    interviewerDirection: "Look for a methodical reconciliation plan from machine and edge counts to Kafka offsets, service processing, database writes, analytics aggregates, and dashboard filters. Strong candidates protect factory-manager trust while keeping executives informed.",
    keywords: ["reconcile", "source of truth", "late events", "duplicates", "schema", "Kafka offsets", "aggregation window", "dashboard filter", "data quality", "audit trail"]
  },
  {
    id: "downtime",
    title: "Challenge 2: Downtime Increased but Machines Look Healthy",
    prompt: "Recorded downtime increased by 18 percent, while machine-health telemetry indicates the machines are mostly healthy. What hypotheses would you form and how would you validate them?",
    candidateFocus: [
      "Separate real downtime from classification, operator, shift, maintenance, connectivity, and rules-engine issues.",
      "Consider whether downtime events are being over-counted, joined to wrong machines, delayed, or triggered by non-machine causes.",
      "Describe evidence from telemetry, operator activity, maintenance notifications, quality stops, gateway buffering, and service logic."
    ],
    interviewerDirection: "Listen for candidates who do not blame the machines too early. Good answers include downtime taxonomy, event correlation, rule changes, shift patterns, maintenance windows, operator workflows, and customer impact.",
    keywords: ["classification", "operator", "shift", "maintenance", "connectivity", "correlation", "taxonomy", "rule", "false positive", "machine health"]
  },
  {
    id: "shift-lag",
    title: "Challenge 3: Shift-Change Lag and 24/7 Dashboards",
    prompt: "At 6 AM, 2 PM, and 10 PM shift changes, Kafka consumer lag spikes and dashboards are delayed by about 20 minutes. How would you respond technically and operationally?",
    candidateFocus: [
      "Explain why shift changes can cause event bursts, cache churn, operator activity spikes, or downstream database contention.",
      "Describe immediate mitigations, monitoring evidence, and longer-term scaling or partitioning improvements.",
      "Address 24/7 operations: who is paged, what the customer-facing message is, and what service level is acceptable."
    ],
    interviewerDirection: "Strong answers combine Kafka consumer lag analysis with incident management. Look for capacity testing, partition strategy, consumer groups, backpressure, Redis/PostgreSQL bottlenecks, runbooks, escalation, and communication during live production.",
    keywords: ["consumer lag", "shift change", "burst", "partition", "consumer group", "backpressure", "database contention", "runbook", "pager", "SLA"]
  },
  {
    id: "global-scale",
    title: "Challenge 4: Expansion from 12 to 62 Factories",
    prompt: "The company plans to expand from 12 factories to 62 factories while the platform is deployed in one primary cloud region. What would you change first, and what would you deliberately postpone?",
    candidateFocus: [
      "Discuss latency, regional resilience, edge autonomy, data sovereignty, Kafka capacity, schema governance, and operational rollout.",
      "Prioritize improvements for reliability and evidence collection before large architectural rewrites.",
      "Explain phased migration, rollback, and factory-by-factory onboarding controls."
    ],
    interviewerDirection: "Look for pragmatic sequencing. Strong candidates avoid a grand redesign as the first step, but still recognize regional deployment, capacity planning, observability, schema standards, and factory onboarding automation.",
    keywords: ["62 factories", "regional", "latency", "resilience", "capacity", "schema governance", "rollout", "data sovereignty", "edge autonomy", "migration"]
  },
  {
    id: "stakeholders",
    title: "Challenge 5: Stakeholder Conflict and Customer-Centric Recovery",
    prompt: "Factory managers have lost trust in dashboards, executives want a single number, operations wants speed, and maintenance says telemetry proves machines are healthy. How would you manage the conflict while production continues 24/7?",
    candidateFocus: [
      "Identify stakeholders and their incentives: factory managers, executives, operations, maintenance, data/platform teams, and customers impacted by delivery risk.",
      "Explain how you would communicate uncertainty, align on a temporary source of truth, and create a recovery cadence.",
      "Show how technical investigation, customer impact, and production continuity influence priorities."
    ],
    interviewerDirection: "This is the behavioral and leadership challenge. Listen for customer empathy, calm conflict handling, transparent communication, incident command, clear ownership, and decisions that protect production while restoring trust.",
    keywords: ["stakeholder", "customer", "source of truth", "communication", "incident", "priority", "ownership", "trust", "24/7", "conflict"]
  }
];

const storageKeys = {
  candidateNotes: "factoryInterview.candidateNotes",
  candidateProgress: "factoryInterview.candidateProgress",
  timerEnd: "factoryInterview.timerEnd",
  interviewerState: "factoryInterview.challengeState"
};

let selectedTopic = topics[0];
let timerInterval;

document.addEventListener("DOMContentLoaded", () => {
  renderHotspots();
  renderScenarioSections();

  if (document.body.dataset.page === "candidate") {
    initCandidatePage();
  }

  if (document.body.dataset.page === "interviewer") {
    initInterviewerPage();
  }
});

function renderHotspots() {
  const container = document.querySelector("#hotspots");
  container.innerHTML = topics.map((topic, index) => `
    <button class="hotspot" type="button" style="left: ${topic.x}%; top: ${topic.y}%;" data-topic-id="${topic.id}" aria-label="${topic.label}">${index + 1}</button>
  `).join("");

  container.addEventListener("click", (event) => {
    const button = event.target.closest(".hotspot");
    if (!button) return;
    selectTopic(button.dataset.topicId);
  });
}

function selectTopic(topicId) {
  selectedTopic = topics.find((topic) => topic.id === topicId) || topics[0];
  document.querySelectorAll(".hotspot").forEach((button) => {
    button.classList.toggle("active", button.dataset.topicId === selectedTopic.id);
  });

  const topicTitle = document.querySelector("#topic-title");
  const topicSummary = document.querySelector("#topic-summary");
  if (topicTitle) topicTitle.textContent = selectedTopic.label;
  if (topicSummary) topicSummary.textContent = selectedTopic.summary;

  const questionList = document.querySelector("#question-list");
  if (questionList) {
    questionList.innerHTML = selectedTopic.questions.map((question) => `<div class="question-item">${question}</div>`).join("");
  }

}

function renderScenarioSections() {
  const container = document.querySelector("#scenario-sections");
  if (!container) return;

  container.innerHTML = scenarioSections.map((section) => `
    <article class="content-card">
      <h2>${section.title}</h2>
      <p>${section.body}</p>
    </article>
  `).join("");
}

function initCandidatePage() {
  renderCandidateChallenges();
  initStudyTimer();
}

function renderCandidateChallenges() {
  const container = document.querySelector("#candidate-challenges");
  if (!container) return;

  container.innerHTML = challenges.map((challenge) => `
    <article class="challenge-card">
      <p class="eyebrow">Candidate challenge</p>
      <h2>${challenge.title}</h2>
      <p class="challenge-prompt">${challenge.prompt}</p>
      <ul>
        ${challenge.candidateFocus.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

function initStudyTimer() {
  const timerText = document.querySelector("#study-timer");
  const toggleButton = document.querySelector("#timer-toggle");
  const resetButton = document.querySelector("#timer-reset");
  if (!timerText || !toggleButton || !resetButton) return;

  toggleButton.addEventListener("click", () => {
    const activeEnd = Number(localStorage.getItem(storageKeys.timerEnd));
    if (activeEnd && activeEnd > Date.now()) {
      localStorage.removeItem(storageKeys.timerEnd);
      toggleButton.textContent = "Start";
      updateTimerDisplay(timerText, 300);
      window.clearInterval(timerInterval);
      return;
    }

    localStorage.setItem(storageKeys.timerEnd, String(Date.now() + 300000));
    toggleButton.textContent = "Pause";
    runTimer(timerText, toggleButton);
  });

  resetButton.addEventListener("click", () => {
    localStorage.removeItem(storageKeys.timerEnd);
    toggleButton.textContent = "Start";
    updateTimerDisplay(timerText, 300);
    window.clearInterval(timerInterval);
  });

  const savedEnd = Number(localStorage.getItem(storageKeys.timerEnd));
  if (savedEnd && savedEnd > Date.now()) {
    toggleButton.textContent = "Pause";
    runTimer(timerText, toggleButton);
  } else {
    updateTimerDisplay(timerText, 300);
  }
}

function runTimer(timerText, toggleButton) {
  window.clearInterval(timerInterval);
  timerInterval = window.setInterval(() => {
    const endTime = Number(localStorage.getItem(storageKeys.timerEnd));
    const secondsLeft = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    updateTimerDisplay(timerText, secondsLeft);

    if (secondsLeft <= 0) {
      window.clearInterval(timerInterval);
      localStorage.removeItem(storageKeys.timerEnd);
      toggleButton.textContent = "Start";
    }
  }, 250);
}

function updateTimerDisplay(timerText, secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  timerText.textContent = `${minutes}:${seconds}`;
}

function initInterviewerPage() {
  renderInterviewerChallenges();

  document.querySelector("#reset-scores")?.addEventListener("click", () => {
    localStorage.removeItem(storageKeys.interviewerState);
    renderInterviewerChallenges();
    updateOverallScore();
  });
  updateOverallScore();
}

function renderInterviewerChallenges() {
  const state = getInterviewerState();
  const container = document.querySelector("#interviewer-challenges");
  if (!container) return;

  container.innerHTML = challenges.map((challenge) => {
    const saved = state[challenge.id] || {};
    const score = Number.isFinite(saved.score) ? saved.score : null;
    return `
      <article class="challenge-card interviewer-card" data-challenge-id="${challenge.id}">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Interviewer challenge</p>
            <h2>${challenge.title}</h2>
          </div>
          <span class="status-badge ${score === null ? "pending" : scoreClass(score)}">${score === null ? "Pending" : scoreStatus(score)}</span>
        </div>
        <p class="challenge-prompt">${challenge.prompt}</p>
        <div class="guidance-box">
          <strong>Direction to listen for</strong>
          <p>${challenge.interviewerDirection}</p>
        </div>
        <label>
          Candidate answer
          <textarea class="answer-input" rows="7" placeholder="Record the candidate answer for this challenge.">${saved.answer || ""}</textarea>
        </label>
        <label>
          Expected keywords
          <textarea class="keywords-input" rows="3">${saved.keywords || challenge.keywords.join(", ")}</textarea>
        </label>
        <div class="card-actions">
          <button class="primary-button validate-button" type="button">Validate</button>
          <span class="score-pill">${score === null ? "0%" : `${score}%`}</span>
        </div>
        <div class="keyword-results">${renderKeywordChips(saved.matches || [])}</div>
      </article>
    `;
  }).join("");

  container.querySelectorAll(".interviewer-card").forEach((card) => {
    card.querySelector(".validate-button").addEventListener("click", () => validateChallenge(card));
    card.querySelectorAll("textarea").forEach((textarea) => {
      textarea.addEventListener("input", () => saveChallengeDraft(card));
    });
  });
}

function validateChallenge(card) {
  const challengeId = card.dataset.challengeId;
  const answer = card.querySelector(".answer-input").value;
  const keywords = parseKeywords(card.querySelector(".keywords-input").value);
  const matches = keywords.map((keyword) => ({
    keyword,
    hit: answer.toLowerCase().includes(keyword.toLowerCase())
  }));
  const hitCount = matches.filter((match) => match.hit).length;
  const score = keywords.length ? Math.round((hitCount / keywords.length) * 100) : 0;

  const state = getInterviewerState();
  state[challengeId] = {
    answer,
    keywords: card.querySelector(".keywords-input").value,
    score,
    matches
  };
  localStorage.setItem(storageKeys.interviewerState, JSON.stringify(state));

  card.querySelector(".score-pill").textContent = `${score}%`;
  const badge = card.querySelector(".status-badge");
  badge.textContent = scoreStatus(score);
  badge.className = `status-badge ${scoreClass(score)}`;
  card.querySelector(".keyword-results").innerHTML = renderKeywordChips(matches);
  updateOverallScore();
}

function saveChallengeDraft(card) {
  const challengeId = card.dataset.challengeId;
  const state = getInterviewerState();
  state[challengeId] = {
    ...state[challengeId],
    answer: card.querySelector(".answer-input").value,
    keywords: card.querySelector(".keywords-input").value
  };
  localStorage.setItem(storageKeys.interviewerState, JSON.stringify(state));
}

function updateOverallScore() {
  const scoreTarget = document.querySelector("#overall-score");
  if (!scoreTarget) return;

  const state = getInterviewerState();
  const scoredChallenges = challenges.map((challenge) => state[challenge.id]?.score).filter(Number.isFinite);
  const overall = scoredChallenges.length ? Math.round(scoredChallenges.reduce((sum, score) => sum + score, 0) / scoredChallenges.length) : 0;
  scoreTarget.textContent = `${overall}%`;
}

function renderKeywordChips(matches) {
  return matches.map((match) => `<span class="keyword-chip ${match.hit ? "hit" : "miss"}">${match.hit ? "Hit" : "Miss"}: ${match.keyword}</span>`).join("");
}

function parseKeywords(value) {
  return value.split(",").map((keyword) => keyword.trim()).filter(Boolean);
}

function scoreClass(score) {
  if (score >= 75) return "pass";
  if (score >= 45) return "partial";
  return "miss";
}

function scoreStatus(score) {
  if (score >= 75) return "Green tick";
  if (score >= 45) return "Partial";
  return "Needs follow-up";
}

function scoreText(score) {
  if (score >= 75) return "Answer covers the expected direction.";
  if (score >= 45) return "Some important points are present.";
  return "Use hints to steer the candidate.";
}

function getInterviewerState() {
  return readJson(storageKeys.interviewerState, {});
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}