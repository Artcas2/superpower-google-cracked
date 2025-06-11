function hideSponsoredAdsWithCSS() {
  const style = document.createElement('style');
  style.textContent = `
    #tads, [aria-label="Annonces"], [aria-label="Sponsored"] {
      display: none !important;
    }
  `;
  document.documentElement.appendChild(style);
}

if (chrome?.storage?.local) {
  chrome.storage.local.get(['blockSponsored'], (result) => {
    if (result.blockSponsored === false) return;
    hideSponsoredAdsWithCSS();
  });
}
