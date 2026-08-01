/**
 * OmniStudio AI — Google AI Studio Playground Logic
 */

class AIStudioController {
  constructor() {
    this.modelSelect = document.getElementById('model-select');
    this.sysInstruction = document.getElementById('system-instruction');
    this.paramTemp = document.getElementById('param-temp');
    this.paramTopP = document.getElementById('param-topp');
    this.paramTopK = document.getElementById('param-topk');
    this.paramTokens = document.getElementById('param-tokens');
    
    this.valTemp = document.getElementById('val-temp');
    this.valTopP = document.getElementById('val-topp');
    this.valTopK = document.getElementById('val-topk');
    this.valTokens = document.getElementById('val-tokens');
    
    this.studioPrompt = document.getElementById('studio-prompt');
    this.btnSend = document.getElementById('btn-send-prompt');
    this.chatHistory = document.getElementById('chat-history');
    
    this.tokenCountEl = document.getElementById('token-count');
    this.tokenBarFill = document.getElementById('token-bar-fill');
    
    this.codeExporterPanel = document.getElementById('code-exporter-panel');
    this.exportCodeDisplay = document.getElementById('export-code-display');
    this.activeLang = 'python';

    this.initEvents();
  }

  initEvents() {
    // Slider Sync
    this.paramTemp?.addEventListener('input', (e) => this.valTemp.innerText = e.target.value);
    this.paramTopP?.addEventListener('input', (e) => this.valTopP.innerText = e.target.value);
    this.paramTopK?.addEventListener('input', (e) => this.valTopK.innerText = e.target.value);
    this.paramTokens?.addEventListener('input', (e) => this.valTokens.innerText = e.target.value);

    // Token Estimator
    this.studioPrompt?.addEventListener('input', () => this.updateTokenEstimate());
    this.sysInstruction?.addEventListener('input', () => this.updateTokenEstimate());

    // Ctrl+Enter shortcut
    this.studioPrompt?.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.runPrompt();
      }
    });

    // Send Prompt
    this.btnSend?.addEventListener('click', () => this.runPrompt());
    document.getElementById('btn-clear-chat')?.addEventListener('click', () => {
      this.chatHistory.innerHTML = `<div class="chat-bubble system"><i data-lucide="info"></i> Workbench cleared. Type a new prompt below.</div>`;
      if (window.lucide) lucide.createIcons();
    });

    // Exporter Panel
    document.getElementById('btn-get-code')?.addEventListener('click', () => {
      this.codeExporterPanel.classList.remove('hidden');
      this.generateCodeSnippet();
    });
    document.getElementById('btn-close-exporter')?.addEventListener('click', () => {
      this.codeExporterPanel.classList.add('hidden');
    });
    document.getElementById('btn-copy-code')?.addEventListener('click', () => {
      navigator.clipboard.writeText(this.exportCodeDisplay.innerText);
      alert('✅ Code snippet copied to clipboard!');
    });

    document.querySelectorAll('.lang-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        this.activeLang = e.target.dataset.lang;
        this.generateCodeSnippet();
      });
    });
  }

  updateTokenEstimate() {
    const text = (this.sysInstruction?.value || '') + (this.studioPrompt?.value || '');
    // Rough estimate: ~4 chars per token
    const tokens = Math.ceil(text.length / 4);
    this.tokenCountEl.innerText = `${tokens} tokens`;
    const pct = Math.min(100, Math.max(5, (tokens / 4096) * 100));
    this.tokenBarFill.style.width = `${pct}%`;
  }

  async runPrompt() {
    const promptText = this.studioPrompt.value.trim();
    if (!promptText) return;

    // Append User Bubble
    this.appendBubble('user', promptText);
    this.studioPrompt.value = '';
    this.updateTokenEstimate();

    const apiKey = localStorage.getItem('omni_gemini_api_key') || '';
    const model = this.modelSelect.value;
    const system = this.sysInstruction.value.trim();

    if (!apiKey) {
      // Offline Demo Mode
      setTimeout(() => {
        const dummyResp = `[DEMO RESPONSE - No API Key Set]\nModel: ${model}\nSystem: "${system || 'Default System Instruction'}"\n\nResult:\n{\n  "status": "success",\n  "prompt": "${promptText}",\n  "tokens_used": ${Math.ceil(promptText.length / 4) + 42},\n  "message": "Gemini API integration active! Add your free API key in top header settings for real live inference."\n}`;
        this.appendBubble('assistant', dummyResp);
      }, 400);
      return;
    }

    // Live API Call
    this.appendBubble('assistant', 'Thinking...');
    const assistantBubble = this.chatHistory.lastElementChild;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          temperature: parseFloat(this.paramTemp.value),
          topP: parseFloat(this.paramTopP.value),
          topK: parseInt(this.paramTopK.value),
          maxOutputTokens: parseInt(this.paramTokens.value)
        }
      };
      if (system) {
        payload.systemInstruction = { parts: [{ text: system }] };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        assistantBubble.innerText = data.candidates[0].content.parts[0].text;
      } else {
        assistantBubble.innerText = `API Error: ${JSON.stringify(data, null, 2)}`;
      }
    } catch (err) {
      assistantBubble.innerText = `Network Error: ${err.message}`;
    }
  }

  appendBubble(role, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role}`;
    bubble.innerText = text;
    this.chatHistory.appendChild(bubble);
    this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
  }

  generateCodeSnippet() {
    const model = this.modelSelect.value;
    const sys = (this.sysInstruction.value || '').replace(/"/g, '\\"');
    const prompt = (this.studioPrompt.value || 'Hello Gemini!').replace(/"/g, '\\"');
    const temp = this.paramTemp.value;
    const topP = this.paramTopP.value;
    const topK = this.paramTopK.value;
    const maxTokens = this.paramTokens.value;

    let code = '';
    if (this.activeLang === 'python') {
      code = `import google.generativeai as genai

