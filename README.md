# Safa P.S. — AI Engineer Portfolio

A modern, high-aesthetic portfolio engineered specifically for **Safa P.S.**, highlighting production LLM systems, self-hosted GPU inference, parameter-efficient fine-tuning (LoRA), multilingual voice/text assistants, and AI automation.

---

## 🎨 Aesthetic & Design Highlights
- **Color Palette**: Cyber-editorial / Deep Space Slate (`#07090e`), neon emerald (`#10b981`), electric cyan (`#06b6d4`), and soft ambient purple glows.
- **Glassmorphism & Micro-Interactions**: Ambient glowing orbs, backdrop blurs, floating tech badges, animated radar pulse, and interactive card hover states.
- **Interactive System Architecture Visualizer**: An interactive click-through breakdown of Safa's signature production project at **Bafar Labs** (Twilio WhatsApp + Whisper Large-v3-Turbo + Gemma 4 26B on RunPod RTX A5000 + Ollama + Chatwoot CRM).
- **Interactive AI Persona Terminal**: Simulated interactive terminal where recruiters/clients can query Safa's achievements, LoRA fine-tuning details, Arabic/multimodal expertise, and full tech stack.
- **Interactive Project Filtering**: Filter projects by RAG & Agents, LoRA & Fine-Tuning, or Vision-Language models.
- **Quick Copy Email**: One-click clipboard copy of `safa.ps.workmail@gmail.com` with feedback toast notification.

---

## 📸 Adding Your Photo
A dedicated profile frame with animated glowing borders is set up in the hero section:
1. Simply copy your photo into the `assets` folder:
   ```
   e:\portfolio\assets\profile.jpg
   ```
   *(Supported formats: `.jpg`, `.png`, `.webp`)*
2. If your photo has a different name (e.g., `safa.png`), either rename it to `profile.jpg` or open [index.html](file:///e:/portfolio/index.html) and update line 160:
   ```html
   <img id="profile-img" src="assets/profile.jpg" ... />
   ```
3. A stylish fallback SVG monogram avatar (`assets/avatar-placeholder.svg`) is already included and displayed seamlessly until you add your photo!

---

## 🚀 How to View Locally
You can view the portfolio immediately in any browser:

### Option 1: Direct Double Click
Simply double-click [index.html](file:///e:/portfolio/index.html) or open it with your favorite browser (Chrome, Edge, Firefox, Brave).

### Option 2: Local Python Server (Recommended)
Open a terminal in `e:\portfolio` and run:
```bash
python -m http.server 3000
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Free 1-Click Deployment Options
- **GitHub Pages**: Push this directory to your GitHub repository `https://github.com/fasafa/portfolio` and enable GitHub Pages under repository Settings -> Pages -> Branch: `main` / `root`.
- **Vercel / Netlify**: Drag-and-drop the `e:\portfolio` folder directly into [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for a free instant custom domain and SSL.
