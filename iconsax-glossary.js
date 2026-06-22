// Generated Iconsax glossary behavior.
// Icon data lives in ./iconsax-glossary.icons.json.
const THEME_STORAGE_KEY = 'iconsax-glossary-theme';

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

(async () => {
  const icons = await loadIconData();
  const loadingOverlay = document.getElementById('loadingOverlay');
  const page = document.querySelector('.page');
  const styles = ['bold', 'bulk', 'outline'];
  const iconByName = new Map(icons.map((item) => [item.name, item]));
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
  const state = { query: '', style: 'all', sort: 'az', selected: null, selectedStyle: 'outline', filteredIcons: [], virtualRaf: 0, renderedWindowKey: '', renderedPlaceholderKey: '', visibleIconKeys: new Set(), urlTimer: 0, isApplyingUrl: false };
  const els = {
    grid: document.getElementById('grid'), empty: document.getElementById('empty'), search: document.getElementById('search'), sort: document.getElementById('sort'), toast: document.getElementById('toast'),
    themeToggle: document.getElementById('themeToggle'), docsButton: document.getElementById('docsButton'), copyInterceptor: document.getElementById('copyInterceptor'), interceptorCode: document.getElementById('interceptorCode'),
    iconDialog: document.getElementById('iconDialog'), docsDialog: document.getElementById('docsDialog'), dialogIconMini: document.getElementById('dialogIconMini'), iconDialogTitle: document.getElementById('iconDialogTitle'), iconDialogSubtitle: document.getElementById('iconDialogSubtitle'),
    variantTabs: document.getElementById('variantTabs'), dialogPreview: document.getElementById('dialogPreview'), quickCopyActions: document.getElementById('quickCopyActions'), sizePreview: document.getElementById('sizePreview'), buttonPreview: document.getElementById('buttonPreview'), chipPreview: document.getElementById('chipPreview')
  };
  function applyTheme(theme, persist = false) {
    document.documentElement.dataset.theme = theme;
    els.themeToggle.innerHTML = theme === 'night' ? iconSvg('sun1') : iconSvg('moon');
    els.themeToggle.setAttribute('aria-label', theme === 'night' ? 'Switch to day theme' : 'Switch to night theme');
    if (!persist) return;
    try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch (_error) {}
  }
  hydrateIconsaxImages();
  applyTheme(readStoredTheme() || document.documentElement.dataset.theme || getSystemTheme());

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const srcFor = (name, style) => `@iconsax/${style}/${name}`;
  const snippetFor = (name, style) => `<tui-svg src="${srcFor(name, style)}"></tui-svg>`;
  const preferredStyle = (item) => item.style || (state.style !== 'all' && item.variants[state.style] ? state.style : (item.variants.outline ? 'outline' : item.variants.bold ? 'bold' : Object.keys(item.variants)[0]));
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
    const urlSort = params.get('sort') || 'az';
    return {
      query: params.get('q') || '',
      style: ['all', ...styles].includes(urlStyle) ? urlStyle : 'all',
      sort: ['az', 'za', 'variant-count'].includes(urlSort) ? urlSort : 'az',
    };
  }
  function writeControlsFromState() {
    els.search.value = state.query;
    els.sort.value = state.sort;
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
      if (state.sort !== 'az') params.set('sort', state.sort);
      let nextUrl;
      if (usesPreviewWrapper()) {
        nextUrl = `${previewWrapperBaseUrl()}#${params.toString()}`;
      } else {
        const url = new URL(window.location.href);
        url.search = params.toString();
        nextUrl = url.href;
      }
      if (nextUrl === window.location.href) return;
      history[replace ? 'replaceState' : 'pushState']({ query: state.query, style: state.style, sort: state.sort }, '', nextUrl);
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
    state.sort = next.sort;
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
    const q = state.query.trim().toLowerCase();
    const source = state.style === 'all' ? allIconVariants : icons.filter((item) => item.variants[state.style]).map((item) => ({ ...item, style: state.style, variantCount: Object.keys(item.variants).length }));
    const list = source.filter((item) => {
      if (!q) return true;
      return item.name.toLowerCase().includes(q) || `${item.style}/${item.name}`.toLowerCase().includes(q);
    });
    list.sort((a, b) => {
      const nameSort = state.sort === 'za' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      if (state.sort === 'variant-count') return b.variantCount - a.variantCount || a.name.localeCompare(b.name) || a.style.localeCompare(b.style);
      return nameSort || a.style.localeCompare(b.style);
    });
    return list;
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
  function setSelectedStyle(style) {
    const item = state.selected; if (!item?.variants[style]) return; state.selectedStyle = style;
    els.variantTabs.querySelectorAll('.variant-tab').forEach((button) => button.classList.toggle('active', button.dataset.variant === style));
    const svg = item.variants[style]; els.dialogIconMini.innerHTML = svg; els.dialogPreview.innerHTML = svg; els.quickCopyActions.innerHTML = `<button class="quick-copy-action" type="button" data-copy="download" aria-label="Download SVG" title="Download SVG">${iconSvg('documentDownload')}</button><button class="quick-copy-action" type="button" data-copy="src" aria-label="Copy @iconsax token" title="Copy @iconsax token">${iconSvg('copy')}</button><button class="quick-copy-action" type="button" data-copy="tui" aria-label="Copy tui-svg element" title="Copy tui-svg element">${iconSvg('code')}</button>`;
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
      ].map(([appearance, label]) => `<button class="tui-preview-icon-button" data-appearance="${appearance}" type="button" aria-label="${label}" title="${label}">${svg}</button>`).join('');
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
  els.search.addEventListener('input', () => { state.query = els.search.value; render(); scheduleUrlUpdate(); });
  els.sort.addEventListener('change', () => { state.sort = els.sort.value; render(); scheduleUrlUpdate(); });
  window.addEventListener('popstate', applyUrlState);
  window.addEventListener('scroll', scheduleVirtualRender, { passive: true });
  window.addEventListener('resize', scheduleVirtualRender);
  document.addEventListener('keydown', (event) => { if (event.key === '/' && document.activeElement !== els.search && !document.querySelector('dialog[open]')) { event.preventDefault(); els.search.focus(); } });
  els.themeToggle.addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'night' ? 'day' : 'night'; applyTheme(next, true); });
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', () => { if (!readStoredTheme()) applyTheme(getSystemTheme()); });
  els.docsButton.addEventListener('click', () => els.docsDialog.showModal());
  els.copyInterceptor.addEventListener('click', () => copyText(els.interceptorCode.textContent, 'Interceptor'));
  applyUrlState();
  updateUrl(true);
  page?.setAttribute('aria-busy', 'false');
  loadingOverlay?.classList.add('is-hidden');
})().catch((error) => {
  document.body.innerHTML = `<main class="page"><section class="card" style="padding:24px"><h1>Unable to load Iconsax data</h1><p>${error.message}</p><p>Serve this folder over a local web server if your browser blocks JSON loading from file:// URLs.</p></section></main>`;
  console.error(error);
});
