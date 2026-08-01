/**
 * OmniStudio AI — Main Application Orchestrator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Initialize Sub-Controllers
  window.builderEngine = new window.AppBuilderEngine();
  window.studioController = new window.AIStudioController();
  window.publishingController = new window.PublishingController();

  // Export Project ZIP Function
  window.appExporter = () => {
    if (typeof JSZip === 'undefined') {
      alert('JSZip library is loading. Please try again in a moment.');
      return;
    }

    const zip = new JSZip();
    const virtualFiles = window.builderEngine.virtualFiles;

    Object.keys(virtualFiles).forEach(filename => {
      zip.file(filename, virtualFiles[filename]);
    });

    // Add standard README and config
    zip.file("README.md", `# Generated App from OmniStudio AI\n\nBuilt with OmniStudio AI (Google AI Studio & Base44 Web/App Builder).\n\n## Quick Start\nOpen \`index.html\` in any browser or deploy to Netlify/Vercel/GitHub Pages.`);

    zip.generateAsync({ type: 'blob' }).then(content => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = 'omnistudio-project.zip';
      a.click();
    });
  };

  // Tab Navigation Switching
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.dataset.tab;
      
      navBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(t => t.classList.remove('active'));

      e.currentTarget.classList.add('active');
      const tabEl = document.getElementById(`tab-${targetTab}`);
      if (tabEl) tabEl.classList.add('active');
    });
  });

  // API Key Modal Management
  const modalKey = document.getElementById('modal-api-key');
  const inputKey = document.getElementById('input-api-key');

  document.getElementById('btn-api-key')?.addEventListener('click', () => {
    inputKey.value = localStorage.getItem('omni_gemini_api_key') || '';
    modalKey.classList.remove('hidden');
  });

  document.getElementById('btn-close-modal')?.addEventListener('click', () => {
    modalKey.classList.add('hidden');
  });

  document.getElementById('btn-save-key')?.addEventListener('click', () => {
    const val = inputKey.value.trim();
    if (val) {
      localStorage.setItem('omni_gemini_api_key', val);
      alert('✅ Gemini API key saved successfully!');
    } else {
      localStorage.removeItem('omni_gemini_api_key');
      alert('API key cleared.');
    }
    modalKey.classList.add('hidden');
  });

  document.getElementById('btn-clear-key')?.addEventListener('click', () => {
    localStorage.removeItem('omni_gemini_api_key');
    inputKey.value = '';
    alert('API key cleared.');
  });

  // Export Project ZIP Button
  document.getElementById('btn-export-zip')?.addEventListener('click', () => {
    window.appExporter();
  });
});
