(function () {
  const params = new URLSearchParams(location.search);
  const prompt = params.get('prompt');
  if (!prompt) return;

  const interval = setInterval(() => {
    const textarea = document.querySelector('textarea');
    const sendButton = document.querySelector('#composer-submit-button');

    if (!textarea || !sendButton) {
      return;
    }

    if (!sendButton.disabled) {
      sendButton.click();
      clearInterval(interval);
    }
  }, 500);
})();
