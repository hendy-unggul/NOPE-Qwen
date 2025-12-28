// rituals.js

function initRituals() {
  // Pulse: show on every Jejak load
  showPulse();

  // Ghost Hug: check if user inactive > 3 days
  const lastActive = localStorage.getItem('nope_last_active');
  const now = Date.now();
  if (!lastActive || (now - parseInt(lastActive)) > 3 * 24 * 60 * 60 * 1000) {
    showGhostHug();
  }

  // Echo: show old rant every 30 days
  const lastEcho = localStorage.getItem('nope_last_echo');
  if (!lastEcho || (now - parseInt(lastEcho)) > 30 * 24 * 60 * 60 * 1000) {
    showEcho();
    localStorage.setItem('nope_last_echo', now.toString());
  }

  // Update last active
  localStorage.setItem('nope_last_active', now.toString());
}

function showPulse() {
  const style = document.createElement('style');
  style.innerHTML = `
    #pulse {
      position: fixed; top: 50%; left: 50%; width: 12px; height: 12px;
      background: white; border-radius: 50%; transform: translate(-50%, -50%);
      animation: pulse 1.2s ease-out;
    }
    #pulse.fast { animation-duration: 0.8s; }
    #pulse.slow { animation-duration: 1.6s; }
    @keyframes pulse {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  const hour = new Date().getHours();
  const pulse = document.createElement('div');
  pulse.id = 'pulse';
  pulse.className = hour >= 6 && hour < 18 ? 'fast' : 'slow';
  document.body.appendChild(pulse);
  setTimeout(() => pulse.remove(), 1200);
}

function showGhostHug() {
  const overlay = document.createElement('div');
  overlay.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(73,3,252,0.1);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1000;">
      <div style="background:#0a0a0a;border:1px solid var(--border);border-radius:16px;padding:24px;text-align:center;max-width:320px;">
        <h3 style="margin:0 0 12px;">Kami tahu kamu diam.</h3>
        <p style="color:var(--muted);margin:0 0 16px;">Tapi kami tetap di sini.</p>
        <button onclick="this.parentElement.parentElement.remove()" style="background:var(--accent);color:#000;border:none;border-radius:8px;padding:8px 16px;font-weight:600;">Lanjut</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function showEcho() {
  const rants = JSON.parse(localStorage.getItem('nope_rants') || '[]');
  if (rants.length === 0) return;

  const randomRant = rants[Math.floor(Math.random() * rants.length)];
  const overlay = document.createElement('div');
  overlay.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1000;color:white;">
      <div style="max-width:320px;padding:0 16px;">
        <p style="font-size:14px;line-height:1.5;margin:0 0 24px;">“${randomRant.content}”</p>
        <p style="color:#555;font-size:12px;margin:0 0 16px;">Kamu pernah menulis ini, 30 hari lalu.</p>
        <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background:var(--accent);color:#000;border:none;border-radius:8px;padding:8px 16px;font-weight:600;">Tutup</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
