// 라이트/다크 모드 전환 — 세 페이지(포트폴리오 문서·발표 덱·상세 문서) 공용
//   theme/theme.css의 :root(기본 모드)와 :root[data-mode="dark"](다크 모드) 두 블록을 html의 data-mode로 고름.
//   고른 모드는 이 브라우저에만 기억(localStorage, 실패해도 기본 모드로 그림). 색만 바뀌고 배치·글자 크기는 그대로(발표 덱 배치 점검과 무관).
//   버튼: [data-mode-toggle]을 가진 요소(각 페이지 머리·덱 아래 띠). 누르면 모드를 바꾸고 PF.applyTheme()으로 강조색 대비를 새 바탕에 맞춰 다시 계산.
//   인쇄(제출 PDF)는 페이지 CSS의 @media print 규칙을 따름.
(function () {
  const KEY = 'pf-mode';
  const root = document.documentElement;
  const read = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const save = (m) => { try { localStorage.setItem(KEY, m); } catch (e) { /* 저장 못 해도 지금 화면은 바뀜 */ } };

  const saved = read();
  if (saved === 'dark' || saved === 'light') root.dataset.mode = saved;   // 없으면 theme.css 기본(:root) 모드

  // 지금 보이는 모드: data-mode가 있으면 그것, 없으면 theme.css의 --t-scheme(없으면 렌더러 기본 dark)
  const current = () => root.dataset.mode || (getComputedStyle(root).getPropertyValue('--t-scheme').trim() || 'dark');

  const ICON = {
    dark: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    light: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  };
  // 버튼 모양: 지금이 라이트면 달(→ 다크로), 다크면 해(→ 라이트로)
  function paint() {
    const m = current(), next = m === 'dark' ? 'light' : 'dark', label = next === 'dark' ? '다크 모드로 바꾸기' : '라이트 모드로 바꾸기';
    document.querySelectorAll('[data-mode-toggle]').forEach((b) => {
      b.innerHTML = ICON[next === 'dark' ? 'dark' : 'light'];
      b.setAttribute('aria-label', label); b.title = label;
      b.setAttribute('aria-pressed', String(m === 'dark'));
    });
  }
  function set(m) {
    root.dataset.mode = m; save(m);
    if (typeof PF !== 'undefined' && PF.applyTheme) PF.applyTheme();      // 강조색 글자·칠 대비를 새 바탕 기준으로(PF는 common.js의 전역 const라 window에 없음)
    paint();
    window.dispatchEvent(new CustomEvent('pf-mode', { detail: { mode: m } }));
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest && e.target.closest('[data-mode-toggle]');
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    set(current() === 'dark' ? 'light' : 'dark');
  }, true);
  // 페이지가 버튼을 나중에 그리므로(데이터를 읽은 뒤) 생길 때마다 모양을 맞춤
  new MutationObserver(() => { if (document.querySelector('[data-mode-toggle]:empty')) paint(); })
    .observe(root, { childList: true, subtree: true });

  window.PFMode = { current, set, toggle: () => set(current() === 'dark' ? 'light' : 'dark') };
})();
