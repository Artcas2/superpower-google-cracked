function removeSponsoredAds() {
  const tads = document.getElementById('tads');
  if (tads) tads.remove();

  const selectors = [
    '[aria-label="Annonces"]',
    '[aria-label="Sponsored"]',
    'div[data-text-ad]'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });
}

function runButtonLuckyFeature() {
  if (document.querySelector('#superpower-imlucky-button')) return;

  const lensButton = document.querySelector('[data-base-lens-url="https://lens.google.com"]');
  if (!lensButton || !lensButton.parentElement) return;

  const container = lensButton.parentElement;

  // Vérifie si le thème est sombre
  const metaTheme = document.querySelector('meta[name="color-scheme"]');
  const isDarkMode = metaTheme && metaTheme.content.trim().startsWith('dark');

  const button = document.createElement('div');
  button.id = 'superpower-imlucky-button';
  button.className = lensButton.className;
  button.setAttribute('role', 'button');
  button.setAttribute('tabindex', '0');
  button.setAttribute('aria-label', 'Ouvrir ChatGPT');
  button.style.cursor = 'pointer';

  button.addEventListener('click', () => {
    const input = document.querySelector('input[name="q"]');
    if (!input || !input.value) return;

    const query = encodeURIComponent(input.value.trim());
    const url = `https://www.google.com/search?q=${query}&btnI=1`;
    window.location.href = url;
  });

  const img = document.createElement('img');
  img.src = chrome.runtime.getURL(isDarkMode ? 'img/clover_dark.svg' : 'img/clover.svg');
  img.alt = 'ChatGPT';
  img.style.width = '20px';
  img.style.height = '20px';
  img.style.padding = '3px';

  button.appendChild(img);
  container.insertBefore(button, lensButton.nextSibling);
}

function runButtonChatGPTFeature() {
  if (document.querySelector('#superpower-chatgpt-button')) return;

  const lensButton = document.querySelector('[data-base-lens-url="https://lens.google.com"]');
  if (!lensButton || !lensButton.parentElement) return;

  const container = lensButton.parentElement;

  const metaTheme = document.querySelector('meta[name="color-scheme"]');
  const isDarkMode = metaTheme && metaTheme.content.trim().startsWith('dark');

  const button = document.createElement('div');
  button.id = 'superpower-chatgpt-button';
  button.className = lensButton.className;
  button.setAttribute('role', 'button');
  button.setAttribute('tabindex', '0');
  button.setAttribute('aria-label', 'Ouvrir ChatGPT');
  button.style.cursor = 'pointer';

  button.addEventListener('click', () => {
    const input = document.querySelector('input[name="q"]');
    if (!input || !input.value) return;

    const query = input.value.trim();
    if (!query) return;

    const encoded = encodeURIComponent(query);
    const url = `https://chatgpt.com/?prompt=${encoded}&ts=${Date.now()}`;

    window.open(url, '_blank');
  });

  const img = document.createElement('img');
  img.src = chrome.runtime.getURL(isDarkMode ? 'img/chatgpt_dark.svg' : 'img/chatgpt.svg');
  img.alt = 'ChatGPT';
  img.style.width = '20px';
  img.style.height = '20px';
  img.style.padding = '3px';

  button.appendChild(img);
  container.insertBefore(button, lensButton.nextSibling);
}


