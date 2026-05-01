<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
  <title>المؤقت</title>

  <!-- PWA Meta Tags -->
  <meta name="application-name" content="المؤقت"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
  <meta name="apple-mobile-web-app-title" content="المؤقت"/>
  <meta name="theme-color" content="#0a0a0f"/>
  <meta name="mobile-web-app-capable" content="yes"/>
  <meta name="description" content="مؤقت احترافي بالعربية"/>

  <!-- PWA Manifest -->
  <link rel="manifest" href="data:application/json;charset=utf-8,{
    &quot;name&quot;: &quot;المؤقت&quot;,
    &quot;short_name&quot;: &quot;المؤقت&quot;,
    &quot;description&quot;: &quot;مؤقت احترافي بالعربية&quot;,
    &quot;start_url&quot;: &quot;/&quot;,
    &quot;display&quot;: &quot;standalone&quot;,
    &quot;background_color&quot;: &quot;#0a0a0f&quot;,
    &quot;theme_color&quot;: &quot;#0a0a0f&quot;,
    &quot;orientation&quot;: &quot;portrait&quot;,
    &quot;icons&quot;: [{
      &quot;src&quot;: &quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect width='512' height='512' rx='100' fill='%230a0a0f'/%3E%3Ccircle cx='256' cy='256' r='180' fill='none' stroke='%23c9a84c' stroke-width='20'/%3E%3Cline x1='256' y1='256' x2='256' y2='110' stroke='%23e8c97a' stroke-width='16' stroke-linecap='round'/%3E%3Cline x1='256' y1='256' x2='340' y2='300' stroke='%23c9a84c' stroke-width='12' stroke-linecap='round'/%3E%3Ccircle cx='256' cy='256' r='12' fill='%23c9a84c'/%3E%3C/svg%3E&quot;,
      &quot;sizes&quot;: &quot;512x512&quot;,
      &quot;type&quot;: &quot;image/svg+xml&quot;,
      &quot;purpose&quot;: &quot;any maskable&quot;
    }]
  }"/>

  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap" rel="stylesheet"/>

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0a0a0f;
      --card: #111118;
      --border: #1e1e2e;
      --gold: #c9a84c;
      --gold-light: #e8c97a;
      --gold-dim: #7a6430;
      --text: #f0ead6;
      --muted: #6b6570;
      --danger: #e05252;
      --green: #52c57a;
    }
    body {
      font-family: 'Tajawal', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      background-image: radial-gradient(ellipse at 50% 0%, #1a1520 0%, transparent 60%);
      /* Prevent pull-to-refresh and overscroll */
      overscroll-behavior: none;
      -webkit-user-select: none;
      user-select: none;
    }
    /* Allow text selection inside inputs */
    input { -webkit-user-select: text; user-select: text; }

    h1 {
      font-size: 1rem;
      font-weight: 300;
      letter-spacing: 0.3em;
      color: var(--gold-dim);
      margin-bottom: 32px;
      text-align: center;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 36px 28px 32px;
      width: 100%;
      max-width: 440px;
      box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.05);
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
    }

    .label-input-wrap { margin-bottom: 24px; }
    .label-input-wrap label {
      display: block;
      font-size: 0.75rem;
      color: var(--muted);
      margin-bottom: 6px;
      letter-spacing: 0.08em;
    }
    .label-input-wrap input {
      width: 100%;
      background: #0d0d14;
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--text);
      font-family: 'Tajawal', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      padding: 12px 16px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      text-align: right;
    }
    .label-input-wrap input::placeholder { color: var(--muted); }
    .label-input-wrap input:focus {
      border-color: var(--gold-dim);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
    }
    .label-input-wrap input:disabled { opacity: 0.4; cursor: not-allowed; }

    .display { text-align: center; margin-bottom: 12px; }
    .timer-label-display {
      font-size: 0.9rem;
      color: var(--gold-dim);
      font-weight: 500;
      margin-bottom: 10px;
      min-height: 1.2em;
      letter-spacing: 0.05em;
    }
    .time-display {
      font-size: clamp(3.2rem, 16vw, 5.5rem);
      font-weight: 700;
      letter-spacing: 0.05em;
      color: var(--text);
      transition: color 0.6s;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .time-display.running  { color: var(--gold-light); }
    .time-display.warning  { color: #e0a030 !important; }
    .time-display.critical { color: #e05252 !important; }
    .time-display.done     { color: var(--danger) !important; animation: pulse 0.8s ease-in-out infinite alternate; }
    @keyframes pulse { from { opacity: 1; } to { opacity: 0.4; } }

    .time-labels {
      display: flex;
      justify-content: center;
      margin-top: 8px;
      font-size: 0.72rem;
      color: var(--muted);
      letter-spacing: 0.1em;
    }
    .time-labels span { width: 33.3%; text-align: center; }

    .end-time-display {
      text-align: center;
      font-size: 0.82rem;
      color: var(--muted);
      margin-top: 10px;
      min-height: 1.2em;
      letter-spacing: 0.03em;
    }
    .end-time-display span { color: var(--gold-dim); font-weight: 600; }

    .done-msg {
      text-align: center;
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--danger);
      opacity: 0;
      transform: translateY(8px);
      transition: all 0.5s ease;
      height: 0;
      overflow: hidden;
    }
    .done-msg.visible {
      opacity: 1;
      transform: translateY(0);
      height: auto;
      margin-top: 12px;
      margin-bottom: 4px;
    }

    .progress-bar {
      height: 3px;
      background: var(--border);
      border-radius: 999px;
      margin: 20px 0 28px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--gold-dim), var(--gold-light));
      border-radius: 999px;
      width: 100%;
      transition: width 0.5s linear, background 0.6s;
    }
    .progress-fill.warning  { background: linear-gradient(90deg, #a06010, #e0a030); }
    .progress-fill.critical { background: linear-gradient(90deg, #900, var(--danger)); }

    .inputs {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      margin-bottom: 24px;
    }
    .input-group { display: flex; flex-direction: column; gap: 6px; }
    .input-group label {
      font-size: 0.75rem;
      color: var(--muted);
      text-align: center;
      letter-spacing: 0.08em;
    }
    .input-group input {
      background: #0d0d14;
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--text);
      font-family: 'Tajawal', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
      padding: 14px 8px;
      width: 100%;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      -moz-appearance: textfield;
      /* Bigger tap target on mobile */
      min-height: 60px;
    }
    .input-group input::-webkit-outer-spin-button,
    .input-group input::-webkit-inner-spin-button { -webkit-appearance: none; }
    .input-group input:focus {
      border-color: var(--gold-dim);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
    }
    .input-group input:disabled { opacity: 0.4; cursor: not-allowed; }

    .buttons { display: flex; gap: 12px; }
    button {
      flex: 1;
      border: none;
      border-radius: 14px;
      font-family: 'Tajawal', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      padding: 18px;
      cursor: pointer;
      transition: all 0.2s ease;
      letter-spacing: 0.04em;
      /* Bigger tap target */
      min-height: 58px;
      -webkit-tap-highlight-color: transparent;
    }
    #startBtn {
      background: linear-gradient(135deg, var(--gold), var(--gold-dim));
      color: #0a0a0f;
    }
    #startBtn:active { filter: brightness(0.9); transform: scale(0.98); }
    #resetBtn {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--muted);
      flex: 0 0 auto;
      padding: 18px 22px;
    }
    #resetBtn:active { border-color: var(--muted); color: var(--text); }

    .wake-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.68rem;
      color: var(--muted);
      margin-top: 16px;
      opacity: 0;
      transition: opacity 0.4s;
    }
    .wake-badge.active { opacity: 1; }
    .wake-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--green);
      animation: blink 2s ease-in-out infinite;
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

    /* Install banner */
    #installBanner {
      display: none;
      position: fixed;
      bottom: 24px;
      left: 16px; right: 16px;
      background: var(--card);
      border: 1px solid var(--gold-dim);
      border-radius: 16px;
      padding: 16px 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
      z-index: 999;
      align-items: center;
      gap: 12px;
      animation: slideUp 0.4s ease;
    }
    #installBanner.show { display: flex; }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    #installBanner p { flex: 1; font-size: 0.9rem; color: var(--text); line-height: 1.4; }
    #installBanner p span { color: var(--gold); font-weight: 700; }
    .install-btn {
      background: linear-gradient(135deg, var(--gold), var(--gold-dim));
      color: #0a0a0f;
      border: none;
      border-radius: 10px;
      font-family: 'Tajawal', sans-serif;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 10px 16px;
      cursor: pointer;
      white-space: nowrap;
      min-height: auto;
      flex: 0 0 auto;
    }
    .dismiss-btn {
      background: transparent;
      border: none;
      color: var(--muted);
      font-size: 1.2rem;
      cursor: pointer;
      padding: 4px;
      min-height: auto;
      flex: 0 0 auto;
    }
  </style>
