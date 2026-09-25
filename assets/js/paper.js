(function () {
  const D = window.SITE, U = window.UI;
  const id = new URLSearchParams(location.search).get("id");
  const p = D.publications.find(x => x.id === id);
  const root = document.getElementById("paper");

  if (!p) {
    root.innerHTML = `<div class="not-found"><a class="back" href="index.html#publications">${U.ICONS.back}All publications</a>
      <h1 style="font-family:var(--serif);font-weight:500">This project page doesn't exist</h1>
      <p>Check the link, or pick a paper from the publication list.</p></div>`;
    U.initChrome();
    return;
  }

  document.title = `${p.title.split(":")[0]} · K M Naimul Hassan`;

  const figs = (p.figures || []).map(f => `
    <figure class="figure"><img src="${f.src}" alt="${f.caption}" loading="lazy"><figcaption>${f.caption}</figcaption></figure>`);

  root.innerHTML = `
    <div class="paper-hero">
      <a class="back" href="index.html#pub-${p.id}">${U.ICONS.back}All publications</a>
      <h1>${p.title}</h1>
      <p class="authors">${U.authors(p.authors)}</p>
      ${p.authorNote ? `<p class="note">${p.authorNote}</p>` : ""}
      <p class="venue-line"><span class="venue">${p.venueLong || p.venue}</span>${U.statusTag(p.status)}</p>
      <div class="links">${U.linkButtons(p)}</div>
      ${p.tldr ? `<p class="tldr">${p.tldr}</p>` : ""}
    </div>

    ${figs.length ? `<section class="paper-section"><div class="figures">${figs[0]}</div></section>` : ""}

    <section class="paper-section">
      <h2>Abstract</h2>
      <p>${p.abstract}</p>
    </section>

    ${p.highlights && p.highlights.length ? `
    <section class="paper-section">
      <h2>Key results</h2>
      <ul class="highlights">${p.highlights.map(h => `<li>${h}</li>`).join("")}</ul>
    </section>` : ""}

    ${figs.length > 1 ? `
    <section class="paper-section">
      <h2>More figures</h2>
      <div class="figures">${figs.slice(1).join("")}</div>
    </section>` : ""}

    <section class="paper-section">
      <h2>Citation</h2>
      ${p.bibtex
        ? `<div class="bib"><pre id="bib">${p.bibtex}</pre><button class="btn" id="copy">${U.ICONS.copy}Copy</button></div>`
        : `<p>BibTeX will be added once the paper is published. Until then, please cite the dataset and code repository.</p>`}
    </section>`;

  const copy = document.getElementById("copy");
  if (copy) copy.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(p.bibtex); copy.innerHTML = `${U.ICONS.copy}Copied`; }
    catch { copy.innerHTML = `${U.ICONS.copy}Select and copy`; }
    setTimeout(() => (copy.innerHTML = `${U.ICONS.copy}Copy`), 2000);
  });

  U.initChrome();
})();
