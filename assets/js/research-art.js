/* Small illustrations for the three research threads */
(function () {
  function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }
  const W = 300, H = 132;

  function eegPath(x0, x1, y, amp, seed) {
    const r = rng(seed), n = 70, dx = (x1 - x0) / (n - 1); let d = "";
    for (let i = 0; i < n; i++) {
      const v = amp * (.55 * Math.sin(i * .6) + .7 * (r() - .5) + .3 * Math.sin(i * .17));
      d += `${i ? "L" : "M"}${(x0 + i * dx).toFixed(1)} ${(y + v).toFixed(1)}`;
    }
    return d;
  }

  const ART = {
    align() {
      const r = rng(5); let bars = "", x = 24;
      while (x < 276) {
        const len = 3 + Math.floor(r() * 5), a = .4 + r() * .6;
        for (let j = 0; j < len && x < 276; j++, x += 4) {
          const h = a * 20 * Math.sin(Math.PI * (j + .5) / len);
          bars += `M${x} ${(96 - h).toFixed(1)}L${x} ${(96 + h).toFixed(1)}`;
        }
        x += 6 + Math.floor(r() * 8);
      }
      return `
        <rect x="118" y="14" width="64" height="106" rx="6" fill="var(--scarlet)" fill-opacity=".07" stroke="var(--scarlet)" stroke-dasharray="3 4" stroke-opacity=".6"/>
        <path d="${eegPath(24, 276, 40, 16, 3)}" fill="none" stroke="var(--indigo)" stroke-width="1.5"/>
        <path d="${bars}" stroke="var(--scarlet)" stroke-width="2" stroke-linecap="round"/>
        <path d="M150 60v14" stroke="var(--scarlet)" stroke-width="1.5" marker-end="url(#ah)"/>
        <text x="24" y="20" class="art-lbl">EEG</text><text x="24" y="128" class="art-lbl">Speech</text>`;
    },
    sense() {
      const spk = [[46, 38], [112, 20], [188, 20], [254, 38]];
      const s = spk.map(([x, y], i) => `
        <g transform="translate(${x} ${y})">
          <circle r="11" fill="${i === 2 ? "var(--scarlet)" : "var(--white)"}" stroke="${i === 2 ? "var(--scarlet)" : "var(--gray)"}" stroke-width="1.6"/>
          <path d="M-4 -3h3l4-3v12l-4-3h-3z" fill="${i === 2 ? "var(--white)" : "var(--gray)"}"/>
        </g>`).join("");
      return `
        <path d="M150 96 L184 34" stroke="var(--teal)" stroke-width="1.8" stroke-dasharray="4 4"/>
        <circle cx="178" cy="46" r="5" fill="var(--teal)" fill-opacity=".25" stroke="var(--teal)" stroke-width="1.4"/>
        <circle cx="168" cy="62" r="3.5" fill="var(--teal)" fill-opacity=".25" stroke="var(--teal)" stroke-width="1.2"/>
        ${s}
        <g transform="translate(150 104)">
          <ellipse rx="22" ry="20" fill="var(--white)" stroke="var(--ink)" stroke-width="1.6"/>
          <path d="M-6 -19l6 -8 6 8" fill="var(--white)" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/>
          <circle cx="-9" cy="-6" r="2.2" fill="var(--indigo)"/><circle cx="0" cy="-10" r="2.2" fill="var(--indigo)"/><circle cx="9" cy="-6" r="2.2" fill="var(--indigo)"/>
          <circle cx="-12" cy="4" r="2.2" fill="var(--indigo)"/><circle cx="12" cy="4" r="2.2" fill="var(--indigo)"/>
        </g>
        <path d="M188 118c10-4 14-12 12-22" fill="none" stroke="var(--teal)" stroke-width="1.6" marker-end="url(#ah2)"/>
        <text x="206" y="126" class="art-lbl">head turn</text>
        <text x="194" y="64" class="art-lbl">gaze</text>`;
    },
    decide() {
      const p = [.14, .58, .18, .10], bars = p.map((v, i) => {
        const h = v * 90, x = 150 + i * 30;
        return `<rect x="${x}" y="${110 - h}" width="20" height="${h}" rx="3" fill="${i === 1 ? "var(--scarlet)" : "var(--indigo)"}" fill-opacity="${i === 1 ? 1 : .35}"/>
                <text x="${x + 10}" y="126" class="art-lbl" text-anchor="middle">S${i + 1}</text>`;
      }).join("");
      return `
        <path d="${eegPath(18, 110, 60, 14, 9)}" fill="none" stroke="var(--indigo)" stroke-width="1.5"/>
        <text x="18" y="30" class="art-lbl">EEG</text>
        <path d="M116 60h24" stroke="var(--slate)" stroke-width="1.5" marker-end="url(#ah3)"/>
        ${bars}
        <text x="150" y="16" class="art-lbl">Belief over speakers</text>
        <path d="M268 84c14-18 6-50-24-58" fill="none" stroke="var(--slate)" stroke-width="1.4" stroke-dasharray="3 3" marker-end="url(#ah3)"/>
        <text x="236" y="46" class="art-lbl" text-anchor="end">update</text>`;
    }
  };

  const defs = `<defs>
    <marker id="ah" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0l8 4-8 4z" fill="var(--scarlet)"/></marker>
    <marker id="ah2" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0l8 4-8 4z" fill="var(--teal)"/></marker>
    <marker id="ah3" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0l8 4-8 4z" fill="var(--slate)"/></marker>
  </defs>`;

  window.researchArt = key => ART[key]
    ? `<svg class="thread-art" viewBox="0 0 ${W} ${H}" aria-hidden="true">${defs}${ART[key]()}</svg>` : "";
})();
