/**
 * OmniStudio AI — Pre-built Application & Website Templates
 */

window.APP_TEMPLATES = {
  saas: {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ApexAnalytics — AI SaaS Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-slate-950 text-slate-100 font-sans antialiased">
  <div class="flex h-screen overflow-hidden">
    
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
      <div>
        <div class="flex items-center gap-3 mb-8">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-cyan-500/20">A</div>
          <span class="font-bold text-xl tracking-tight text-white">Apex<span class="text-cyan-400">AI</span></span>
        </div>
        <nav class="space-y-2">
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-cyan-500/10 text-cyan-400 font-medium">
            <span>📊 Overview</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition">
            <span>⚡ AI Models</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition">
            <span>💳 Subscriptions</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition">
            <span>⚙️ Settings</span>
          </a>
        </nav>
      </div>
      <div class="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
        <p class="text-xs font-semibold text-slate-400 uppercase">Pro Plan Active</p>
        <p class="text-sm text-slate-200 mt-1">78,420 / 100,000 Tokens</p>
        <div class="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
          <div class="bg-cyan-400 h-full w-[78%]"></div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-8">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-bold text-white">Analytics Overview</h1>
          <p class="text-slate-400 text-sm">Real-time performance and model metrics</p>
        </div>
        <button id="btn-deploy" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-lg shadow-md transition">
          + Deploy New Model
        </button>
      </header>

      <!-- Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <span class="text-slate-400 text-sm font-medium">Total API Requests</span>
          <h2 class="text-3xl font-extrabold text-white mt-2" id="stat-requests">1,429,800</h2>
          <span class="text-emerald-400 text-xs font-semibold mt-2 inline-block">↑ +14.2% this week</span>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <span class="text-slate-400 text-sm font-medium">Avg Latency</span>
          <h2 class="text-3xl font-extrabold text-cyan-400 mt-2">84 ms</h2>
          <span class="text-emerald-400 text-xs font-semibold mt-2 inline-block">↓ -8 ms faster</span>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <span class="text-slate-400 text-sm font-medium">Active Subdomains</span>
          <h2 class="text-3xl font-extrabold text-white mt-2">42 Sites</h2>
          <span class="text-slate-400 text-xs font-semibold mt-2 inline-block">SSL Certificates Active</span>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <span class="text-slate-400 text-sm font-medium">Monthly Cost</span>
          <h2 class="text-3xl font-extrabold text-white mt-2">$29.00</h2>
          <span class="text-slate-400 text-xs font-semibold mt-2 inline-block">Free tier optimized</span>
        </div>
      </div>

      <!-- Interactive Live Chart -->
      <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-lg text-slate-200">Inference & Traffic Volume</h3>
          <span class="text-xs bg-slate-800 text-cyan-400 px-3 py-1 rounded-full border border-slate-700">Live Telemetry</span>
        </div>
        <div class="h-64 flex items-end justify-between gap-3 pt-8 pb-2 border-b border-slate-800" id="chart-bars">
          <!-- Rendered in script.js -->
        </div>
      </div>
    </main>

  </div>
  <script src="script.js"></script>
</body>
</html>`,
    "style.css": `/* Custom styles for ApexAnalytics */
body {
  background-color: #030712;
}`,
    "script.js": `document.addEventListener('DOMContentLoaded', () => {
  const chartBars = document.getElementById('chart-bars');
  const values = [40, 65, 30, 85, 95, 60, 75, 90, 50, 80, 100, 70];
  
  if (chartBars) {
    chartBars.innerHTML = values.map((val) => \`
      <div class="flex-1 bg-gradient-to-t from-cyan-500/20 to-cyan-400 rounded-t-lg transition-all duration-500 hover:opacity-80 relative group" style="height: \${val}%">
        <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg border border-slate-700">\${val}k req</div>
      </div>
    \`).join('');
  }

  const deployBtn = document.getElementById('btn-deploy');
  if (deployBtn) {
    deployBtn.addEventListener('click', () => {
      alert('⚡ Model Deployed! Gemini 2.0 Flash Endpoint is active.');
      const reqEl = document.getElementById('stat-requests');
      if (reqEl) reqEl.innerText = (1429800 + Math.floor(Math.random() * 5000)).toLocaleString();
    });
  }
});`
  },

  ecommerce: {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CyberGear — Modern Tech Store</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  <header class="border-b border-slate-800 py-4 px-8 flex justify-between items-center sticky top-0 bg-slate-950/90 backdrop-blur z-50">
    <h1 class="text-2xl font-extrabold text-cyan-400 tracking-wider">CYBER<span class="text-white">GEAR</span></h1>
    <div class="flex items-center gap-6">
      <a href="#" class="hover:text-cyan-400 transition text-sm font-medium">Shop</a>
      <a href="#" class="hover:text-cyan-400 transition text-sm font-medium">Categories</a>
      <button class="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-xl font-bold transition flex items-center gap-2">
        <span>🛒 Cart</span>
        <span id="cart-count" class="bg-black text-cyan-400 text-xs px-2 py-0.5 rounded-full font-extrabold">0</span>
      </button>
    </div>
  </header>
  
  <main class="max-w-6xl mx-auto py-12 px-6">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-extrabold text-white tracking-tight mb-2">Next-Gen Cyberwear & Hardware</h2>
      <p class="text-slate-400">Order directly with instant free shipping and crypto/card checkout.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" id="product-grid">
      <!-- Rendered in script.js -->
    </div>
  </main>
  <script src="script.js"></script>
</body>
</html>`,
    "style.css": `/* CyberGear custom animations */
body { background-color: #030712; }`,
    "script.js": `const products = [
  { id: 1, name: "Neural Sound Headphones", price: "$199", img: "🎧", tag: "Best Seller" },
  { id: 2, name: "CyberWatch Pro", price: "$299", img: "⌚", tag: "New" },
  { id: 3, name: "Holographic Keypad", price: "$149", img: "⌨️", tag: "Featured" },
  { id: 4, name: "Quantum Drone X", price: "$499", img: "🛸", tag: "Pro" },
  { id: 5, name: "AI Vision Glasses", price: "$349", img: "👓", tag: "Limited" },
  { id: 6, name: "Cyber Deck Terminal", price: "$899", img: "💻", tag: "Ultimate" }
];
let cartCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');
  if (grid) {
    grid.innerHTML = products.map(p => \`
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center hover:border-cyan-500/50 transition group relative">
        <span class="absolute top-4 right-4 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">\${p.tag}</span>
        <div class="text-6xl my-6 transform group-hover:scale-110 transition">\${p.img}</div>
        <h3 class="font-bold text-xl text-white mb-1">\${p.name}</h3>
        <span class="text-cyan-400 font-extrabold text-2xl mb-6">\${p.price}</span>
        <button onclick="addToCart('\${p.name}')" class="w-full bg-slate-800 hover:bg-cyan-500 hover:text-black py-3 rounded-2xl font-bold transition border border-slate-700 hover:border-cyan-400">Add to Cart</button>
      </div>
    \`).join('');
  }
});

function addToCart(name) {
  cartCount++;
  const el = document.getElementById('cart-count');
  if (el) el.innerText = cartCount;
  alert(\`Added "\${name}" to your cart!\`);
}`
  },

  portfolio: {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Mercer — Fullstack & AI Engineer</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-black text-white font-sans antialiased">
  <main class="max-w-4xl mx-auto py-20 px-6">
    <div class="inline-block bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border border-cyan-500/30">Available for Full-Stack & AI Roles</div>
    
    <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">Hi, I'm Alex Mercer 👋</h1>
    <p class="text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed">Building intelligent web platforms, AI tools, and mobile apps with React, Node, and Gemini APIs.</p>
    
    <div class="flex flex-wrap gap-4 mb-16">
      <a href="#projects" class="bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-cyan-300 transition shadow-lg shadow-cyan-400/20">View Projects</a>
      <a href="mailto:alex@example.com" class="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl border border-slate-800 hover:bg-slate-800 transition">Contact Me</a>
    </div>

    <!-- Featured Projects Grid -->
    <section id="projects" class="space-y-6">
      <h2 class="text-2xl font-bold text-slate-200 border-b border-slate-800 pb-3">Featured Projects</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition">
          <div class="text-2xl mb-2">⚡</div>
          <h3 class="font-bold text-lg text-white mb-2">OmniStudio AI</h3>
          <p class="text-slate-400 text-sm mb-4">Web & App builder with Google AI Studio prompt engineering and live hot-reload sandbox.</p>
          <div class="flex gap-2">
            <span class="text-xs bg-slate-800 text-cyan-400 px-2 py-1 rounded">JavaScript</span>
            <span class="text-xs bg-slate-800 text-cyan-400 px-2 py-1 rounded">Gemini API</span>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition">
          <div class="text-2xl mb-2">📊</div>
          <h3 class="font-bold text-lg text-white mb-2">Apex Analytics</h3>
          <p class="text-slate-400 text-sm mb-4">Real-time model telemetry dashboard with token tracking and custom subdomains.</p>
          <div class="flex gap-2">
            <span class="text-xs bg-slate-800 text-cyan-400 px-2 py-1 rounded">TailwindCSS</span>
            <span class="text-xs bg-slate-800 text-cyan-400 px-2 py-1 rounded">Chart.js</span>
          </div>
        </div>
      </div>
    </section>
  </main>
  <script src="script.js"></script>
</body>
</html>`,
    "style.css": `/* Portfolio CSS */`,
    "script.js": `console.log("Alex Mercer Portfolio loaded!");`
  },

  "ai-chat": {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nova AI Assistant</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-slate-950 text-slate-100 flex flex-col h-screen">
  <header class="p-4 border-b border-slate-800 font-bold text-center text-cyan-400 text-lg flex items-center justify-center gap-2">
    <span>🤖</span> Nova AI Assistant
  </header>
  
  <div id="messages" class="flex-1 p-6 overflow-y-auto space-y-4 max-w-3xl mx-auto w-full">
    <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-slate-300 max-w-lg">
      Hello! I am Nova, your AI assistant powered by Gemini. Ask me anything!
    </div>
  </div>

  <div class="p-4 border-t border-slate-800 max-w-3xl mx-auto w-full flex gap-3">
    <input type="text" id="user-input" placeholder="Ask Nova anything..." class="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white outline-none focus:border-cyan-400 font-sans">
    <button onclick="sendMessage()" class="bg-cyan-500 hover:bg-cyan-400 text-black px-6 rounded-2xl font-bold transition">Send</button>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
    "style.css": `/* Nova AI CSS */`,
    "script.js": `function sendMessage() {
  const inp = document.getElementById('user-input');
  const box = document.getElementById('messages');
  if (!inp || !inp.value.trim()) return;
  
  const userText = inp.value.trim();
  box.innerHTML += \`<div class="bg-cyan-500/20 text-cyan-200 p-4 rounded-2xl ml-auto max-w-md border border-cyan-500/30">\${userText}</div>\`;
  inp.value = '';
  box.scrollTop = box.scrollHeight;

  setTimeout(() => {
    box.innerHTML += \`<div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-slate-300 max-w-lg">
      I received your message: "\${userText}". OmniStudio AI makes building intelligent chat applications instant and free!
    </div>\`;
    box.scrollTop = box.scrollHeight;
  }, 600);
}

document.getElementById('user-input')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});`
  },

  kanban: {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TaskFlow — Kanban Board</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-8">
  <header class="flex justify-between items-center max-w-6xl mx-auto mb-8">
    <h1 class="text-2xl font-extrabold text-cyan-400">TaskFlow <span class="text-white">Kanban</span></h1>
    <button onclick="addTask()" class="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-4 py-2 rounded-xl transition">+ New Task</button>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <!-- To Do -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4">
      <h3 class="font-bold text-slate-400 mb-4 flex items-center justify-between">
        <span>📌 TO DO</span>
        <span class="bg-slate-800 text-xs text-slate-300 px-2 py-0.5 rounded-full">2</span>
      </h3>
      <div class="space-y-3" id="col-todo">
        <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <span class="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-semibold">Design</span>
          <h4 class="font-bold text-white mt-2">Design Play Store App Banner</h4>
        </div>
        <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <span class="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-semibold">Feature</span>
          <h4 class="font-bold text-white mt-2">Integrate Gemini 2.0 Flash API</h4>
        </div>
      </div>
    </div>

    <!-- In Progress -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4">
      <h3 class="font-bold text-slate-400 mb-4 flex items-center justify-between">
        <span>⚡ IN PROGRESS</span>
        <span class="bg-slate-800 text-xs text-cyan-400 px-2 py-0.5 rounded-full">1</span>
      </h3>
      <div class="space-y-3" id="col-in-progress">
        <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <span class="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold">Deploy</span>
          <h4 class="font-bold text-white mt-2">Configure Netlify Free Subdomain</h4>
        </div>
      </div>
    </div>

    <!-- Done -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4">
      <h3 class="font-bold text-slate-400 mb-4 flex items-center justify-between">
        <span>✅ DONE</span>
        <span class="bg-slate-800 text-xs text-emerald-400 px-2 py-0.5 rounded-full">1</span>
      </h3>
      <div class="space-y-3" id="col-done">
        <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <span class="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-semibold">Setup</span>
          <h4 class="font-bold text-white mt-2">Create OmniStudio AI Builder</h4>
        </div>
      </div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
    "style.css": `/* Kanban CSS */`,
    "script.js": `function addTask() {
  const title = prompt("Enter task title:");
  if (title) {
    const todoCol = document.getElementById("col-todo");
    if (todoCol) {
      todoCol.innerHTML += \`
        <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <span class="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-semibold">New</span>
          <h4 class="font-bold text-white mt-2">\${title}</h4>
        </div>
      \`;
    }
  }
}`
  },

  crypto: {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CryptoPulse — Live Market Tracker</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-8">
  <main class="max-w-5xl mx-auto">
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Crypto<span class="text-cyan-400">Pulse</span></h1>
      <span class="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">● Live Feed</span>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" id="crypto-cards">
      <!-- Rendered in script.js -->
    </div>
  </main>
  <script src="script.js"></script>
</body>
</html>`,
    "style.css": `/* Crypto CSS */`,
    "script.js": `const coins = [
  { symbol: "BTC", name: "Bitcoin", price: "$67,420.00", change: "+3.4%", color: "text-emerald-400" },
  { symbol: "ETH", name: "Ethereum", price: "$3,540.50", change: "+5.1%", color: "text-emerald-400" },
  { symbol: "SOL", name: "Solana", price: "$178.20", change: "+8.9%", color: "text-emerald-400" }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('crypto-cards');
  if (container) {
    container.innerHTML = coins.map(c => \`
      <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/40 transition">
        <div class="flex justify-between items-center mb-2">
          <span class="font-extrabold text-lg text-white">\${c.name} (\${c.symbol})</span>
          <span class="text-xs font-bold \${c.color}">\${c.change}</span>
        </div>
        <h2 class="text-3xl font-extrabold text-cyan-400 mt-4">\${c.price}</h2>
      </div>
    \`).join('');
  }
});`
  }
};
