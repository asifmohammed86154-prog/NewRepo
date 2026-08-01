/**
 * OmniStudio AI — Base44 / Bolt-style Web & App Builder Engine
 */

class AppBuilderEngine {
  constructor() {
    this.virtualFiles = { ...window.APP_TEMPLATES.saas };
    this.activeFile = 'index.html';

    this.fileListEl = document.getElementById('file-list');
    this.editorTabsEl = document.getElementById('editor-tabs');
    this.codeEditor = document.getElementById('code-editor');
    this.iframe = document.getElementById('preview-iframe');

    this.builderPrompt = document.getElementById('builder-prompt');
    this.btnGenerate = document.getElementById('btn-generate-app');
    this.previewWrapper = document.getElementById('preview-wrapper');

    this.initEvents();
    this.renderFiles();
    this.loadActiveFile();
    this.compileAndRun();
  }

  initEvents() {
    // Code Editor Change -> Hot Reload
    this.codeEditor?.addEventListener('input', () => {
      this.virtualFiles[this.activeFile] = this.codeEditor.value;
      this.updateEditorStatus();
      this.compileAndRun();
    });

    // Keyboard shortcut in code editor (Ctrl+S to force recompile)
    this.codeEditor?.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.compileAndRun();
      }
    });

    // Ctrl+Enter in prompt box to generate
    this.builderPrompt?.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.generateAppFromPrompt();
      }
    });

    // Add File Button
    document.getElementById('btn-add-file')?.addEventListener('click', () => {
      const name = prompt('Enter new filename (e.g. app.js, style.css, data.json):');
      if (name && name.trim()) {
        const cleanName = name.trim();
        if (!this.virtualFiles[cleanName]) {
          this.virtualFiles[cleanName] = cleanName.endsWith('.json') ? '{\n  "name": "My App"\n}' : `/* ${cleanName} */\n`;
          this.activeFile = cleanName;
          this.renderFiles();
          this.loadActiveFile();
          this.compileAndRun();
        } else {
          alert('A file with this name already exists.');
        }
      }
    });

    // Device Frame Toggles
    document.getElementById('btn-device-desktop')?.addEventListener('click', () => {
      this.previewWrapper.classList.remove('mobile-view');
      document.getElementById('btn-device-desktop').classList.add('active');
      document.getElementById('btn-device-mobile').classList.remove('active');
    });
    document.getElementById('btn-device-mobile')?.addEventListener('click', () => {
      this.previewWrapper.classList.add('mobile-view');
      document.getElementById('btn-device-mobile').classList.add('active');
      document.getElementById('btn-device-desktop').classList.remove('active');
    });
    document.getElementById('btn-refresh-preview')?.addEventListener('click', () => {
      this.compileAndRun();
    });
    document.getElementById('btn-open-fullscreen')?.addEventListener('click', () => {
      const win = window.open();
      if (win) {
        win.document.write(this.buildCombinedHTML());
        win.document.close();
      }
    });

    // Template Cards Click
    document.querySelectorAll('.template-card').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = e.currentTarget.dataset.template;
        if (window.APP_TEMPLATES && window.APP_TEMPLATES[key]) {
          this.loadTemplate(key);
        }
      });
    });

    // AI Suggestion Prompt
    document.getElementById('btn-suggest-prompt')?.addEventListener('click', () => {
      const suggestions = [
        "Build a modern Dark-themed Crypto Portfolio Tracker with live price cards and dynamic chart.",
        "Create an AI Writing Assistant app with grammar check buttons, word counter, and export menu.",
        "Build a sleek Task Kanban Board with drag-and-drop columns, labels, and dark glassmorphic UI.",
        "Build a Cyberpunk Fitness Tracker dashboard with daily goal meters and workout loggers.",
        "Create a Developer Resource Bookmark Manager with search filter and tag categories."
      ];
      this.builderPrompt.value = suggestions[Math.floor(Math.random() * suggestions.length)];
    });

    // Generate App via AI
    this.btnGenerate?.addEventListener('click', () => this.generateAppFromPrompt());
  }

  loadTemplate(key) {
    if (!window.APP_TEMPLATES[key]) return;
    
    // Deep clone template files
    this.virtualFiles = JSON.parse(JSON.stringify(window.APP_TEMPLATES[key]));
    this.activeFile = Object.keys(this.virtualFiles)[0] || 'index.html';
    
    this.renderFiles();
    this.loadActiveFile();
    this.compileAndRun();
  }

  renderFiles() {
    // File List Sidebar
    if (this.fileListEl) {
      this.fileListEl.innerHTML = Object.keys(this.virtualFiles).map(filename => `
        <li class="file-item ${filename === this.activeFile ? 'active' : ''}" data-file="${filename}">
          <div class="file-item-left">
            <i data-lucide="${filename.endsWith('.html') ? 'code' : filename.endsWith('.css') ? 'palette' : filename.endsWith('.json') ? 'database' : 'file-text'}"></i>
            <span>${filename}</span>
          </div>
          ${filename !== 'index.html' ? `<button class="btn-delete-file" data-file="${filename}" title="Delete file"><i data-lucide="trash-2"></i></button>` : ''}
        </li>
      `).join('');

      // File item selection
      this.fileListEl.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', (e) => {
          if (e.target.closest('.btn-delete-file')) return;
          this.activeFile = e.currentTarget.dataset.file;
          this.renderFiles();
          this.loadActiveFile();
        });
      });

      // File deletion
      this.fileListEl.querySelectorAll('.btn-delete-file').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetFile = e.currentTarget.dataset.file;
          if (confirm(`Are you sure you want to delete ${targetFile}?`)) {
            delete this.virtualFiles[targetFile];
            if (this.activeFile === targetFile) {
              this.activeFile = Object.keys(this.virtualFiles)[0] || 'index.html';
            }
            this.renderFiles();
            this.loadActiveFile();
            this.compileAndRun();
          }
        });
      });
    }

    // Tabs Bar
    if (this.editorTabsEl) {
      this.editorTabsEl.innerHTML = Object.keys(this.virtualFiles).map(filename => `
        <button class="editor-tab ${filename === this.activeFile ? 'active' : ''}" data-file="${filename}">
          <span>${filename}</span>
          ${filename !== 'index.html' ? `<span class="tab-close" data-file="${filename}">×</span>` : ''}
        </button>
      `).join('');

      this.editorTabsEl.querySelectorAll('.editor-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
          if (e.target.classList.contains('tab-close')) return;
          this.activeFile = e.currentTarget.dataset.file;
          this.renderFiles();
          this.loadActiveFile();
        });
      });

      this.editorTabsEl.querySelectorAll('.tab-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetFile = e.currentTarget.dataset.file;
          if (confirm(`Delete ${targetFile}?`)) {
            delete this.virtualFiles[targetFile];
            if (this.activeFile === targetFile) {
              this.activeFile = Object.keys(this.virtualFiles)[0] || 'index.html';
            }
            this.renderFiles();
            this.loadActiveFile();
            this.compileAndRun();
          }
        });
      });
    }

    if (window.lucide) lucide.createIcons();
  }

  loadActiveFile() {
    if (this.codeEditor) {
      this.codeEditor.value = this.virtualFiles[this.activeFile] || '';
      this.updateEditorStatus();
    }
  }

  updateEditorStatus() {
    const statusEl = document.getElementById('editor-status-bar');
    if (statusEl) {
      const code = this.codeEditor ? this.codeEditor.value : '';
      const lines = code.split('\n').length;
      const chars = code.length;
      statusEl.innerHTML = `<span>${this.activeFile}</span> <span>${lines} lines | ${chars} chars</span>`;
    }
  }

  buildCombinedHTML() {
    let mainHtml = this.virtualFiles['index.html'] || '<h1>Empty App</h1>';

    // Inline process custom CSS files
    Object.keys(this.virtualFiles).forEach(filename => {
      if (filename.endsWith('.css')) {
        const cssContent = this.virtualFiles[filename] || '';
        const regex = new RegExp(`<link[^>]*href=["']${filename}["'][^>]*>`, 'gi');
        if (regex.test(mainHtml)) {
          mainHtml = mainHtml.replace(regex, `<style>\n/* ${filename} */\n${cssContent}\n</style>`);
        } else if (mainHtml.includes('</head>')) {
          mainHtml = mainHtml.replace('</head>', `<style>\n/* ${filename} */\n${cssContent}\n</style></head>`);
        }
      }
    });

    // Inline process custom JS files
    Object.keys(this.virtualFiles).forEach(filename => {
      if (filename.endsWith('.js')) {
        const jsContent = this.virtualFiles[filename] || '';
        const regex = new RegExp(`<script[^>]*src=["']${filename}["'][^>]*>\\s*</script>`, 'gi');
        if (regex.test(mainHtml)) {
          mainHtml = mainHtml.replace(regex, `<script>\n// ${filename}\n${jsContent}\n</script>`);
        } else if (mainHtml.includes('</body>')) {
          mainHtml = mainHtml.replace('</body>', `<script>\n// ${filename}\n${jsContent}\n</script></body>`);
        }
      }
    });

    return mainHtml;
  }

  compileAndRun() {
    if (!this.iframe) return;
    const finalHtml = this.buildCombinedHTML();
    const blob = new Blob([finalHtml], { type: 'text/html' });
    this.iframe.src = URL.createObjectURL(blob);
  }

  async generateAppFromPrompt() {
    const promptText = this.builderPrompt.value.trim();
    if (!promptText) return;

    this.btnGenerate.disabled = true;
    this.btnGenerate.innerHTML = `<i data-lucide="loader-2" class="animate-spin"></i> Generating...`;
    if (window.lucide) lucide.createIcons();

    const apiKey = localStorage.getItem('omni_gemini_api_key');

    if (!apiKey) {
      // Smart offline generator fallback
      setTimeout(() => {
        this.virtualFiles = {
          "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI App — ${promptText.slice(0, 24)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-slate-950 text-white min-h-screen flex flex-col justify-center items-center p-6 antialiased">
  <div class="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
    <div class="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-6 shadow-lg shadow-cyan-500/20">🚀</div>
    <h1 class="text-3xl font-extrabold mb-3">AI Generated App</h1>
    <p class="text-slate-400 mb-6">${promptText}</p>
    
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-slate-800 p-4 rounded-2xl border border-slate-700">
        <span class="text-xs text-slate-400">Response</span>
        <h3 class="text-xl font-bold text-cyan-400">99.8%</h3>
      </div>
      <div class="bg-slate-800 p-4 rounded-2xl border border-slate-700">
        <span class="text-xs text-slate-400">Security</span>
        <h3 class="text-xl font-bold text-emerald-400">Verified</h3>
      </div>
      <div class="bg-slate-800 p-4 rounded-2xl border border-slate-700">
        <span class="text-xs text-slate-400">Build</span>
        <h3 class="text-xl font-bold text-purple-400">v1.0</h3>
      </div>
    </div>
    
    <button onclick="alert('⚡ OmniStudio AI App is fully interactive!')" class="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20">Explore App Features</button>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
          "style.css": `/* Custom styles for generated app */`,
          "script.js": `console.log("OmniStudio AI App active!");`
        };

        this.activeFile = 'index.html';
        this.renderFiles();
        this.loadActiveFile();
        this.compileAndRun();

        this.btnGenerate.disabled = false;
        this.btnGenerate.innerHTML = `<i data-lucide="sparkles"></i> Generate App`;
        if (window.lucide) lucide.createIcons();
      }, 1000);
      return;
    }

    // Live Gemini API Call for code generation
    try {
      const sysInstruction = "You are Base44 / Bolt AI Web Builder. Output ONLY a valid single complete HTML file containing modern HTML5, Tailwind CSS via CDN, inline JavaScript, and beautiful glassmorphism dark theme UI based on the user's request. Do not include markdown code block quotes, output raw HTML code directly.";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${sysInstruction}\n\nUSER PROMPT: ${promptText}` }] }]
        })
      });
      const data = await res.json();
      let code = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      code = code.replace(/```html/g, '').replace(/```/g, '').trim();

      if (code) {
        this.virtualFiles['index.html'] = code;
        this.activeFile = 'index.html';
        this.renderFiles();
        this.loadActiveFile();
        this.compileAndRun();
      }
    } catch (err) {
      alert('Error generating app with Gemini API: ' + err.message);
    } finally {
      this.btnGenerate.disabled = false;
      this.btnGenerate.innerHTML = `<i data-lucide="sparkles"></i> Generate App`;
      if (window.lucide) lucide.createIcons();
    }
  }
}

window.AppBuilderEngine = AppBuilderEngine;