function runSearchOperatorsFeature() {

  if (document.querySelector('#superpower-filters-button')) return;

  const lensButton = document.querySelector('[data-base-lens-url="https://lens.google.com"]');
  if (!lensButton || !lensButton.parentElement) return;

  const container = lensButton.parentElement;
  container.style.position = 'relative';

  const button = document.createElement('div');
  button.id = 'superpower-filters-button';
  button.setAttribute('role', 'button');
  button.setAttribute('tabindex', '0');
  button.setAttribute('aria-label', 'Filtres Google');
  button.style.cursor = 'pointer';
  button.style.position = 'absolute';
  button.style.right = '211px';
  button.style.top = '50%';
  button.style.transform = 'translateY(-50%)';
  button.style.zIndex = '2147483647';

  const text = document.createElement('span');
  text.textContent = 'Filtres';
  text.style.padding = '3px 8px';
  text.style.fontSize = '14px';
  text.style.color = '#5f6368';
  text.style.background = '#fff';
  text.style.borderRadius = '6px';
  text.style.border = '1px solid #dadce0';
  text.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
  text.style.userSelect = 'none';

  button.appendChild(text);

  const dropdown = document.createElement('div');
  dropdown.style.display = 'none';
  dropdown.style.position = 'fixed';
  dropdown.style.backgroundColor = '#fff';
  dropdown.style.border = '1px solid #dadce0';
  dropdown.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  dropdown.style.borderRadius = '8px';
  dropdown.style.padding = '8px 0';
  dropdown.style.zIndex = '2147483647';
  dropdown.style.minWidth = '280px';

  const options = [
    { label: '🔍 Recherche exacte', help: 'Chercher exactement une phrase', value: '"votre phrase exacte"' },
    { label: '🌐 Sur un site', help: 'Limiter la recherche à un site', value: 'site:example.com' },
    { label: '⏳ Avant une date', help: 'Résultats publiés avant une date', value: 'before:01-02-2022' },
    { label: '📅 Après une date', help: 'Résultats publiés après une date', value: 'after:01-02-2022' },
    { label: '📄 Type de fichier', help: 'Rechercher un type de fichier spécifique', value: 'filetype:pdf' },
    { label: '🔗 Sites similaires', help: 'Trouver des sites proches d’un autre', value: 'related:example.com' },
    { label: '📝 Dans le contenu', help: 'Rechercher un mot dans le contenu', value: 'intext:mot' },
    { label: '📰 Dans le titre', help: 'Rechercher un mot dans le titre', value: 'intitle:mot' },
    { label: '🔎 Mot dans l’URL', help: 'Mot spécifique dans l’URL', value: 'inurl:mot' },
    { label: '🗺️ Carte', help: 'Afficher une carte', value: 'map:Rennes' },
    { label: '🚫 Exclure un mot', help: 'Exclure un mot de la recherche', value: '-mot' },
    { label: '📊 Intervalle', help: 'Plage de valeurs (prix ou date par exemples)', value: '100..200' }
  ];  

  options.forEach(opt => {
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'start';
    item.style.padding = '8px 16px';
    item.style.cursor = 'pointer';
    item.style.fontSize = '14px';
    item.style.color = '#3c4043';

    item.addEventListener('mouseover', () => item.style.backgroundColor = '#f1f3f4');
    item.addEventListener('mouseout', () => item.style.backgroundColor = 'transparent');

    item.addEventListener('mousedown', (e) => e.preventDefault());

    item.addEventListener('click', () => {
      const input = document.querySelector('textarea[name="q"]');
      if (!input) {
        return;
      }

      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;

      const insert = opt.value;
      const before = input.value.slice(0, start);
      const after = input.value.slice(end);
      const newValue = before + insert + after;

      input.value = newValue;

      input.dispatchEvent(new Event('input', { bubbles: true }));

      const cursorPos = start + insert.length;
      input.setSelectionRange(cursorPos, cursorPos);
      input.focus();

      dropdown.style.display = 'none';
    });

    const textContainer = document.createElement('div');
    textContainer.style.marginLeft = '10px';

    const title = document.createElement('div');
    title.textContent = opt.label;
    title.style.fontWeight = '500';

    const subtitle = document.createElement('div');
    subtitle.textContent = opt.help;
    subtitle.style.fontSize = '12px';
    subtitle.style.color = '#5f6368';

    textContainer.appendChild(title);
    textContainer.appendChild(subtitle);

    item.appendChild(textContainer);
    dropdown.appendChild(item);
  });

  button.addEventListener('mousedown', e => e.preventDefault());
  button.addEventListener('click', (e) => {
    e.stopPropagation();

    if (dropdown.style.display === 'none') {
      const rect = button.getBoundingClientRect();
      dropdown.style.top = `${rect.bottom + 4}px`;
      dropdown.style.left = `${rect.left}px`;
      dropdown.style.display = 'block';
    } else {
      dropdown.style.display = 'none';
    }
  });

  document.addEventListener('click', () => {
    dropdown.style.display = 'none';
  });

  document.body.appendChild(dropdown);
  container.appendChild(button);
}



