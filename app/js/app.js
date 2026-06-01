/* =============================================
   TEHCS App — Shared JavaScript
============================================= */

// ── Firebase Config ──
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBg_fCZkhkzNr41f6xespzlRucs6wVk9ck",
  authDomain:        "tehcs-675c6.firebaseapp.com",
  projectId:         "tehcs-675c6",
  storageBucket:     "tehcs-675c6.firebasestorage.app",
  messagingSenderId: "428200196151",
  appId:             "1:428200196151:web:2dee682eda618b2ac7e7b2"
};

// ── Register Service Worker ──
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/app/sw.js').catch(console.warn);
  });
}

// ── PWA Install Prompt ──
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('installBanner');
  if (banner) banner.classList.add('show');
});

window.installApp = async function() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    document.getElementById('installBanner')?.classList.remove('show');
  }
  deferredPrompt = null;
};

window.dismissInstall = function() {
  document.getElementById('installBanner')?.classList.remove('show');
  localStorage.setItem('installDismissed', 'true');
};

// ── Toast ──
window.showToast = function(msg, type = '') {
  let t = document.getElementById('appToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'appToast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
};

// ── Bottom Nav ──
window.navTo = function(page) {
  window.location.href = page;
};

// ── Format date ──
window.fmtDate = function(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
};

window.fmtTime = function(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
};

// ── Highlight active nav tab ──
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-tab').forEach(tab => {
    if (tab.dataset.page === page) tab.classList.add('active');
  });
});
