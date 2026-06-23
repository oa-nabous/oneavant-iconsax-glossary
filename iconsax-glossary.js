// Generated Iconsax glossary behavior.
// Icon data lives in ./iconsax-glossary.icons.json.
// Search aliases live in ./iconsax-glossary.aliases.json.
const THEME_STORAGE_KEY = 'iconsax-glossary-theme';

// Viewport-aware tooltip controller. Uses the native Popover API so the tooltip renders
// in the top layer and escapes overflow/transform ancestors. Falls back to a class toggle
// on browsers without Popover support.
function setupTooltips() {
  if (document.querySelector('.tooltip[data-shared]')) return;
  const tip = document.createElement('div');
  tip.className = 'tooltip';
  tip.dataset.shared = '';
  tip.setAttribute('role', 'tooltip');
  tip.setAttribute('popover', 'manual');
  document.body.appendChild(tip);
  const MARGIN = 8;
  const popoverSupported = typeof tip.showPopover === 'function';
  let currentTrigger = null;
  let showTimer = 0;
  let hideTimer = 0;
  let raf = 0;
  const open = () => {
    if (popoverSupported) { try { tip.showPopover(); return; } catch (_error) {} }
    tip.classList.add('is-open');
  };
  const close = () => {
    if (popoverSupported) { try { tip.hidePopover(); return; } catch (_error) {} }
    tip.classList.remove('is-open');
  };
  const isOpen = () => (popoverSupported && tip.matches(':popover-open')) || tip.classList.contains('is-open');
  function place(trigger) {
    const tr = trigger.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    const preferred = trigger.dataset.tooltipPosition || 'bottom';
    const baseSide = preferred.startsWith('bottom') ? 'bottom' : preferred.startsWith('top') ? 'top' : preferred === 'left' ? 'left' : preferred === 'right' ? 'right' : 'bottom';
    // Flip on the main axis only when the preferred side has no room and the opposite does.
    let side = baseSide;
    const fitsBottom = tr.bottom + MARGIN + th <= vh - MARGIN;
    const fitsTop = tr.top - MARGIN - th >= MARGIN;
    const fitsRight = tr.right + MARGIN + tw <= vw - MARGIN;
    const fitsLeft = tr.left - MARGIN - tw >= MARGIN;
    if (side === 'bottom' && !fitsBottom && fitsTop) side = 'top';
    else if (side === 'top' && !fitsTop && fitsBottom) side = 'bottom';
    else if (side === 'right' && !fitsRight && fitsLeft) side = 'left';
    else if (side === 'left' && !fitsLeft && fitsRight) side = 'right';
    // Compute position based on chosen side + optional alignment, then shift on the cross axis.
    let x;
    let y;
    if (side === 'top' || side === 'bottom') {
      if (side === baseSide && preferred.endsWith('-end')) x = tr.right - tw;
      else if (side === baseSide && preferred.endsWith('-start')) x = tr.left;
      else x = tr.left + tr.width / 2 - tw / 2;
      y = side === 'top' ? tr.top - th - MARGIN : tr.bottom + MARGIN;
      x = Math.max(MARGIN, Math.min(x, vw - tw - MARGIN));
    } else {
      x = side === 'left' ? tr.left - tw - MARGIN : tr.right + MARGIN;
      y = tr.top + tr.height / 2 - th / 2;
      y = Math.max(MARGIN, Math.min(y, vh - th - MARGIN));
    }
    const arrowX = Math.max(10, Math.min(tw - 10, tr.left + tr.width / 2 - x));
    const arrowY = Math.max(10, Math.min(th - 10, tr.top + tr.height / 2 - y));
    tip.style.left = `${Math.round(x)}px`;
    tip.style.top = `${Math.round(y)}px`;
    tip.dataset.placement = side;
    tip.style.setProperty('--arrow-x', `${Math.round(arrowX)}px`);
    tip.style.setProperty('--arrow-y', `${Math.round(arrowY)}px`);
  }
  function show(trigger) {
    const label = trigger.dataset.tooltip;
    if (!label) return;
    if (currentTrigger === trigger) return;
    currentTrigger = trigger;
    clearTimeout(hideTimer);
    clearTimeout(showTimer);
    const delay = isOpen() ? 0 : 80;
    showTimer = setTimeout(() => {
      if (currentTrigger !== trigger || !document.contains(trigger)) return;
      tip.textContent = label;
      tip.dataset.placement = (trigger.dataset.tooltipPosition || 'bottom').split('-')[0];
      tip.style.left = '0px';
      tip.style.top = '0px';
      open();
      requestAnimationFrame(() => place(trigger));
    }, delay);
  }
  function hide() {
    clearTimeout(showTimer);
    if (!currentTrigger) return;
    currentTrigger = null;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(close, 80);
  }
  document.addEventListener('pointerover', (event) => {
    const trigger = event.target.closest?.('[data-tooltip]');
    if (trigger) show(trigger);
    else if (currentTrigger) hide();
  });
  document.addEventListener('pointerout', (event) => {
    const trigger = event.target.closest?.('[data-tooltip]');
    if (!trigger || trigger !== currentTrigger) return;
    const related = event.relatedTarget;
    if (related && trigger.contains(related)) return;
    hide();
  });
  document.addEventListener('focusin', (event) => {
    const trigger = event.target.closest?.('[data-tooltip]');
    if (trigger) show(trigger);
  });
  document.addEventListener('focusout', (event) => {
    const trigger = event.target.closest?.('[data-tooltip]');
    if (trigger && trigger === currentTrigger) hide();
  });
  const reposition = () => {
    if (!currentTrigger) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => currentTrigger && place(currentTrigger));
  };
  window.addEventListener('scroll', reposition, { capture: true, passive: true });
  window.addEventListener('resize', reposition);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') hide(); });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupTooltips, { once: true });
