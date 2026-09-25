(function () {
  const D = window.SITE, U = window.UI, $ = s => document.querySelector(s);
  const P = D.profile;

  /* ---------- Hero ---------- */
  $("#hero-name").textContent = P.name;
  $("#hero-role").innerHTML = `${P.role}<strong>${P.org}</strong>`;
  $("#hero-bio").innerHTML = P.bio.map(p => `<p>${p}</p>`).join("");
  if (P.seeking) { const s = $("#hero-seeking"); s.textContent = P.seeking; s.hidden = false; }
  $("#hero-photo").src = P.photo;
  $("#hero-links").innerHTML = `
    <a class="btn primary" href="mailto:${P.email}">${U.ICONS.mail}Email</a>
    <a class="btn" href="${P.cv}">${U.ICONS.file}CV</a>
    <a class="btn" href="${P.links.scholar}">${U.ICONS.cap}Google Scholar</a>
    <a class="btn" href="${P.links.github}">GitHub</a>
    <a class="btn" href="${P.links.linkedin}">LinkedIn</a>`;
  window.drawTriad($("#signal-plot"));
  let rw; addEventListener("resize", () => { clearTimeout(rw); rw = setTimeout(() => { const el = $("#signal-plot"); if ((el.clientWidth < 620) !== (el.querySelector("svg").viewBox.baseVal.width < 700)) window.drawTriad(el); }, 200); });

  /* ---------- News ---------- */
  const SHOW = 4;
  $("#news-list").innerHTML = D.news.map((n, i) => `
    <li class="${i >= SHOW ? "hidden" : ""}">
      <time>${n.date}</time>
      <div>${n.type ? `<span class="kind k-${n.type.toLowerCase()}">${n.type}</span>` : ""}${n.html}${n.paper ? ` <a href="paper.html?id=${n.paper}">Read more</a>` : ""}</div>
    </li>`).join("");
  const moreBtn = $("#news-more");
  if (D.news.length > SHOW) {
    moreBtn.hidden = false;
    moreBtn.addEventListener("click", () => {
      const expanded = moreBtn.getAttribute("aria-expanded") === "true";
      document.querySelectorAll("#news-list li").forEach((li, i) => { if (i >= SHOW) li.classList.toggle("hidden", expanded); });
      moreBtn.setAttribute("aria-expanded", String(!expanded));
      moreBtn.textContent = expanded ? `Show all ${D.news.length} updates` : "Show fewer";
    });
    moreBtn.textContent = `Show all ${D.news.length} updates`;
  }

  /* ---------- Research threads ---------- */
  $("#threads").innerHTML = D.research.map(r => `
    <div class="thread c-${r.color || "scarlet"}">
      <h3>${r.title}</h3>
      <p>${r.text}</p>
      ${r.paper ? `<a href="paper.html?id=${r.paper}">See the project</a>` : `<span class="ongoing">In progress</span>`}
    </div>`).join("");

  /* ---------- Publications ---------- */
  $("#pubs").innerHTML = D.publicationGroups.map(g => {
    const items = D.publications.filter(p => p.group === g.id);
    if (!items.length) return "";
    return `<div class="pub-group c-${g.color || "scarlet"}"><h3><span class="dot"></span>${g.label}</h3>${items.map(p => `
      <article class="pub" id="pub-${p.id}">
        <a class="thumb" href="paper.html?id=${p.id}" aria-label="Project page for ${p.title}"><img src="${p.thumb}" alt="" loading="lazy"></a>
        <div>
          <h4><a href="paper.html?id=${p.id}">${p.title}</a></h4>
          <p class="authors">${U.authors(p.authors)}</p>
          <p class="venue-line"><span class="venue">${p.venue}</span>${U.statusTag(p.status)}</p>
          <div class="actions">
            ${U.linkButtons(p, { project: true })}
            <button class="btn abstract-toggle" aria-expanded="false" aria-controls="abs-${p.id}">Abstract ${U.ICONS.chevron}</button>
          </div>
          <div class="abstract" id="abs-${p.id}"><div><p>${p.abstract}</p></div></div>
        </div>
      </article>`).join("")}</div>`;
  }).join("");

  document.querySelectorAll(".abstract-toggle").forEach(b => b.addEventListener("click", () => {
    const box = document.getElementById(b.getAttribute("aria-controls"));
    const open = box.classList.toggle("open");
    b.setAttribute("aria-expanded", String(open));
  }));

  /* ---------- Experience & education ---------- */
  $("#exp-list").innerHTML = D.experience.map((e, i) => `
    <div class="entry ${i === 0 ? "current" : ""} ${e.logo ? "has-logo" : ""}">
      ${e.logo ? `<img class="logo" src="${e.logo}" alt="${e.org} logo" width="44" height="44">` : ""}
      <h4>${e.role}</h4>
      <p class="org">${e.org}</p>
      <p class="meta">${e.dates}, ${e.place}</p>
      <ul>${e.points.map(x => `<li>${x}</li>`).join("")}</ul>
    </div>`).join("");
  $("#edu-list").innerHTML = D.education.map((e, i) => `
    <div class="entry ${i === 0 ? "current" : ""} ${e.logo ? "has-logo" : ""}">
      ${e.logo ? `<img class="logo" src="${e.logo}" alt="${e.org} logo" width="44" height="44">` : ""}
      <h4>${e.degree}</h4>
      <p class="org">${e.org}</p>
      <p class="meta">${e.dates}</p>
      ${e.note ? `<p class="note">${e.note}</p>` : ""}
    </div>`).join("");

  /* ---------- Projects ---------- */
  $("#project-list").innerHTML = D.projects.map(p => `
    <div class="project ${p.img ? "" : "no-img"}">
      ${p.img ? `<img src="${p.img}" alt="" loading="lazy">` : ""}
      <div>
        <h4>${p.title}</h4>
        <p class="meta">${p.venue}${p.result ? `, <span class="result">${p.result}</span>` : ""}</p>
        <p>${p.text} ${p.paper ? `<a class="more" href="paper.html?id=${p.paper}">Paper</a>` : p.report ? `<a class="more" href="${p.report}">Report</a>` : ""}</p>
      </div>
    </div>`).join("");

  /* ---------- Awards ---------- */
  $("#award-list").innerHTML = D.awards.map(a => `
    <li><span class="t">${a.title}<span class="o">${a.org}</span></span><span class="y">${a.year}</span></li>`).join("");

  /* ---------- Contact ---------- */
  const mail = $("#contact-mail"); mail.href = `mailto:${P.email}`; mail.textContent = P.email;

  /* ---------- Active nav link ---------- */
  const links = [...document.querySelectorAll(".nav a[href^='#']")];
  const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => spy.observe(s));

  U.initChrome();
})();