function runBlockSponsoredFeature() {
  removeSponsoredAds();
  const observer = new MutationObserver(() => removeSponsoredAds());
  observer.observe(document.body, { childList: true, subtree: true });
}

function runNewCategoriesFeature() {

  const input = document.querySelector('input[name="q"]');
  if (!input) return;
  if (!input.value.trim()) return;
  const query = encodeURIComponent(input.value.trim());

  const candidateLists = Array.from(document.querySelectorAll('div[role="list"]'));

  const categoryList = candidateLists.find(list => {
    const items = Array.from(list.children).filter(
      el => el.getAttribute('role') === 'listitem' && el.querySelector('a[href]')
    );
    return items.length >= 3;
  });

  if (!categoryList) return;

  chrome.storage.local.get(['categories'], (result) => {

    let categories = [];

    if (!Array.isArray(result.categories) || result.categories.length === 0) {

      categories = [
        { id: 1, title: 'Maps', url: 'https://maps.google.com/maps?q=', editable: false },
        { id: 2, title: 'Orthographe', url: 'https://www.reverso.net/orthographe/correcteur-francais/#text=', editable: false },
        { id: 3, title: 'Wikipédia', url: 'https://fr.wikipedia.org/w/index.php?search=', editable: false },
        { id: 4, title: 'Tendances', url: 'https://trends.google.fr/trends/explore?q=', editable: false }
      ];

      chrome.storage.local.set({ categories });
    } else {
      categories = result.categories;
    }

    const allItems = Array.from(categoryList.children).filter(el => el.getAttribute('role') === 'listitem');
    const lastItem = allItems[allItems.length - 1];

    const existingHrefs = Array.from(categoryList.querySelectorAll('a[href]')).map(a => a.href);

    categories.forEach((category) => {
      if (!category?.title || !category?.url) {
        return;
      }

      const fullUrl = `${category.url}${query}`;
      if (existingHrefs.includes(fullUrl)) {
        return;
      }

      const listItem = document.createElement('div');
      listItem.setAttribute('role', 'listitem');

      const link = document.createElement('a');
      link.setAttribute('role', 'link');
      link.href = fullUrl;

      link.style.textDecoration = 'none';
      link.style.display = 'inline-block';
      link.style.padding = '0 12px';
      link.style.lineHeight = '32px';
      link.style.fontSize = '14px';
      link.style.color = '#70757a';
      link.style.position = 'relative';
      link.style.top = '1px';
      link.style.whiteSpace = 'nowrap';

      link.textContent = category.title;
      listItem.appendChild(link);

      categoryList.insertBefore(listItem, lastItem);
    });

  });
}

function startFeaturesIfEnabled() {
  if (!chrome?.storage?.local) return;

  chrome.storage.local.get([
    'buttonLucky',
    'buttonChatGPT',
    'searchOperators',
    'blockSponsored',
    'newCategoriesEnabled',
    'superpower_activation_code'
  ], result => {
    if (result.buttonLucky !== false) runButtonLuckyFeature();
    if (result.buttonChatGPT !== false) runButtonChatGPTFeature();
    if (result.blockSponsored !== false) runBlockSponsoredFeature();
    if (result.newCategoriesEnabled !== false) runNewCategoriesFeature();

    if (result.searchOperators !== false && result.superpower_activation_code) {
      runSearchOperatorsFeature();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startFeaturesIfEnabled);
} else {
  startFeaturesIfEnabled();
}
