/* 아이콘 모음 (assets/icons.js) — 2026-11-25 수강생 요청
   수강생이 첨부한 아이콘(GitHub · YouTube · Claude · NotebookLM · C# · Unity · Fork)을
   배경 없이 한 색(currentColor) 선·면으로 다시 그림 → 놓인 자리의 글자색(테마 초록·라이트/다크)을 그대로 따름.
   쓰는 곳: custom/index.html(머리 막대·프로필 장면·기술 스택·영상 버튼) · doc.html(상세 문서 위 링크 버튼·본문 링크)
   PFIcons.svg(이름) → <svg> 문자열, PFIcons.forName(기술 이름) · PFIcons.forUrl(주소) → 아이콘 이름 또는 '' */
(function () {
  const S = 'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
  const BODY = {
    // GitHub: 고양이 얼굴 마크(면)
    github: '<path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
    // YouTube: 둥근 판 + 재생 삼각형(구멍)
    youtube: '<path fill="currentColor" fill-rule="evenodd" d="M6 4.5h12a5 5 0 0 1 5 5v5a5 5 0 0 1-5 5H6a5 5 0 0 1-5-5v-5a5 5 0 0 1 5-5zM9.75 8.4v7.2L16 12z"/>',
    // Claude: 길이가 조금씩 다른 빛살 별
    claude: `<g ${S} stroke-width="2.3"><path d="M12 12 12 2.6M12 12 16.6 3.9M12 12 20.4 6.6M12 12 21.2 12.6M12 12 19.1 18.4M12 12 14.2 21.3M12 12 9.2 20.6M12 12 4.3 17.6M12 12 2.8 11.2M12 12 4.6 5.6M12 12 8.4 3.3"/></g>`,
    // NotebookLM: 겹친 아치 세 겹
    notebooklm: `<g ${S}><path d="M2.5 19.5V12a9.5 9.5 0 0 1 19 0v7.5"/><path d="M7 19.5v-5.2a6.2 6.2 0 0 1 12.4 0v5.2"/><path d="M11.4 19.5v-3.6a3.4 3.4 0 0 1 6.8 0v3.6"/></g>`,
    // C#: 육각형 + C + #
    csharp: `<g ${S}><path d="M12 1.8 21 7v10l-9 5.2L3 17V7z"/><path d="M13.2 9.3a3.6 3.6 0 1 0 0 5.4"/><path d="M15.6 10v4M18 10v4M14.7 11.1h4.2M14.7 12.9h4.2" stroke-width="1.4"/></g>`,
    // Unity: 세 조각으로 갈라진 정육면체
    unity: `<g ${S}><path d="M12 2.2 20.6 7.1v4.4M20.6 15.1v1.8L13.6 21M10.4 21 3.4 16.9v-1.8M3.4 11.5V7.1L12 2.2"/><path d="M12 12V20.8M12 12 4.6 7.8M12 12l7.4-4.2"/></g>`,
    // Fork: 포크(동그란 배경은 뺌)
    fork: `<g ${S}><path d="M8.2 2.8v5.4a3.8 3.8 0 0 0 7.6 0V2.8M10.7 2.8v5.6M13.3 2.8v5.6"/><path d="M12 12v9.2" stroke-width="2.6"/></g>`,
  };
  function svg(name, cls = 'pf-ico') {
    const b = BODY[name];
    return b ? `<svg class="${cls}" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">${b}</svg>` : '';
  }
  // 기술 이름 → 아이콘 (Git은 첨부 아이콘이 없어 비워 둠)
  function forName(name) {
    const n = String(name || '').trim().toLowerCase();
    return { 'unity': 'unity', 'c#': 'csharp', 'fork': 'fork', 'claude code': 'claude', 'claude': 'claude', 'notebooklm': 'notebooklm', 'github': 'github', 'youtube': 'youtube' }[n] || '';
  }
  function forUrl(url) {
    const u = String(url || '');
    if (/^https?:\/\/(www\.)?github\.com\//i.test(u)) return 'github';
    if (/^https?:\/\/((www|m)\.)?(youtube\.com|youtu\.be)\//i.test(u)) return 'youtube';
    return '';
  }
  window.PFIcons = { svg, forName, forUrl, names: Object.keys(BODY) };
})();
