const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler added to `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  window.defferedPrompt = event;
  butInstall.style.visibility = 'visible';
});
// Click event handler on the `butInstall` element added
butInstall.addEventListener('click', async () => {
  const promptEvent = window.defferedPrompt;

  if (!promptEvent) {
     return;
  }
  promptEvent.prompt();
  window.defferedPrompt = null;
  butInstall.classList.toggle('hidden', true);
});

// Added an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  window.defferedPrompt = null;
});