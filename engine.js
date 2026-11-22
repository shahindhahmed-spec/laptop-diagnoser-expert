// محرك الاستنتاج (Inference Engine)
// answers: مصفوفة قيمها 'yes' أو 'no' أو 'skip'
function diagnose(fault, answers) {
  const scores = {};

  fault.qs.forEach((q, i) => {
    const a = answers[i];
    if (!a || a === "skip") return;
    const weights = a === "yes" ? q.y : q.n;
    if (!weights) return;
    for (const cause in weights) {
      scores[cause] = (scores[cause] || 0) + weights[cause];
    }
  });

  const total = Object.values(scores).reduce((s, v) => s + v, 0);

  const list = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({
      id,
      score,
      pct: Math.round((score / total) * 100),
      name: CAUSES[id].name,
      fix: CAUSES[id].fix
    }));

  return { total, list };
}