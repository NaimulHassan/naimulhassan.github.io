/* Standalone, tabbed project page: paper.html?id=<publication id> */
(function () {
  const D = window.SITE, U = window.UI, X = window.PROJECTS || {};
  const id = new URLSearchParams(location.search).get("id");
  const p = D.publications.find(x => x.id === id);
  const root = document.getElementById("paper");

  if (!p) {
    root.innerHTML = `<div class="not-found"><h1>This project page doesn't exist</h1><p>Please check the link.</p></div>`;
    return;
  }
  const x = X[id] || { sections: [] };
  document.title = p.title.split(":")[0];

  /* ---------- helpers ---------- */
  const sup = a => a && a.length ? `<sup>${a.join(",")}</sup>` : "";
  const authors = p.authors.map((a, i) => `<span class="au">${a}${sup(x.authorAff && x.authorAff[i])}</span>`).join(", ");
  const affs = (x.affiliations || []).map((a, i) =>
    `<span>${x.authorAff && x.affiliations.length > 1 ? `<sup>${i + 1}</sup>` : ""}${a}</span>`).join("");
  const logos = (x.logos || []).map(l => `<img src="${l.src}" alt="${l.alt}" title="${l.alt}">`).join("");

  function block(b) {
    if (b.p) return `<p>${b.p}</p>`;
    if (b.list) return `<ul class="highlights">${b.list.map(i => `<li>${i}</li>`).join("")}</ul>`;
    if (b.fig) return `<figure class="figure"><img src="${b.fig}" alt="" loading="lazy"><figcaption>${b.caption || ""}</figcaption></figure>`;
    if (b.stats) return `<div class="stats">${b.stats.map(([v, l]) => `<div class="stat"><b>${v}</b><span>${l}</span></div>`).join("")}</div>`;
    if (b.cards) return `<div class="cards">${b.cards.map(([t, h]) => `<div class="card"><h3>${t}</h3><p>${h}</p></div>`).join("")}</div>`;
    if (b.links) return `<div class="links">${b.links.map(([l, h]) => `<a class="btn primary" target="_blank" rel="noopener" href="${h}">${l}</a>`).join("")}</div>`;
    if (b.table) {
      const t = b.table, hi = new Set(t.hi || []);
      return `<figure class="table-wrap"><div class="table-scroll"><table>
        <thead><tr>${t.head.map(h => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${t.rows.map((r, i) => `<tr class="${hi.has(i) ? "hi" : ""}">${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div>${t.caption ? `<figcaption>${t.caption}</figcaption>` : ""}</figure>`;
    }
    return "";
  }

  function citation() {
    const fund = x.funding ? `<p class="funding">${x.funding}</p>` : "";
    return (p.bibtex
      ? `<div class="bib"><pre>${p.bibtex}</pre><button class="btn" id="copy">${U.ICONS.copy}Copy</button></div>`
      : `<p>BibTeX will be added once the paper is published.</p>`) + fund;
  }

  const sections = x.sections.length ? x.sections : [
    { id: "overview", title: "Overview", blocks: [{ p: p.abstract }] },
    { id: "citation", title: "Citation", blocks: "citation" }
  ];

  /* ---------- page ---------- */
  root.innerHTML = `
    <header class="proj-hero">
      <h1>${p.title}</h1>
      <p class="proj-authors">${authors}</p>
      ${affs ? `<p class="proj-affs">${affs}</p>` : ""}
      ${logos ? `<div class="proj-logos">${logos}</div>` : ""}
      <p class="venue-line">${U.venue(p, true)}${U.statusTag(p.status)}${p.degreeTag ? `<span class="tag degree">${p.degreeTag}</span>` : ""}</p>
      <div class="links">${U.linkButtons(p)}</div>
      ${p.tldr ? `<p class="tldr">${p.tldr}</p>` : ""}
    </header>

    <nav class="proj-tabs" aria-label="Sections"><div class="proj-tabs-inner">
      ${sections.map((s, i) => `<a href="#${s.id}" class="${i ? "" : "active"}">${s.title}</a>`).join("")}
    </div></nav>

    ${sections.map(s => `
      <section class="proj-section" id="${s.id}">
        <h2>${s.title}</h2>
        ${s.blocks === "citation" ? citation() : s.blocks.map(block).join("")}
      </section>`).join("")}
  `;

  /* ---------- tab highlighting on scroll ---------- */
  const tabs = [...document.querySelectorAll(".proj-tabs a")];
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) tabs.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-30% 0px -60% 0px" });
  document.querySelectorAll(".proj-section").forEach(s => spy.observe(s));

  const copy = document.getElementById("copy");
  if (copy) copy.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(p.bibtex); copy.innerHTML = `${U.ICONS.copy}Copied`; }
    catch { copy.innerHTML = `${U.ICONS.copy}Select and copy`; }
    setTimeout(() => (copy.innerHTML = `${U.ICONS.copy}Copy`), 2000);
  });

  U.initChrome();
})();