else setupTooltips();

function readStoredTheme() {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    return theme === 'day' || theme === 'night' ? theme : null;
  } catch (_error) {
    return null;
  }
}

function getSystemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
}

async function loadIconData() {
  const response = await fetch('./iconsax-glossary.icons.json');
  if (!response.ok) throw new Error(`Failed to load icon data: ${response.status}`);
  return response.json();
}

async function loadSearchAliases() {
  try {
    const response = await fetch('./iconsax-glossary.aliases.json');
    if (!response.ok) throw new Error(`Failed to load search aliases: ${response.status}`);
    return response.json();
  } catch (error) {
    console.warn('Search aliases unavailable; continuing without aliases', error);
    return {};
  }
}

(async () => {
  const [icons, searchAliases] = await Promise.all([loadIconData(), loadSearchAliases()]);
  const loadingOverlay = document.getElementById('loadingOverlay');
  const page = document.querySelector('.page');
  const styles = ['bold', 'bulk', 'outline'];
  const iconByName = new Map(icons.map((item) => [item.name, item]));
  const SEARCH_INDEX_DB = 'iconsax-glossary-search';
  const SEARCH_INDEX_STORE = 'indexes';
  const SEARCH_INDEX_KEY = 'iconsax-search-v1';
  const iconSvg = (name, style = 'outline') => {
    const variants = iconByName.get(name)?.variants;
    return variants?.[style] || variants?.outline || variants?.bold || variants?.bulk || '';
  };
  function hydrateIconsaxImages(root = document) {
    root.querySelectorAll('img[src^="@iconsax/"]').forEach((img) => {
      const match = img.getAttribute('src')?.match(/^@iconsax\/([^/]+)\/(.+)$/);
      if (!match) return;
      const svg = iconSvg(match[2], match[1]);
      if (!svg) return;
      const template = document.createElement('template');
      template.innerHTML = svg.trim();
      const svgElement = template.content.firstElementChild;
      if (!svgElement) return;
      svgElement.setAttribute('aria-hidden', img.getAttribute('aria-hidden') || 'true');
      svgElement.setAttribute('focusable', 'false');
      img.replaceWith(svgElement);
    });
  }
  const allIconVariants = icons.flatMap((item) => styles.filter((style) => item.variants[style]).map((style) => ({ ...item, style, variantCount: Object.keys(item.variants).length })));
  let searchIndexByKey = new Map();
  const state = { query: '', style: 'all', selected: null, selectedStyle: 'outline', filteredIcons: [], virtualRaf: 0, renderRaf: 0, renderedWindowKey: '', renderedPlaceholderKey: '', visibleIconKeys: new Set(), urlTimer: 0, isApplyingUrl: false };
  const els = {
    grid: document.getElementById('grid'), empty: document.getElementById('empty'), search: document.getElementById('search'), toast: document.getElementById('toast'),
    themeToggle: document.getElementById('themeToggle'), docsButton: document.getElementById('docsButton'), copyInterceptor: document.getElementById('copyInterceptor'), interceptorCode: document.getElementById('interceptorCode'),
    iconDialog: document.getElementById('iconDialog'), docsDialog: document.getElementById('docsDialog'), dialogIconMini: document.getElementById('dialogIconMini'), iconDialogTitle: document.getElementById('iconDialogTitle'), iconDialogSubtitle: document.getElementById('iconDialogSubtitle'),
    variantTabs: document.getElementById('variantTabs'), dialogPreview: document.getElementById('dialogPreview'), quickCopyActions: document.getElementById('quickCopyActions'), sizePreview: document.getElementById('sizePreview'), buttonPreview: document.getElementById('buttonPreview'), chipPreview: document.getElementById('chipPreview')
  };
  function applyTheme(theme, persist = false) {
    document.documentElement.dataset.theme = theme;
    els.themeToggle.innerHTML = theme === 'night' ? iconSvg('sun1') : iconSvg('moon');
    const nextLabel = theme === 'night' ? 'Switch to day theme' : 'Switch to night theme';
    els.themeToggle.setAttribute('aria-label', nextLabel);
    els.themeToggle.setAttribute('data-tooltip', nextLabel);
    if (!persist) return;
    try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch (_error) {}
  }
  hydrateIconsaxImages();
  applyTheme(readStoredTheme() || document.documentElement.dataset.theme || getSystemTheme());

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const srcFor = (name, style) => `@iconsax/${style}/${name}`;
  const snippetFor = (name, style) => `<tui-svg src="${srcFor(name, style)}"></tui-svg>`;
  const preferredStyle = (item) => item.style || (state.style !== 'all' && item.variants[state.style] ? state.style : (item.variants.outline ? 'outline' : item.variants.bold ? 'bold' : Object.keys(item.variants)[0]));
  const splitWords = (value) => String(value)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const tokenNgrams = (tokens) => {
    const grams = [];
    for (let size = 2; size <= 3; size += 1) {
      for (let index = 0; index <= tokens.length - size; index += 1) grams.push(tokens.slice(index, index + size).join(''));
    }
    return grams;
  };
  async function sha256(value) {
    if (!window.crypto?.subtle || !window.TextEncoder) return `${value.length}:${value.slice(0, 120)}:${value.slice(-120)}`;
    const bytes = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  function openSearchIndexDb() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) return reject(new Error('IndexedDB is unavailable'));
      const request = indexedDB.open(SEARCH_INDEX_DB, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(SEARCH_INDEX_STORE);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  function readSearchIndexCache(db) {
    return new Promise((resolve, reject) => {
      const request = db.transaction(SEARCH_INDEX_STORE, 'readonly').objectStore(SEARCH_INDEX_STORE).get(SEARCH_INDEX_KEY);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  function writeSearchIndexCache(db, value) {
    return new Promise((resolve, reject) => {
      const request = db.transaction(SEARCH_INDEX_STORE, 'readwrite').objectStore(SEARCH_INDEX_STORE).put(value, SEARCH_INDEX_KEY);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  function createSearchParts(name, style) {
    const nameTokens = splitWords(name);
    return {
      style,
      exactName: name.toLowerCase(),
      compactName: nameTokens.join(''),
      tokens: [...new Set([style, ...nameTokens, ...tokenNgrams(nameTokens)])],
    };
  }
  function buildSearchIndexRows() {
    return allIconVariants.map((item) => [`${item.style}:${item.name}`, createSearchParts(item.name, item.style)]);
  }
  async function prepareSearchIndex() {
    const signaturePayload = JSON.stringify(icons.map((item) => ({
      name: item.name,
      variants: Object.fromEntries(styles.filter((style) => item.variants[style]).map((style) => [style, item.variants[style]])),
    })));
    const signature = await sha256(signaturePayload);
    try {
      const db = await openSearchIndexDb();
      const cached = await readSearchIndexCache(db);
      if (cached?.signature === signature && Array.isArray(cached.rows)) {
        searchIndexByKey = new Map(cached.rows);
        db.close();
        return;
      }
      const rows = buildSearchIndexRows();
      searchIndexByKey = new Map(rows);
      await writeSearchIndexCache(db, { signature, rows, updatedAt: Date.now() });
      db.close();
    } catch (error) {
      console.warn('IndexedDB search cache unavailable; using in-memory search index', error);
      searchIndexByKey = new Map(buildSearchIndexRows());
    }
  }
  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const row = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i += 1) {
      let previous = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const current = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
        previous = current;
      }
    }
    return row[b.length];
  }
  function expandQueryTerms(tokens) {
    const expanded = new Set(tokens);
    tokens.forEach((token) => {
      Object.entries(searchAliases).forEach(([alias, terms]) => {
        const isExact = alias === token;
        const isPrefix = !isExact && token.length >= 3 && alias.length > token.length && alias.startsWith(token);
        const isTypo = !isExact && !isPrefix && token.length >= 5 && Math.abs(alias.length - token.length) <= 1 && levenshtein(token, alias) <= 1;
        if (!isExact && !isPrefix && !isTypo) return;
        expanded.add(alias);
        terms.forEach((term) => expanded.add(term));
      });
    });
    return [...expanded];
  }
  function searchableParts(item) {
    const style = preferredStyle(item);
    return searchIndexByKey.get(`${style}:${item.name}`) || createSearchParts(item.name, style);
  }
  function precomputeQuery(query) {
    const queryLower = query.toLowerCase();
    const queryTokens = splitWords(query);
    const queryCompact = queryTokens.join('');
    const expandedTerms = queryTokens.length ? expandQueryTerms(queryTokens) : [];
    const queryTokenSet = new Set(queryTokens);
    return { queryLower, queryTokens, queryCompact, expandedTerms, queryTokenSet };
  }
  function ensureTokenSet(parts) {
    if (!parts.tokenSet) parts.tokenSet = new Set(parts.tokens);
    return parts.tokenSet;
  }
  function minLevenshtein(term, tokens) {
    let best = Infinity;
    for (let i = 0; i < tokens.length; i += 1) {
      const d = levenshtein(term, tokens[i]);
      if (d < best) { best = d; if (best <= 1) break; }
    }
    return best;
  }
  function scoreItem(parts, q) {
    if (!q.queryTokens.length) return 1;
    const tokenSet = ensureTokenSet(parts);
    const compactHit = parts.compactName.includes(q.queryCompact);
    // Fast path: bail out items with no textual or alias overlap before running Levenshtein.
    if (!compactHit) {
      let anyHit = false;
      for (let i = 0; i < q.queryTokens.length; i += 1) {
        const t = q.queryTokens[i];
        if (tokenSet.has(t) || parts.compactName.includes(t)) { anyHit = true; break; }
      }
      if (!anyHit) {
        for (let i = 0; i < q.expandedTerms.length; i += 1) {
          const term = q.expandedTerms[i];
          if (tokenSet.has(term) || parts.compactName.includes(term)) { anyHit = true; break; }
        }
        if (!anyHit) return 0;
      }
    }
    let score = 0;
    if (parts.exactName === q.queryLower) score += 120;
    if (parts.compactName === q.queryCompact) score += 100;
    if (parts.exactName.includes(q.queryLower) || compactHit) score += 80;
    let allTokensFound = true;
    for (let i = 0; i < q.queryTokens.length; i += 1) {
      const t = q.queryTokens[i];
      if (!tokenSet.has(t) && !parts.compactName.includes(t)) { allTokensFound = false; break; }
    }
    if (allTokensFound) score += 50;
    for (let i = 0; i < q.expandedTerms.length; i += 1) {
      const term = q.expandedTerms[i];
      if (tokenSet.has(term)) score += q.queryTokenSet.has(term) ? 18 : 10;
      else if (parts.compactName.includes(term)) score += q.queryTokenSet.has(term) ? 12 : 7;
      else if (term.length >= 4) {
        const bestDistance = minLevenshtein(term, parts.tokens);
        if (bestDistance <= 1) score += 8;
        else if (bestDistance <= 2 && term.length >= 6) score += 4;
      }
    }
    return score;
  }
  let toastTimer;
  function toast(message) {
    clearTimeout(toastTimer);
    const openDialog = document.querySelector('dialog[open]');
    if (openDialog && els.toast.parentElement !== openDialog) openDialog.appendChild(els.toast);
    if (!openDialog && els.toast.parentElement !== document.body) document.body.appendChild(els.toast);
    els.toast.textContent = message;
    els.toast.classList.add('show');
    toastTimer = setTimeout(() => {
      els.toast.classList.remove('show');
      if (!document.querySelector('dialog[open]') && els.toast.parentElement !== document.body) document.body.appendChild(els.toast);
    }, 1800);
  }
  async function copyText(value, label) {
    try { await navigator.clipboard.writeText(value); }
    catch (_error) { const textarea = document.createElement('textarea'); textarea.value = value; textarea.style.position = 'fixed'; textarea.style.opacity = '0'; document.body.appendChild(textarea); textarea.select(); document.execCommand('copy'); textarea.remove(); }
    toast(`${label} copied`);
  }
  function usesPreviewWrapper() {
    return window.location.hostname === 'htmlpreview.github.io' || /^\?(https?:\/\/|https?%3A)/i.test(window.location.search);
  }
  function previewWrapperBaseUrl() {
    const rawTarget = window.location.href.split('#')[0].slice(`${window.location.origin}${window.location.pathname}?`.length);
    const cleanTarget = rawTarget
      .replace(/([&?])(type|style|q|sort)=[^&]*/g, '')
      .replace(/[?&]$/, '')
      .replace(/=$/, '');
    const target = /^https?%3A/i.test(cleanTarget) ? decodeURIComponent(cleanTarget) : cleanTarget;
    return `${window.location.origin}${window.location.pathname}?${target}`;
  }
  function stateParamsFromHash() {
    return new URLSearchParams(window.location.hash.replace(/^#/, ''));
  }
  function readUrlState() {
    const hashParams = stateParamsFromHash();
    const params = usesPreviewWrapper() && hashParams.size ? hashParams : new URLSearchParams(window.location.search);
    const urlStyle = params.get('type') || params.get('style') || 'all';
    return {
      query: params.get('q') || '',
      style: ['all', ...styles].includes(urlStyle) ? urlStyle : 'all',
    };
  }
  function writeControlsFromState() {
    els.search.value = state.query;
    document.querySelectorAll('.seg').forEach((seg) => seg.setAttribute('aria-pressed', String(seg.dataset.style === state.style)));
  }
  function updateDocumentTitle() {
    const parts = [];
    if (state.query.trim()) parts.push(`"${state.query.trim()}"`);
    parts.push(state.style === 'all' ? 'All Iconsax variants' : `${state.style[0].toUpperCase()}${state.style.slice(1)} Iconsax icons`);
    parts.push(`${state.filteredIcons.length} result${state.filteredIcons.length === 1 ? '' : 's'}`);
    document.title = `${parts.join(' · ')} | OneAvant Icon Glossary`;
  }
  function updateUrl(replace = false) {
    if (state.isApplyingUrl) return;
    try {
      const params = new URLSearchParams();
      params.set('type', state.style);
      if (state.query.trim()) params.set('q', state.query.trim());
      let nextUrl;
      if (usesPreviewWrapper()) {
        nextUrl = `${previewWrapperBaseUrl()}#${params.toString()}`;
      } else {
        const url = new URL(window.location.href);
        url.search = params.toString();
        nextUrl = url.href;
      }
      if (nextUrl === window.location.href) return;
      history[replace ? 'replaceState' : 'pushState']({ query: state.query, style: state.style }, '', nextUrl);
    } catch (error) {
      console.warn('Unable to update glossary URL state', error);
    }
  }
  function scheduleUrlUpdate() {
    clearTimeout(state.urlTimer);
    state.urlTimer = setTimeout(() => updateUrl(), 250);
  }
  function applyUrlState() {
    clearTimeout(state.urlTimer);
    const next = readUrlState();
    state.isApplyingUrl = true;
    state.query = next.query;
    state.style = next.style;
    writeControlsFromState();
    render();
    state.isApplyingUrl = false;
  }
  function downloadSvg(svg, name, style) {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}-${style}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    toast('SVG downloaded');
  }
  function filtered() {
    const q = state.query.trim();
    const source = state.style === 'all'
      ? allIconVariants
      : icons.filter((item) => item.variants[state.style]).map((item) => ({ ...item, style: state.style, variantCount: Object.keys(item.variants).length }));
    const byNameThenStyle = (a, b) => a.name.localeCompare(b.name) || a.style.localeCompare(b.style);
    if (!q) {
      const list = source.slice();
      list.sort(byNameThenStyle);
      return list;
    }
    const queryData = precomputeQuery(q);
    const scored = [];
    for (let i = 0; i < source.length; i += 1) {
      const item = source[i];
      const parts = searchableParts(item);
      const score = scoreItem(parts, queryData);
      if (score > 0) scored.push({ item, score });
    }
    scored.sort((a, b) => b.score - a.score || byNameThenStyle(a.item, b.item));
    return scored.map((entry) => entry.item);
  }
  function card(item, renderIndex = 0) {
    const style = preferredStyle(item); const svg = item.variants[style] || '';
    const revealKey = `${style}:${item.name}`;
    const hasRevealed = state.visibleIconKeys.has(revealKey);
    const delay = Math.min(renderIndex, 18) * 18;
    return `<button class="icon-card card ${hasRevealed ? 'icon-card--ready' : ''}" type="button" data-name="${escapeHtml(item.name)}" data-style="${escapeHtml(style)}" title="${escapeHtml(item.name)} · ${escapeHtml(style)}" style="--card-delay:${delay}ms">` +
      `<span class="icon-preview">${svg}</span><span class="icon-name">${escapeHtml(item.name)}</span><span class="icon-style">${iconSvg('tag')}${style}</span></button>`;
  }
  function gridMetrics() {
    const width = Math.max(els.grid.clientWidth, 1);
    const gap = 10;
    const minColumnWidth = 116;
    const columns = Math.max(1, Math.floor((width + gap) / (minColumnWidth + gap)));
    return { columns, rowHeight: 142 };
  }
  function scheduleVirtualRender() {
    if (state.virtualRaf) return;
    state.virtualRaf = requestAnimationFrame(() => { state.virtualRaf = 0; renderVirtualGrid(); });
  }
  function renderVirtualGrid() {
    const list = state.filteredIcons;
    els.empty.classList.toggle('show', list.length === 0);
    if (!list.length) { els.grid.innerHTML = ''; els.grid.style.height = '0px'; state.renderedWindowKey = ''; state.renderedPlaceholderKey = ''; state.visibleIconKeys = new Set(); return; }

    const { columns, rowHeight } = gridMetrics();
    const totalRows = Math.ceil(list.length / columns);
    const gridTop = els.grid.getBoundingClientRect().top + window.scrollY;
    const viewportTop = window.scrollY;
    const viewportBottom = viewportTop + window.innerHeight;
    const bufferRows = 4;
    const rawStartRow = Math.floor((viewportTop - gridTop) / rowHeight) - bufferRows;
    let startRow = Math.max(0, rawStartRow);
    let endRow = Math.min(totalRows, Math.ceil((viewportBottom - gridTop) / rowHeight) + bufferRows);
    if (startRow >= totalRows) {
      startRow = Math.max(0, totalRows - bufferRows * 2);
      endRow = totalRows;
    }
    if (endRow <= startRow) endRow = Math.min(totalRows, startRow + bufferRows * 2);
    const startIndex = startRow * columns;
    const endIndex = Math.min(list.length, endRow * columns);
    const topHeight = startRow * rowHeight;
    const windowKey = `${columns}:${startIndex}:${endIndex}`;
    const placeholderKey = `${columns}:${list.length}`;
    els.grid.style.height = `${totalRows * rowHeight}px`;
    if (state.renderedPlaceholderKey !== placeholderKey) {
      state.renderedPlaceholderKey = placeholderKey;
      state.renderedWindowKey = '';
      els.grid.innerHTML = `<div class="virtual-placeholders" aria-hidden="true" style="grid-template-columns:repeat(${columns}, minmax(0, 1fr))">${'<span class="virtual-placeholder"></span>'.repeat(list.length)}</div><div class="virtual-content"></div>`;
    }
    const content = els.grid.querySelector('.virtual-content');
    if (state.renderedWindowKey === windowKey && content) return;
    state.renderedWindowKey = windowKey;
    const visibleItems = list.slice(startIndex, endIndex);
    const visible = visibleItems.map((item, index) => card(item, index)).join('');
    if (content) {
      content.style.transform = `translateY(${topHeight}px)`;
      content.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
      content.innerHTML = visible;
      state.visibleIconKeys = new Set(visibleItems.map((item) => `${preferredStyle(item)}:${item.name}`));
    }
  }
  function render() { state.filteredIcons = filtered(); state.renderedWindowKey = ''; state.renderedPlaceholderKey = ''; state.visibleIconKeys = new Set(); renderVirtualGrid(); updateDocumentTitle(); }
  function scheduleRender() {
    if (state.renderRaf) return;
    state.renderRaf = requestAnimationFrame(() => { state.renderRaf = 0; render(); });
  }
  function setSelectedStyle(style) {
    const item = state.selected; if (!item?.variants[style]) return; state.selectedStyle = style;
    els.variantTabs.querySelectorAll('.variant-tab').forEach((button) => button.classList.toggle('active', button.dataset.variant === style));
    const svg = item.variants[style]; els.dialogIconMini.innerHTML = svg; els.dialogPreview.innerHTML = svg; els.quickCopyActions.innerHTML = `<button class="quick-copy-action" type="button" data-copy="download" aria-label="Download SVG" data-tooltip="Download SVG" data-tooltip-position="left">${iconSvg('documentDownload')}</button><button class="quick-copy-action" type="button" data-copy="src" aria-label="Copy @iconsax token" data-tooltip="Copy @iconsax token" data-tooltip-position="left">${iconSvg('copy')}</button><button class="quick-copy-action" type="button" data-copy="tui" aria-label="Copy tui-svg element" data-tooltip="Copy &lt;tui-svg&gt; element" data-tooltip-position="left">${iconSvg('codeCircle')}</button>`;
    els.sizePreview.innerHTML = [
      ['xs', '16px'],
      ['s', '20px'],
      ['m', '24px'],
      ['l', '32px'],
      ['xl', '48px'],
    ].map(([size, label]) => `<div class="size-preview-card"><span class="size-preview-icon" data-size="${size}">${svg}</span><strong>${label}</strong><small>${size.toUpperCase()}</small></div>`).join('') +
      [
        ['xs', 'XS'],
        ['s', 'Small'],
        ['m', 'Medium'],
        ['l', 'Large'],
      ].map(([size, label]) => `<button class="tui-preview-button tui-preview-button-size" data-appearance="secondary-action-button" data-size="${size}" type="button"><span class="preview-button-icon">${svg}</span>${label}</button>`).join('');
    els.buttonPreview.innerHTML = [
      ['primary-action-button', 'Primary'],
      ['secondary-action-button', 'Secondary'],
      ['primary-button-outlined', 'Outlined'],
      ['success-action-button', 'Success'],
      ['negative-action-button', 'Negative'],
    ].map(([appearance, label]) => `<button class="tui-preview-button" data-appearance="${appearance}" type="button"><span class="preview-button-icon">${svg}</span>${label}</button>`).join('') +
      [
        ['primary-icon-button', 'Primary icon'],
        ['secondary-icon-button', 'Secondary icon'],
        ['positive-icon-button', 'Positive icon'],
        ['negative-icon-button', 'Negative icon'],
        ['basic-icon-button', 'Basic icon'],
      ].map(([appearance, label]) => `<button class="tui-preview-icon-button" data-appearance="${appearance}" type="button" aria-label="${label}" data-tooltip="${label}">${svg}</button>`).join('');
    els.chipPreview.innerHTML = [
      ['default', 'Default'],
      ['success', 'Success'],
      ['warning', 'Warning'],
      ['error', 'Error'],
      ['info', 'Info'],
      ['disabled', 'Disabled'],
    ].map(([status, label]) => `<span class="tui-preview-chip" data-status="${status}">${svg}${label}</span>`).join('');
  }
  function openIconDialog(item, initialStyle) {
    state.selected = item; const style = initialStyle && item.variants[initialStyle] ? initialStyle : preferredStyle(item); state.selectedStyle = style;
    els.iconDialogTitle.textContent = item.name; els.iconDialogSubtitle.textContent = `${Object.keys(item.variants).length} available variant${Object.keys(item.variants).length === 1 ? '' : 's'}`;
    els.variantTabs.innerHTML = styles.filter((style) => item.variants[style]).map((style) => `<button class="variant-tab ${style === state.selectedStyle ? 'active' : ''}" type="button" data-variant="${style}">${iconSvg('check')}${style}</button>`).join('');
    setSelectedStyle(style); els.iconDialog.showModal();
  }
  els.grid.addEventListener('click', (event) => { const card = event.target.closest('.icon-card'); if (!card) return; const item = iconByName.get(card.dataset.name); if (item) openIconDialog(item, card.dataset.style); });
  els.variantTabs.addEventListener('click', (event) => { const button = event.target.closest('[data-variant]'); if (button) setSelectedStyle(button.dataset.variant); });
  els.iconDialog.addEventListener('click', (event) => {
    const copy = event.target.closest('[data-copy]'); if (!copy || !state.selected) return;
    const item = state.selected; const style = state.selectedStyle; const svg = item.variants[style];
    if (copy.dataset.copy === 'download') return downloadSvg(svg, item.name, style);
    if (copy.dataset.copy === 'src') return copyText(srcFor(item.name, style), 'Iconsax token');
    if (copy.dataset.copy === 'tui') return copyText(snippetFor(item.name, style), 'tui-svg element');
  });
  document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
  document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }));
  document.querySelectorAll('.seg').forEach((button) => button.addEventListener('click', () => {
    state.style = button.dataset.style;
    writeControlsFromState();
    render();
    scheduleUrlUpdate();
  }));
  els.search.addEventListener('input', () => { state.query = els.search.value; scheduleRender(); scheduleUrlUpdate(); });
  window.addEventListener('popstate', applyUrlState);
  window.addEventListener('scroll', scheduleVirtualRender, { passive: true });
  window.addEventListener('resize', scheduleVirtualRender);
  document.addEventListener('keydown', (event) => { if (event.key === '/' && document.activeElement !== els.search && !document.querySelector('dialog[open]')) { event.preventDefault(); els.search.focus(); } });
  els.themeToggle.addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'night' ? 'day' : 'night'; applyTheme(next, true); });
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', () => { if (!readStoredTheme()) applyTheme(getSystemTheme()); });
  els.docsButton.addEventListener('click', () => els.docsDialog.showModal());
  els.copyInterceptor.addEventListener('click', () => copyText(els.interceptorCode.textContent, 'Interceptor'));
  await prepareSearchIndex();
  applyUrlState();
  updateUrl(true);
  page?.setAttribute('aria-busy', 'false');
  loadingOverlay?.classList.add('is-hidden');
})().catch((error) => {
  document.body.innerHTML = `<main class="page"><section class="card" style="padding:24px"><h1>Unable to load Iconsax data</h1><p>${error.message}</p><p>Serve this folder over a local web server if your browser blocks JSON loading from file:// URLs.</p></section></main>`;
  console.error(error);
});
