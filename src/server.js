const http = require('http');

const PORT = 3002;

function send(res, status, body, type = 'text/html; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

const html = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>CI Demo 2</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .container {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      max-width: 600px;
      width: 90%;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .badge {
      display: inline-block;
      background: #10b981;
      color: #fff;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 20px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    h1 {
      font-size: 36px;
      font-weight: 800;
      margin-bottom: 10px;
      background: linear-gradient(to right, #fff, #f0f0f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .subtitle {
      font-size: 18px;
      opacity: 0.9;
      margin-bottom: 30px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-top: 30px;
    }
    .info-card {
      background: rgba(255, 255, 255, 0.15);
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .info-label {
      font-size: 12px;
      text-transform: uppercase;
      opacity: 0.8;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    .info-value {
      font-size: 24px;
      font-weight: 700;
      font-family: 'Courier New', monospace;
    }
    .api-link {
      display: inline-block;
      margin-top: 30px;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .api-link:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .footer {
      margin-top: 30px;
      font-size: 14px;
      opacity: 0.7;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">🚀 LIVE test webhookksss</div>
    <h1>CI Demo 2</h1>
    <p class="subtitle">Automated CI/CD Deployment System</p>

    <div class="info-grid">
      <div class="info-card">
        <div class="info-label">Port</div>
        <div class="info-value">${PORT}</div>
      </div>
      <div class="info-card">
        <div class="info-label">Status</div>
        <div class="info-value">✓</div>
      </div>
      <div class="info-card">
        <div class="info-label">Time</div>
        <div class="info-value" id="time">...</div>
      </div>
    </div>

    <a href="/health" class="api-link">Health Check →</a>

    <div class="footer">
      Deployed via CI/CD Pipeline<br/>
      <small>daemon → job_wrapper → PM2</small>
    </div>
  </div>

  <script>
    function updateTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      document.getElementById("time").textContent = hours + ':' + minutes + ':' + seconds;
    }
    updateTime();
    setInterval(updateTime, 1000);
  </script>
</body>
</html>`;

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/' || url.pathname === '/index.html') {
      return send(res, 200, html, 'text/html; charset=utf-8');
    }

    if (url.pathname === '/health') {
      return send(res, 200, 'OK - CI Demo 2 is running!\n', 'text/plain; charset=utf-8');
    }

    if (url.pathname === '/api/info') {
      const info = {
        name: 'ci-demo2',
        port: PORT,
        status: 'running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      };
      return send(res, 200, JSON.stringify(info, null, 2), 'application/json');
    }

    return send(res, 404, 'Not Found\n', 'text/plain; charset=utf-8');
  })
  .listen(PORT, '0.0.0.0', () => {
    console.log(`[CI Demo 2] Server running on 0.0.0.0:${PORT}`);
    console.log(`[CI Demo 2] Visit http://localhost:${PORT}`);
  });