</head>
<body>
  <h1>⏱ المـؤقـت</h1>

  <div class="card">
    <div class="label-input-wrap">
      <label>اسم المؤقت (اختياري)</label>
      <input type="text" id="timerLabel" placeholder="مثال: وقت الدراسة، راحة، تمرين..." maxlength="40"/>
    </div>

    <div class="display">
      <div class="timer-label-display" id="timerLabelDisplay"></div>
      <div class="done-msg" id="doneMsg">تم انتهاء الوقت 🎉</div>
      <div class="time-display" id="timeDisplay">00:00:00</div>
      <div class="time-labels">
        <span>ساعة</span>
        <span>دقيقة</span>
        <span>ثانية</span>
      </div>
      <div class="end-time-display" id="endTimeDisplay"></div>
    </div>

    <div class="progress-bar">
      <div class="progress-fill" id="progressFill"></div>
    </div>

    <div class="inputs">
      <div class="input-group">
        <label>ساعات</label>
        <input type="number" id="hoursInput" min="0" max="99" value="0" inputmode="numeric"/>
      </div>
      <div class="input-group">
        <label>دقائق</label>
        <input type="number" id="minsInput" min="0" max="59" value="0" inputmode="numeric"/>
      </div>
      <div class="input-group">
        <label>ثواني</label>
        <input type="number" id="secsInput" min="0" max="59" value="5" inputmode="numeric"/>
      </div>
    </div>

    <div class="buttons">
      <button id="startBtn" onclick="toggleTimer()">▶ ابدأ</button>
      <button id="resetBtn" onclick="resetTimer()">↺ إعادة</button>
    </div>

    <div style="text-align:center">
      <div class="wake-badge" id="wakeBadge">
        <div class="wake-dot"></div>
        الشاشة لن تُغلق أثناء التشغيل
      </div>
    </div>
  </div>

  <!-- Install Banner -->
  <div id="installBanner">
    <p>ثبّت <span>المؤقت</span> على شاشتك الرئيسية للوصول السريع</p>
    <button class="install-btn" onclick="installApp()">تثبيت</button>
    <button class="dismiss-btn" onclick="dismissBanner()">✕</button>
  </div>

  <script>
    let totalSeconds = 0, remaining = 0;
    let interval = null, running = false, paused = false;
    let wakeLock = null, endTimestamp = null;
    let deferredPrompt = null;

    const display         = document.getElementById('timeDisplay');
    const doneMsg         = document.getElementById('doneMsg');
    const progressFill    = document.getElementById('progressFill');
    const startBtn        = document.getElementById('startBtn');
    const hoursInput      = document.getElementById('hoursInput');
    const minsInput       = document.getElementById('minsInput');
    const secsInput       = document.getElementById('secsInput');
    const endTimeEl       = document.getElementById('endTimeDisplay');
    const wakeBadge       = document.getElementById('wakeBadge');
    const timerLabelInput = document.getElementById('timerLabel');
    const timerLabelDisp  = document.getElementById('timerLabelDisplay');
    const installBanner   = document.getElementById('installBanner');

    // ── Restore from localStorage ──
    (function restore() {
      const s = JSON.parse(localStorage.getItem('timerState') || '{}');
      if (s.h !== undefined) hoursInput.value = s.h;
      if (s.m !== undefined) minsInput.value  = s.m;
      if (s.s !== undefined) secsInput.value  = s.s;
      if (s.label)           timerLabelInput.value = s.label;
    })();

    function saveState() {
      localStorage.setItem('timerState', JSON.stringify({
        h: hoursInput.value, m: minsInput.value,
        s: secsInput.value,  label: timerLabelInput.value
      }));
    }
    [hoursInput, minsInput, secsInput, timerLabelInput].forEach(el => el.addEventListener('input', saveState));

    function pad(n) { return String(n).padStart(2,'0'); }
    function formatTime(s) {
      return `${pad(Math.floor(s/3600))}:${pad(Math.floor((s%3600)/60))}:${pad(s%60)}`;
    }
    function formatArabicTime(date) {
      let h = date.getHours(), m = pad(date.getMinutes());
      const ap = h >= 12 ? 'م' : 'ص';
      h = h % 12 || 12;
      return `${h}:${m} ${ap}`;
    }

    function getColorClass() {
      if (!totalSeconds) return '';
      const pct = remaining / totalSeconds;
      if (pct <= 0.1)  return 'critical';
      if (pct <= 0.25) return 'warning';
      return 'running';
    }

    function updateDisplay() {
      display.textContent = formatTime(remaining);
      // Update browser tab title
      document.title = running ? `(${formatTime(remaining)}) المؤقت` : 'المؤقت';
      const pct = totalSeconds > 0 ? (remaining / totalSeconds) * 100 : 100;
      progressFill.style.width = pct + '%';
      const cls = getColorClass();
      display.className = 'time-display ' + cls;
      progressFill.className = 'progress-fill ' + (cls === 'running' ? '' : cls);
    }

    function showEndTime() {
      if (!endTimestamp) { endTimeEl.innerHTML = ''; return; }
      endTimeEl.innerHTML = `ينتهي الوقت عند <span>${formatArabicTime(new Date(endTimestamp))}</span>`;
    }

    function toggleTimer() {
      if (!running && !paused) {
        const h = parseInt(hoursInput.value)||0;
        const m = parseInt(minsInput.value)||0;
        const s = parseInt(secsInput.value)||0;
        totalSeconds = h*3600 + m*60 + s;
        if (totalSeconds <= 0) return;
        remaining = totalSeconds;
        endTimestamp = Date.now() + totalSeconds * 1000;
        startTimer();
      } else if (running) {
        pauseTimer();
      } else {
        endTimestamp = Date.now() + remaining * 1000;
        resumeTimer();
      }
    }

    function startTimer() {
      running = true; paused = false;
      doneMsg.classList.remove('visible');
      timerLabelDisp.textContent = timerLabelInput.value.trim();
      startBtn.textContent = '⏸ إيقاف مؤقت';
      setInputsDisabled(true);
      showEndTime();
      updateDisplay();
      interval = setInterval(tick, 1000);
      acquireWakeLock();
    }

    function pauseTimer() {
      clearInterval(interval);
      running = false; paused = true;
      display.className = 'time-display';
      startBtn.textContent = '▶ استمرار';
      document.title = 'المؤقت';
      releaseWakeLock();
    }

    function resumeTimer() {
      running = true; paused = false;
      showEndTime();
      startBtn.textContent = '⏸ إيقاف مؤقت';
      interval = setInterval(tick, 1000);
      acquireWakeLock();
    }

    function tick() {
      remaining--;
      updateDisplay();
      if (remaining <= 0) {
        clearInterval(interval);
        running = false; paused = false;
        display.className = 'time-display done';
        display.textContent = '00:00:00';
        progressFill.style.width = '0%';
        progressFill.className = 'progress-fill critical';
        doneMsg.classList.add('visible');
        endTimeEl.innerHTML = '';
        startBtn.textContent = '▶ ابدأ';
        document.title = 'المؤقت ✓';
        setInputsDisabled(false);
        releaseWakeLock();
        playBeep();
        vibrate();
        sendNotification();
      }
    }

    function resetTimer() {
      clearInterval(interval);
      running = false; paused = false;
      remaining = 0; totalSeconds = 0; endTimestamp = null;
      display.className = 'time-display';
      display.textContent = '00:00:00';
      progressFill.style.width = '100%';
      progressFill.className = 'progress-fill';
      doneMsg.classList.remove('visible');
      endTimeEl.innerHTML = '';
      timerLabelDisp.textContent = '';
      startBtn.textContent = '▶ ابدأ';
      document.title = 'المؤقت';
      setInputsDisabled(false);
      releaseWakeLock();
    }

    function setInputsDisabled(val) {
      [hoursInput, minsInput, secsInput, timerLabelInput].forEach(el => el.disabled = val);
    }

    // ── Wake Lock ──
    async function acquireWakeLock() {
      if (!('wakeLock' in navigator)) return;
      try {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeBadge.classList.add('active');
        wakeLock.addEventListener('release', () => wakeBadge.classList.remove('active'));
      } catch(e) {}
    }
    function releaseWakeLock() {
      if (wakeLock) { wakeLock.release(); wakeLock = null; }
      wakeBadge.classList.remove('active');
    }
    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible' && running && !wakeLock) acquireWakeLock();
    });

    // ── Beep ──
    function playBeep() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        [0, 0.3, 0.6, 1.0].forEach((t, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.frequency.value = i === 3 ? 880 : 660;
          gain.gain.setValueAtTime(0.4, ctx.currentTime + t);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.25);
          osc.start(ctx.currentTime + t);
          osc.stop(ctx.currentTime + t + 0.3);
        });
      } catch(e) {}
    }

    // ── Vibration ──
    function vibrate() {
      if ('vibrate' in navigator) navigator.vibrate([400, 100, 400, 100, 600]);
    }

    // ── Notifications ──
    function sendNotification() {
      if (!('Notification' in window)) return;
      if (Notification.permission === 'granted') {
        new Notification('المؤقت', {
          body: timerLabelInput.value.trim() ? `"${timerLabelInput.value.trim()}" — تم انتهاء الوقت` : 'تم انتهاء الوقت',
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⏱</text></svg>'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(p => {
          if (p === 'granted') sendNotification();
        });
      }
    }
    // Request notification permission early
    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => Notification.requestPermission(), 3000);
    }

    // ── PWA Install Prompt ──
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      deferredPrompt = e;
      if (!localStorage.getItem('installDismissed')) {
        installBanner.classList.add('show');
      }
    });
    window.addEventListener('appinstalled', () => {
      installBanner.classList.remove('show');
      deferredPrompt = null;
    });
    async function installApp() {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') installBanner.classList.remove('show');
      deferredPrompt = null;
    }
    function dismissBanner() {
      installBanner.classList.remove('show');
      localStorage.setItem('installDismissed', '1');
    }

    // ── Input validation ──
    [hoursInput, minsInput, secsInput].forEach(input => {
      input.addEventListener('change', () => {
        let v = parseInt(input.value);
        if (isNaN(v) || v < 0) input.value = 0;
        if (input !== hoursInput && v > 59) input.value = 59;
        if (input === hoursInput && v > 99) input.value = 99;
        saveState();
      });
    });

    // ── Keyboard shortcuts ──
    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT') return;
      if (e.code === 'Space') { e.preventDefault(); toggleTimer(); }
      if (e.code === 'KeyR')  resetTimer();
    });
  </script>
</body>
</html>
