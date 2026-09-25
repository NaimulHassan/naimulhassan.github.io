/* Hero visual: brain, behavior, and speech signals converging on attention */
(function () {
  function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }

  const ICON = {
    // simple line icons drawn around (0,0), ~34px
    brain: `<path d="M-4 -15c-6-3-13 1-13 7-5 1-7 7-4 11-3 4 0 10 5 10 1 5 8 7 12 3V-15z M4 -15c6-3 13 1 13 7 5 1 7 7 4 11 3 4 0 10-5 10-1 5-8 7-12 3V-15z M-9 -4c3 0 5 2 5 5 M9 -4c-3 0 -5 2 -5 5 M-11 8c3-1 5 0 7 2 M11 8c-3-1-5 0-7 2"/>`,
    eye: `<path d="M-18 0c5-9 11-13 18-13s13 4 18 13c-5 9-11 13-18 13s-13-4-18-13z"/><circle cx="0" cy="0" r="6"/><circle cx="0" cy="0" r="1.6" class="fill"/>`,
    speech: `<path d="M-17 -6v12 M-11 -12v24 M-5 -4v8 M1 -15v30 M7 -8v16 M13 -11v22 M19 -3v6"/>`
  };

  function draw(el) {
    if (!el) return;
    const narrow = el.clientWidth < 620;
    const W = narrow ? 470 : 1000;
    const lanes = [
      { key: "brain", label: "Brain", sub: "EEG", cls: "t-brain" },
      { key: "eye", label: "Behavior", sub: "eye gaze", cls: "t-beh" },
      { key: "speech", label: "Speech", sub: "what they hear", cls: "t-speech" }
    ];
    const laneH = narrow ? 70 : 76, top = 44, H = top + laneH * 2 + 70;
    const x0 = narrow ? 150 : 232, x1 = narrow ? 345 : 740;   // trace span
    const nodeX = W - (narrow ? 40 : 90), nodeY = top + laneH;
    const N = narrow ? 110 : 230, dx = (x1 - x0) / (N - 1);
    const r = rng(21);

    const paths = lanes.map((ln, k) => {
      const y = top + k * laneH;
      let d = "";
      if (ln.key === "brain") {
        for (let i = 0; i < N; i++) {
          const v = 7 * Math.sin(i * .55) * (0.6 + .4 * Math.sin(i * .05)) + 9 * (r() - .5) + 4 * Math.sin(i * .13);
          d += `${i ? "L" : "M"}${(x0 + i * dx).toFixed(1)} ${(y + v).toFixed(1)}`;
        }
      } else if (ln.key === "eye") {
        // gaze scanpath: fixations (circles sized by duration) joined by saccades
        const pts = [];
        let x = x0 + 4;
        while (x < x1 - 4) {
          pts.push([x, y + (r() - .5) * 30, 2.5 + r() * (narrow ? 5 : 7)]);
          x += (narrow ? 14 : 22) + r() * (narrow ? 16 : 30);
        }
        d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("");
        ln.fix = pts.map(p => `<circle class="fix" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${p[2].toFixed(1)}"/>`).join("");
      } else {
        // speech: waveform bars with syllable envelopes
        let i = 0;
        while (i < N) {
          const len = 6 + Math.floor(r() * 12), a = .35 + r() * .65;
          for (let j = 0; j < len && i < N; j++, i++) {
            const h = a * 18 * Math.sin(Math.PI * (j + .5) / len) * (.55 + .45 * r());
            const x = (x0 + i * dx).toFixed(1);
            d += `M${x} ${(y - h).toFixed(1)}L${x} ${(y + h).toFixed(1)}`;
          }
          i += 1 + Math.floor(r() * 4);
        }
      }
      const join = `M${x1 + 6} ${y} C${x1 + (nodeX - x1) * .55} ${y}, ${nodeX - 70} ${nodeY}, ${nodeX - 26} ${nodeY}`;
      const labelX = narrow ? 58 : 70;
      return `
        <g class="lane ${ln.cls}">
          <g class="icon" transform="translate(${narrow ? 22 : 26} ${y})">${ICON[ln.key]}</g>
          <text class="lbl" x="${labelX}" y="${y - 2}">${ln.label}</text>
          <text class="sub" x="${labelX}" y="${y + 16}">${ln.sub}</text>
          <path class="trace draw" d="${d}"/>${ln.fix ? `<g class="fixes fade-mid">${ln.fix}</g>` : ""}
          <path class="join draw late" d="${join}"/>
        </g>`;
    }).join("");

    el.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Three signals from a listener: brain activity, behavior such as gaze and head motion, and speech, converging on where their attention goes.">
        ${paths}
        <g class="node fade-late" transform="translate(${nodeX} ${nodeY})">
          <circle r="25" class="ring"/>
          <circle r="16" class="ring2"/>
          <circle r="6" class="core"/>
          <text class="lbl center" y="50">Attention</text>
        </g>
      </svg>`;
    el.querySelectorAll(".draw").forEach(p => p.style.setProperty("--len", Math.ceil(p.getTotalLength())));
  }

  window.drawTriad = draw;
})();
