/* Shared helpers for index.html and paper.html */
(function () {
  const S = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"';
  const ICONS = {
    mail: `<svg ${S}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
    file: `<svg ${S}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>`,
    code: `<svg ${S}><path d="m8 7-5 5 5 5M16 7l5 5-5 5"/></svg>`,
    data: `<svg ${S}><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>`,
    page: `<svg ${S}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 13h8M8 16h5"/></svg>`,
    cap: `<svg ${S}><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5"/></svg>`,
    chevron: `<svg ${S}><path d="m6 9 6 6 6-6"/></svg>`,
    back: `<svg ${S}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>`,
    copy: `<svg ${S}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>`,
    menu: `<svg ${S} width="24" height="24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`
  };

  const ME = /^K\s?M\s+Naimul\s+Hassan\*?$/;
  function authors(list) {
    return list.map(a => ME.test(a) ? `<span class="me">${a}</span>` : a).join(", ");
  }

  function statusTag(status) {
    const s = (status || "").toLowerCase();
    const cls = s === "published" ? "published" : s === "preprint" ? "preprint" : "review";
    return `<span class="tag ${cls}">${status}</span>`;
  }

  function linkButtons(p, opts = {}) {
    const L = p.links || {};
    const out = [];
    if (opts.project) out.push(`<a class="btn primary" href="paper.html?id=${p.id}">${ICONS.page}Project page</a>`);
    if (L.paper) out.push(`<a class="btn" href="${L.paper}">${ICONS.file}Paper</a>`);
    if (L.code) out.push(`<a class="btn" href="${L.code}">${ICONS.code}Code</a>`);
    if (L.dataset) out.push(`<a class="btn" href="${L.dataset}">${ICONS.data}Dataset</a>`);
    return out.join("");
  }

  /* ---------- Signal strip: EEG channels + a speech envelope ---------- */
  function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }

  function drawSignal(el, opts = {}) {
    if (!el) return;
    const W = 1000, rowH = opts.compact ? 16 : 20, channels = opts.channels || 5;
    const speechH = opts.compact ? 46 : 64;
    const H = channels * rowH + speechH + 36;
    const N = 260, dx = W / (N - 1);
    const rand = rng(opts.seed || 7);

    // Speech envelope: syllable-like bursts
    const bursts = [];
    let t = 6;
    while (t < N - 8) { const len = 6 + Math.floor(rand() * 12); bursts.push([t, len, .35 + rand() * .65]); t += len + 2 + Math.floor(rand() * 9); }
    const env = new Array(N).fill(0);
    bursts.forEach(([s, len, a]) => { for (let i = 0; i < len && s + i < N; i++) env[s + i] = Math.max(env[s + i], a * Math.sin(Math.PI * (i + .5) / len)); });

    const baseY = channels * rowH + speechH + 6;
    let speech = `M0 ${baseY}`;
    env.forEach((v, i) => { speech += ` L${(i * dx).toFixed(1)} ${(baseY - v * speechH).toFixed(1)}`; });

    // EEG: noise + slow rhythm + a lagged, weak copy of the envelope
    const lag = 7;
    let eeg = "";
    for (let c = 0; c < channels; c++) {
      const y0 = 10 + c * rowH + rowH / 2, f = .12 + rand() * .18, ph = rand() * 6, w = .25 + rand() * .35;
      let d = "";
      for (let i = 0; i < N; i++) {
        const tracked = (env[Math.max(0, i - lag)] || 0) * w;
        const v = .35 * Math.sin(i * f + ph) + .45 * (rand() - .5) + tracked - w * .3;
        d += `${i ? "L" : "M"}${(i * dx).toFixed(1)} ${(y0 - v * rowH * .55).toFixed(1)}`;
      }
      eeg += `<path class="eeg draw ch${c % 3}" d="${d}"/>`;
    }

    // Highlight window around one burst in the middle
    const mid = bursts[Math.floor(bursts.length / 2)] || [N / 2, 12];
    const wx = mid[0] * dx - 6, ww = (mid[1] + lag) * dx + 12;

    el.innerHTML = `
      <svg viewBox="0 -4 ${W} ${H}" role="img" aria-label="Five grey EEG traces above a scarlet speech envelope, with a highlighted window where they line up in time.">
        <rect class="window fade-late" x="${wx.toFixed(1)}" y="0" width="${ww.toFixed(1)}" height="${baseY + 2}" rx="4"/>
        <line class="window-edge fade-late" x1="${wx.toFixed(1)}" x2="${wx.toFixed(1)}" y1="0" y2="${baseY + 2}"/>
        <line class="window-edge fade-late" x1="${(wx + ww).toFixed(1)}" x2="${(wx + ww).toFixed(1)}" y1="0" y2="${baseY + 2}"/>
        ${eeg}
        <path class="speech draw late" d="${speech}"/>
        <text class="label" x="0" y="${H - 8}">EEG</text>
        <text class="label hot" x="36" y="${H - 8}">Speech envelope</text>
      </svg>`;

    el.querySelectorAll(".draw").forEach(p => p.style.setProperty("--len", Math.ceil(p.getTotalLength())));
  }

  /* ---------- Header: shadow on scroll, progress bar, mobile menu ---------- */
  function initChrome() {
    const header = document.querySelector(".site-header");
    const bar = document.getElementById("progress");
    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("scrolled", y > 8);
      if (bar) {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const btn = document.querySelector(".menu-btn"), nav = document.querySelector(".nav");
    if (btn && nav) {
      btn.innerHTML = ICONS.menu;
      btn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", open);
      });
      nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }));
    }
    const yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();
  }

  window.UI = { ICONS, authors, statusTag, linkButtons, drawSignal, initChrome };
})();
