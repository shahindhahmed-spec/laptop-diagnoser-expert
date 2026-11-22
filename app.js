const $ = id => document.getElementById(id);
const SCREENS = ["loginScreen", "selectScreen", "quizScreen", "resultScreen", "summaryScreen"];

let user = null;
let selected = [];
let fIdx = 0, qIdx = 0;
let answers = [];
let curFault = null, curResult = null;
let results = [];
let needService = false;
let current = "loginScreen";
const openCats = new Set();

function show(id) {
  current = id;
  SCREENS.forEach(s => $(s).classList.toggle("hidden", s !== id));
  window.scrollTo(0, 0);
}

function findFault(id) {
  for (const c of CATEGORIES) {
    const f = c.faults.find(x => x.id === id);
    if (f) return Object.assign({ cat: c }, f);
  }
}

// ========== اللغة ==========
function applyLang() {
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
  document.title = t("appTitle");
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll("[data-ph]").forEach(el => el.placeholder = t(el.dataset.ph));
  $("langBtn").textContent = LANG === "ar" ? "EN" : "عربي";
  $("mapLink").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(t("mapQuery"));
  if (user) $("userName").textContent = "👤 " + user.name;
  updateCount();
}

function rerender() {
  if (current === "selectScreen") renderCategories();
  else if (current === "quizScreen") showQuestion();
  else if (current === "resultScreen") renderResult();
  else if (current === "summaryScreen") renderSummary();
}

$("langBtn").addEventListener("click", () => {
  LANG = LANG === "ar" ? "en" : "ar";
  try { localStorage.setItem("lt_lang", LANG); } catch (e) {}
  applyLang();
  rerender();
});

// ========== تسجيل الدخول ==========
function enter() {
  $("userName").textContent = "👤 " + user.name;
  $("userBox").classList.remove("hidden");
  selected = [];
  openCats.clear();
  renderCategories();
  show("selectScreen");
}

$("loginBtn").addEventListener("click", () => {
  const name = $("inName").value.trim();
  if (!name) { $("loginErr").classList.remove("hidden"); return; }
  user = { name: name, laptop: $("inLaptop").value.trim() };
  try { localStorage.setItem("lt_user", JSON.stringify(user)); } catch (e) {}
  $("loginErr").classList.add("hidden");
  enter();
});

$("logoutBtn").addEventListener("click", () => {
  try { localStorage.removeItem("lt_user"); } catch (e) {}
  user = null;
  selected = [];
  $("userBox").classList.add("hidden");
  $("inName").value = "";
  $("inLaptop").value = "";
  show("loginScreen");
});

// ========== الفئات والأعطال ==========
function renderCategories() {
  const list = $("catList");
  list.innerHTML = "";

  CATEGORIES.forEach(cat => {
    const div = document.createElement("div");
    div.className = "cat" + (openCats.has(cat.id) ? " open" : "");

    const head = document.createElement("button");
    head.className = "cat-head";
    head.innerHTML = `<span class="ico">${cat.icon}</span><span class="cname">${catName(cat)}</span><span class="count hidden" id="cnt-${cat.id}">0</span><span class="arrow">▾</span>`;
    head.addEventListener("click", () => {
      div.classList.toggle("open");
      if (div.classList.contains("open")) openCats.add(cat.id);
      else openCats.delete(cat.id);
    });

    const body = document.createElement("div");
    body.className = "cat-body";

    cat.faults.forEach(f => {
      const lbl = document.createElement("label");
      lbl.className = "fault";
      lbl.innerHTML = `<input type="checkbox" value="${f.id}" ${selected.includes(f.id) ? "checked" : ""}><span>${faultName(f)}</span>`;
      lbl.querySelector("input").addEventListener("change", e => {
        if (e.target.checked) selected.push(f.id);
        else selected = selected.filter(x => x !== f.id);
        updateCount();
        updateCatBadge(cat);
      });
      body.appendChild(lbl);
    });

    div.appendChild(head);
    div.appendChild(body);
    list.appendChild(div);
    updateCatBadge(cat);
  });
  updateCount();
}

function updateCatBadge(cat) {
  const n = cat.faults.filter(f => selected.includes(f.id)).length;
  const badge = $("cnt-" + cat.id);
  if (!badge) return;
  badge.textContent = n;
  badge.classList.toggle("hidden", n === 0);
}