genai.configure(api_key="YOUR_GEMINI_API_KEY")

model = genai.GenerativeModel(
    model_name="${model}",
    system_instruction="${sys}"
)

response = model.generate_content(
    "${prompt}",
    generation_config={
        "temperature": ${temp},
        "top_p": ${topP},
        "top_k": ${topK},
        "max_output_tokens": ${maxTokens}
    }
)

print(response.text)`;
    } else if (this.activeLang === 'js') {
      code = `import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
const model = genAI.getGenerativeModel({ model: "${model}" });

async function run() {
  const result = await model.generateContent({
    contents: [{ parts: [{ text: "${prompt}" }] }],
    generationConfig: {
      temperature: ${temp},
      topP: ${topP},
      topK: ${topK},
      maxOutputTokens: ${maxTokens}
    }
  });
  console.log(result.response.text());
}
run();`;
    } else if (this.activeLang === 'flutter') {
      code = `import 'package:google_generative_ai/google_generative_ai.dart';

void main() async {
  final model = GenerativeModel(
    model: '${model}',
    apiKey: 'YOUR_GEMINI_API_KEY',
    generationConfig: GenerationConfig(
      temperature: ${temp},
      topP: ${topP},
      topK: ${topK},
      maxOutputTokens: ${maxTokens},
    ),
  );
  final content = [Content.text('${prompt}')];
  final response = await model.generateContent(content);
  print(response.text);
}`;
    } else if (this.activeLang === 'curl') {
      code = `curl https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=YOUR_GEMINI_API_KEY \\
  -H 'Content-Type: application/json' \\
  -d '{
    "contents": [{"parts":[{"text": "${prompt}"}]}],
    "generationConfig": {
      "temperature": ${temp},
      "topP": ${topP},
      "topK": ${topK},
      "maxOutputTokens": ${maxTokens}
    }
  }'`;
    }

    this.exportCodeDisplay.innerText = code;
  }
}

window.AIStudioController = AIStudioController;
