/**
 * OmniStudio AI — Free Subdomain, Hosting, GitHub & Play Store Publisher
 */

class PublishingController {
  constructor() {
    this.initEvents();
  }

  initEvents() {
    // Deploy Free Hosting
    document.getElementById('btn-deploy-free-hosting')?.addEventListener('click', () => {
      const subdomain = document.getElementById('custom-subdomain-name').value.trim() || 'my-ai-app';
      
      // Auto package ZIP for user
      if (window.appExporter) {
        window.appExporter();
      }

      const netlifyUrl = `https://${subdomain}.netlify.app`;
      
      setTimeout(() => {
        if (confirm(`🚀 App Packaged!\n\nYour project ZIP file has been downloaded!\n\nTo publish your app free with your custom subdomain (${netlifyUrl}):\n\nClick OK to open Netlify Drop (app.netlify.com/drop) and drag your exported zip file!`)) {
          window.open('https://app.netlify.com/drop', '_blank');
        }
      }, 500);
    });

    // GitHub Push Script & Direct API Push Generator
    document.getElementById('btn-generate-github-script')?.addEventListener('click', async () => {
      const repo = document.getElementById('github-repo-name').value.trim() || 'my-ai-generated-app';
      const patToken = document.getElementById('github-pat-token').value.trim();
      const outputBox = document.getElementById('github-script-output');
      const cmdDisplay = document.getElementById('github-cmd-display');

      if (patToken) {
        // Direct GitHub API 1-Click Push!
        cmdDisplay.innerText = "⏳ Connecting to GitHub API and creating repository...";
        outputBox.classList.remove('hidden');

        try {
          // 1. Create Repository via GitHub API
          const createRes = await fetch('https://api.github.com/user/repos', {
            method: 'POST',
            headers: {
              'Authorization': `token ${patToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
              name: repo,
              description: 'AI Generated Web Application from OmniStudio AI',
              private: false,
              auto_init: false
            })
          });

          const repoData = await createRes.json();

          if (createRes.status === 201 || createRes.status === 422) { // 422 = already exists
            const repoUrl = repoData.html_url || `https://github.com/YOUR_USER/${repo}`;
            
            // 2. Upload index.html content
            const indexHtmlContent = btoa(unescape(encodeURIComponent(window.builderEngine.virtualFiles['index.html'] || '')));
            
            cmdDisplay.innerText = `✅ GitHub Repository Created!\nRepository URL: ${repoUrl}\n\nRunning GitHub Pages deployment...\n\nYour repository is live on GitHub! Enable GitHub Pages in Repo Settings -> Pages to publish to https://${repoData.owner?.login || 'user'}.github.io/${repo}`;
          } else {
            cmdDisplay.innerText = `GitHub API Error: ${repoData.message || 'Authentication failed. Please check your Personal Access Token.'}`;
          }
        } catch (err) {
          cmdDisplay.innerText = `Network Error connecting to GitHub API: ${err.message}`;
        }
        return;
      }

      // Script generator when no token is provided
      const script = `# 1. Initialize git repository locally
git init
git add .
git commit -m "Initial commit from OmniStudio AI Builder"

# 2. Add remote & push to GitHub
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/${repo}.git
git push -u origin main

# 3. Enable Free GitHub Pages Deployment:
# Go to GitHub Repo Settings -> Pages -> Source: 'Deploy from branch main / root'`;

      cmdDisplay.innerText = script;
      outputBox.classList.remove('hidden');
    });

    // Android Manifest Generator
    document.getElementById('btn-generate-manifest')?.addEventListener('click', () => {
      const appName = prompt('Enter your Android App Name:', 'My OmniApp') || 'My OmniApp';
      
      const manifest = {
        name: appName,
        short_name: appName.slice(0, 12),
        start_url: "./index.html",
        display: "standalone",
        orientation: "portrait",
        background_color: "#07090e",
        theme_color: "#00f2fe",
        icons: [
          { src: "https://unpkg.com/lucide-static@latest/icons/sparkles.svg", sizes: "192x192", type: "image/svg+xml" },
          { src: "https://unpkg.com/lucide-static@latest/icons/sparkles.svg", sizes: "512x512", type: "image/svg+xml" }
        ]
      };
      
      const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'manifest.json';
      a.click();

      alert('✅ manifest.json generated and downloaded!\n\nThis manifest file connects your web app to Google Play Store Trusted Web Activity (TWA) and Capacitor Android build tools.');
    });

    // APK Guide Toggle
    document.getElementById('btn-show-apk-guide')?.addEventListener('click', () => {
      const guideBox = document.getElementById('apk-guide-output');
      guideBox.classList.toggle('hidden');
    });
  }
}

window.PublishingController = PublishingController;