function updateCount() {
  const n = selected.length;
  $("selCount").textContent = n ? t("selCount", { n: n }) : t("noSel");
  $("startBtn").disabled = n === 0;
}

// ========== التشخيص ==========
$("startBtn").addEventListener("click", () => {
  fIdx = 0;
  results = [];
  startFault();
});

function startFault() {
  curFault = findFault(selected[fIdx]);
  qIdx = 0;
  answers = [];
  showQuestion();
}

function showQuestion() {
  const total = curFault.qs.length;
  $("qFault").textContent = `${catName(curFault.cat)} › ${faultName(curFault)}`;
  $("qCount").textContent = t("qCount", { a: fIdx + 1, b: selected.length, c: qIdx + 1, d: total });
  $("qBar").style.width = (qIdx / total) * 100 + "%";
  $("qText").textContent = qText(curFault, qIdx);
  $("backBtn").classList.toggle("hidden", qIdx === 0);
  show("quizScreen");
}

function answer(a) {
  answers[qIdx] = a;
  qIdx++;
  if (qIdx >= curFault.qs.length) showResult();
  else showQuestion();
}

$("ansYes").addEventListener("click", () => answer("yes"));
$("ansNo").addEventListener("click", () => answer("no"));
$("ansSkip").addEventListener("click", () => answer("skip"));
$("backBtn").addEventListener("click", () => {
  qIdx--;
  answers.length = qIdx;
  showQuestion();
});

// ========== النتيجة ==========
function setRing(p) {
  $("ring").style.setProperty("--p", p);
  $("ringNum").textContent = p + "%";
}

function showResult() {
  curResult = diagnose(curFault, answers);
  needService = curResult.total === 0;
  if (needService) results.push({ fault: curFault, status: "service", cause: null });
  renderResult();
  show("resultScreen");
}

function renderResult() {
  $("rFault").textContent = `${catName(curFault.cat)} › ${faultName(curFault)}`;
  $("mapLink").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(t("mapQuery"));

  if (curResult.total === 0) {
    $("rCause").textContent = t("unknownCause");
    setRing(0);
    $("rFix").innerHTML = `<li>${t("notEnough1")}</li><li>${t("notEnough2")}</li>`;
    $("rOthers").innerHTML = "";
  } else {
    const top = curResult.list[0];
    $("rCause").textContent = causeName(top.id);
    setRing(top.pct);
    $("rFix").innerHTML = causeFix(top.id).map(s => `<li>${s}</li>`).join("");
    const others = curResult.list.slice(1, 3).filter(c => c.pct >= 15);
    $("rOthers").innerHTML = others.length
      ? `<div class="other">${t("otherCauses")} ${others.map(c => `${causeName(c.id)} (${c.pct}%)`).join(" — ")}</div>`
      : "";
  }
  $("fixedBox").classList.toggle("hidden", needService);
  $("notFixedBox").classList.toggle("hidden", !needService);
}

$("fixYes").addEventListener("click", () => {
  results.push({ fault: curFault, status: "fixed", cause: curResult.list[0].id });
  nextFault();
});

$("fixNo").addEventListener("click", () => {
  results.push({ fault: curFault, status: "service", cause: curResult.list[0].id });
  needService = true;
  renderResult();
});

$("nextBtn").addEventListener("click", nextFault);

function nextFault() {
  fIdx++;
  if (fIdx < selected.length) startFault();
  else { renderSummary(); show("summaryScreen"); }
}

// ========== الملخص ==========
function renderSummary() {
  $("sumList").innerHTML = results.map(r => {
    const tag = r.status === "fixed" ? t("fixedTag") : t("serviceTag");
    const cause = r.cause ? causeName(r.cause) : t("undetermined");
    return `<div class="sum-item ${r.status}">
      <strong>${faultName(r.fault)}</strong><br>
      <small>${catName(r.fault.cat)} — ${t("causeLbl")}: ${cause}</small><br>
      ${tag}
    </div>`;
  }).join("");
}

$("againBtn").addEventListener("click", () => {
  selected = [];
  openCats.clear();
  renderCategories();
  show("selectScreen");
});

// ========== التشغيل ==========
(function init() {
  applyLang();
  let saved = null;
  try { saved = localStorage.getItem("lt_user"); } catch (e) {}
  if (saved) { user = JSON.parse(saved); applyLang(); enter(); }
  else show("loginScreen");
})();