// -------------------------------------------------------------
// 1. THREE.JS INTERACTIVE 3D SCENE (Particles & Neural Lattice)
// -------------------------------------------------------------
let scene, camera, renderer, particles, torusKnot, clock;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

function initThreeJS() {
  const container = document.getElementById('webgl-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  clock = new THREE.Clock();
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 40;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 1. Particle Cloud (Gold & Violet stars with depth)
  const particleCount = 750;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Palette: Champagne Gold (#f7c873), Electric Violet (#a855f7), Rose Coral (#fb7185)
  const colorPalette = [
    new THREE.Color(0xf7c873), // Gold
    new THREE.Color(0xa855f7), // Violet
    new THREE.Color(0xfb7185), // Rose Coral
    new THREE.Color(0xffffff)  // Bright Star
  ];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 120;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = chosenColor.r;
    colors[i * 3 + 1] = chosenColor.g;
    colors[i * 3 + 2] = chosenColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Particle Material
  const pMaterial = new THREE.PointsMaterial({
    size: 1.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  particles = new THREE.Points(geometry, pMaterial);
  scene.add(particles);

  // 2. 3D Geometric Torus Knot (Wireframe AI Core)
  const torusGeo = new THREE.TorusKnotGeometry(10, 2.5, 90, 16, 2, 3);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });

  torusKnot = new THREE.Mesh(torusGeo, torusMat);
  torusKnot.position.set(22, 5, -10);
  scene.add(torusKnot);

  // Event Listeners
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);

  animate();
}

function onWindowResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
  mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
}

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock ? clock.getElapsedTime() : 0;

  targetX = targetX + (mouseX - targetX) * 0.05;
  targetY = targetY + (mouseY - targetY) * 0.05;

  if (particles) {
    particles.rotation.y = elapsedTime * 0.03 + targetX * 0.01;
    particles.rotation.x = targetY * 0.01;
  }

  if (torusKnot) {
    torusKnot.rotation.x = elapsedTime * 0.12;
    torusKnot.rotation.y = elapsedTime * 0.18 + targetX * 0.02;
    torusKnot.position.y = 5 + Math.sin(elapsedTime * 0.8) * 2;
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// -------------------------------------------------------------
// 2. 3D INTERACTIVE CARD TILT ENGINE (Vanilla JS & Perspective)
// -------------------------------------------------------------
function init3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-card, .profile-3d-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

// -------------------------------------------------------------
// 3. ARCHITECTURE PIPELINE SIMULATOR (Flagship Project)
// -------------------------------------------------------------
const archStages = {
  ingest: {
    title: "1. Multimodal Webhook Ingestion",
    tech: "Twilio WhatsApp API • FastAPI • Webhook Verification",
    badge: "Ingestion & Security",
    desc: "Ingests real-time user messages from WhatsApp supporting text, voice audio notes (.ogg), and product photo uploads across English, Arabic, and Malayalam.",
    highlights: [
      "HMAC-SHA1 webhook signature verification preventing spoofed events",
      "Dynamic media parser detecting audio vs image attachments",
      "Dry-run mode & per-message metrics logger for zero-downtime testing"
    ],
    codeSnippet: `@app.post("/webhook/whatsapp")
async def handle_whatsapp(request: Request):
    if not verify_twilio_signature(request):
        raise HTTPException(status_code=403, detail="Invalid signature")
    
    payload = await request.form()
    message_type = detect_media_type(payload)
    return await orchestrator.process(payload, message_type)`
  },
  audio: {
    title: "2. Fast Audio Transcription",
    tech: "Whisper Large-v3-Turbo • Sub-second Latency",
    badge: "Voice Pipeline",
    desc: "Direct stream processing of customer audio notes with automatic language detection, converting spoken Malayalam, Arabic, and English to text in ~800ms.",
    highlights: [
      "Optimized Whisper Large-v3-Turbo deployment with GPU acceleration",
      "Multi-accent and regional dialect handling (Gulf Arabic & Malayalam)",
      "Instant tokenization feeding directly into conversation memory"
    ],
    codeSnippet: `async def transcribe_voice_note(audio_stream):
    result = await whisper_model.transcribe(
        audio_stream,
        language_detection=True,
        beam_size=1
    )
    return result["text"], result["detected_language"]`
  },
  inference: {
    title: "3. Self-Hosted LLM Inference & Memory",
    tech: "Gemma 4 26B • Ollama • RunPod RTX A5000",
    badge: "Core Reasoning Engine",
    desc: "Replaced Gemini with self-hosted Gemma 4 26B on an RTX A5000 GPU via Ollama. Achieved ~5s median response time (10-50x faster than CPU inference) with break-even at ~51k-60k messages/month.",
    highlights: [
      "16-message rolling memory with context-aware prompt caching",
      "Evaluated on 31 custom enterprise test cases (22/31 passed)",
      "Strict structured output and tool calling for inventory & pricing"
    ],
    codeSnippet: `response = await ollama_client.chat(
    model="gemma4:26b",
    messages=session_memory.get_recent(limit=16),
    tools=[fetch_catalog_item, calculate_gold_rate, tag_high_intent_lead],
    options={"temperature": 0.2, "num_ctx": 4096}
)`
  },
  guardrails: {
    title: "4. Guardrails & Lead Tagging",
    tech: "Link Validation • Fallback Logic • Intent Extraction",
    badge: "Safety & Business Logic",
    desc: "Enforces enterprise safety rules: validates product catalogue URLs against phishing/dead links, and extracts high-intent lead tags (budget, jewelry type, location).",
    highlights: [
      "Link-validation guard checking domains against authorized whitelist",
      "Automated lead-tag extraction passed downstream to sales teams",
      "Fallback circuit-breaker routing complex queries if confidence drops"
    ],
    codeSnippet: `def apply_safety_and_extract_tags(llm_output):
    sanitized_text = link_guard.validate_and_replace_urls(llm_output.text)
    tags = extract_lead_attributes(
        llm_output, 
        categories=["gold_purity", "budget_range", "urgency"]
    )
    return {"reply": sanitized_text, "crm_tags": tags}`
  },
  crm: {
    title: "5. Realtime CRM Sync & Delivery",
    tech: "Chatwoot • Docker • Cloudflare Tunnel",
    badge: "Delivery & Omnichannel",
    desc: "Replies dispatched back to WhatsApp in under 5 seconds. Conversation history and extracted lead tags are synchronized to self-hosted Chatwoot via Cloudflare Tunnel for human agent takeover.",
    highlights: [
      "Sub-5s end-to-end turnaround across 27 live production tests",
      "Unified CRM thread with zero-trust Cloudflare Tunnel ingress",
      "Seamless human-in-the-loop escalation on high-value inquiries"
    ],
    codeSnippet: `await twilio_client.messages.create(
    from_=TWILIO_WHATSAPP_NUMBER,
    to=customer_phone,
    body=final_payload["reply"]
)
await chatwoot.sync_conversation(customer_phone, final_payload)`
  }
};

function selectArchStage(stageKey) {
  const data = archStages[stageKey];
  if (!data) return;

  document.querySelectorAll(".arch-node-3d").forEach(node => {
    if (node.dataset.stage === stageKey) {
      node.classList.add("active");
    } else {
      node.classList.remove("active");
    }
  });

  const panel = document.getElementById("arch-display-panel");
  if (panel) {
    panel.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5 mb-5">
        <div>
          <span class="text-xs font-mono uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full inline-block mb-2">${data.badge}</span>
          <h4 class="text-2xl font-bold text-white font-heading">${data.title}</h4>
          <p class="text-xs font-mono text-purple-300">${data.tech}</p>
        </div>
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-xs font-mono text-emerald-300">Production Verified</span>
        </div>
      </div>
      
      <p class="text-slate-300 text-sm leading-relaxed mb-5">${data.desc}</p>
      
      <div class="mb-5">
        <h5 class="text-xs font-mono uppercase text-amber-200/90 mb-3 font-semibold tracking-wider">Key Engineering Solutions:</h5>
        <ul class="space-y-2 text-xs text-slate-300">
          ${data.highlights.map(h => `<li class="flex items-start gap-2.5"><span class="text-amber-400 mt-0.5">✦</span> <span>${h}</span></li>`).join('')}
        </ul>
      </div>

      <div class="rounded-xl bg-[#080611] border border-purple-500/20 p-4 overflow-x-auto shadow-inner">
        <div class="flex justify-between items-center mb-2 pb-2 border-b border-white/5 text-[11px] font-mono text-slate-400">
          <span>Implementation Blueprint</span>
          <span class="text-amber-300">Python / Async</span>
        </div>
        <pre class="font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto"><code>${escapeHtml(data.codeSnippet)}</code></pre>
      </div>
    `;
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// -------------------------------------------------------------
// 4. SIMULATED AI PERSONA TERMINAL ASSISTANT
// -------------------------------------------------------------
const assistantResponses = {
  bafar: {
    query: "What did you build at Bafar Labs?",
    answer: "At **Bafar Labs**, I built a production FastAPI service integrating Twilio WhatsApp with self-hosted **Gemma 4 26B** and **Whisper Large-v3-Turbo** to replace proprietary Gemini APIs in Ziya Gold's sales assistant. Deployed on a RunPod RTX A5000 GPU via Ollama, it achieved **~5s median response times** across 27 live tests (10-50x faster than CPU). I added webhook verification, link-validation guardrails, dry-run modes, prompt caching, and cost-optimized the switch with a breakeven point at ~51k-60k messages/month."
  },
  bafarfoods: {
    query: "Tell me about your bafarfoods.com platform",
    answer: "I engineered the official production web application for **Bafar Foods** (live at [bafarfoods.com](https://bafarfoods.com/)):\n• Built using **Next.js App Router**, React, and Tailwind CSS with server-side rendering for optimal SEO and performance.\n• Implemented an integrated **WhatsApp Commerce Checkout** allowing customers and restaurants to place instant orders straight into WhatsApp sales threads.\n• Developed an exclusive **B2B Wholesale Portal** supporting bulk institutional inquiries and dynamic tier pricing."
  },
  clinic: {
    query: "Tell me about your Clinic Management Software (React)",
    answer: "I developed a comprehensive **Enterprise Clinic Management Software (CMS)** using **React 18, TypeScript, and Vite**:\n• **Appointment Scheduling & Queue**: Real-time doctor slot reservations, patient booking, and live waiting room status.\n• **Stock & Inventory Orders**: Comprehensive medical inventory control, batch/expiry monitoring, automated low-stock threshold alerts, and supplier purchase order workflows.\n• **Doctor Consultations & Digital Rx**: Clinical diagnosis recording, electronic prescription generator, and consultation history.\n• **Patient EHR & Itemized Billing**: Centralized patient health records (EMR), automated invoice generation, and revenue/clinical analytics powered by **Recharts and Material UI (MUI)**."
  },
  yolo: {
    query: "Tell me about your Sign Language YOLO project",
    answer: "I developed a real-time **Sign Language Recognition system using a fine-tuned YOLO model**:\n• Achieved **94% real-time gesture & sign detection accuracy** on live video streams.\n• Evaluated precision across rigorous **mAP (mean Average Precision)** benchmarks.\n• Optimized the inference pipeline with OpenCV and PyTorch to achieve zero-lag webcam performance even under varying lighting conditions."
  },
  optimization: {
    query: "What is your model optimization and LoRA experience?",
    answer: "I specialize in parameter-efficient fine-tuning (PEFT/LoRA) and quantization: \n• Fine-tuned **Qwen2.5-VL-7B-Instruct** for Arabic OCR with 4-bit BitsAndBytes quantization & gradient checkpointing for resource-efficient GPU training.\n• Fine-tuned **DistilBERT** with LoRA for self-healing sentiment classification backed by **LangGraph** fallback circuits.\n• Self-hosted Gemma 4 26B with prompt caching and quantized weights on RunPod GPUs."
  },
  arabic: {
    query: "Tell me about your Arabic and Multimodal AI work",
    answer: "I have deep hands-on experience with multilingual and multimodal systems:\n• Arabic Document OCR using **Qwen2.5-VL-7B-Instruct** fine-tuned on custom Arabic document datasets.\n• Arabic Text-to-Speech pipeline built at **Banao Technologies** combining Python, Gemini, and gTTS.\n• Trilingual WhatsApp sales agent supporting **English, Arabic, and Malayalam** with voice note and photo understanding."
  },
  stack: {
    query: "What are your core tech stacks?",
    answer: "**Languages & APIs**: Python, FastAPI, Flask, SQL, REST APIs\n**GenAI & LLMs**: OpenAI, Gemini, Gemma, Qwen, Whisper, Ollama, Prompt Engineering\n**RAG & Agents**: LangChain, LangGraph, LlamaIndex, FAISS\n**Fine-Tuning & Quantization**: PyTorch, Hugging Face, LoRA/PEFT, BitsAndBytes\n**Infrastructure & Ops**: Docker, RunPod (GPU Cloud), Cloudflare Tunnel, n8n, Chatwoot, Twilio"
  },
  contact: {
    query: "How can I contact or hire Safa?",
    answer: "You can reach Safa directly at:\n• **Email**: safa.ps.workmail@gmail.com\n• **LinkedIn**: linkedin.com/in/safa-p-s\n• **GitHub**: github.com/fasafa\n• **Phone / WhatsApp**: +968 91858109 (Oman) / +91 7012401421 (India)\n\nSafa is actively available for AI Engineering, LLM Systems, and Generative AI roles!"
  }
};

function askAssistant(topicKey) {
  const chatLog = document.getElementById("terminal-chat-log");
  const data = assistantResponses[topicKey];
  if (!chatLog || !data) return;

  const userDiv = document.createElement("div");
  userDiv.className = "flex justify-end mb-3";
  userDiv.innerHTML = `
    <div class="bg-purple-900/40 border border-purple-500/40 text-purple-200 text-xs px-3.5 py-2 rounded-2xl rounded-tr-sm max-w-[85%] font-mono">
      > ${escapeHtml(data.query)}
    </div>
  `;
  chatLog.appendChild(userDiv);
  chatLog.scrollTop = chatLog.scrollHeight;

  const typingDiv = document.createElement("div");
  typingDiv.className = "flex justify-start mb-3";
  typingDiv.id = "assistant-typing";
  typingDiv.innerHTML = `
    <div class="bg-purple-950/60 border border-purple-500/20 text-purple-300 text-xs px-3 py-2 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse delay-75"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse delay-150"></span>
      <span class="text-[10px] text-slate-400 font-mono ml-1">Safa's AI Assistant is processing...</span>
    </div>
  `;
  chatLog.appendChild(typingDiv);
  chatLog.scrollTop = chatLog.scrollHeight;

  setTimeout(() => {
    const typingElem = document.getElementById("assistant-typing");
    if (typingElem) typingElem.remove();

    const botDiv = document.createElement("div");
    botDiv.className = "flex justify-start mb-3";
    
    let formattedAnswer = data.answer
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-200 font-semibold">$1</strong>')
      .replace(/\n•/g, '<br/>•')
      .replace(/\n\n/g, '<br/><br/>');

    botDiv.innerHTML = `
      <div class="bg-[#0f0b1c]/90 border border-purple-500/20 text-slate-200 text-xs px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] leading-relaxed shadow-lg">
        <div class="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-white/5 text-[10px] font-mono text-amber-300">
          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Safa's Portfolio Intelligence Kernel</span>
        </div>
        <div>${formattedAnswer}</div>
      </div>
    `;
    chatLog.appendChild(botDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 400);
}

// Copy Email Utility
function copyEmailToClipboard() {
  const email = "safa.ps.workmail@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const tooltip = document.getElementById("copy-email-toast");
    if (tooltip) {
      tooltip.classList.remove("opacity-0", "pointer-events-none");
      tooltip.classList.add("opacity-100");
      setTimeout(() => {
        tooltip.classList.remove("opacity-100");
        tooltip.classList.add("opacity-0", "pointer-events-none");
      }, 2500);
    }
  });
}

// Project Filter functionality
function filterProjects(category) {
  const buttons = document.querySelectorAll(".project-filter-btn");
  buttons.forEach(btn => {
    if (btn.dataset.filter === category) {
      btn.className = "project-filter-btn px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-amber-500/20 text-amber-300 border border-amber-500/40 transition";
    } else {
      btn.className = "project-filter-btn px-4 py-1.5 rounded-full text-xs font-mono font-medium text-slate-400 hover:text-white bg-slate-800/40 border border-white/5 transition";
    }
  });

  const cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    const categories = card.dataset.category.split(" ");
    if (category === "all" || categories.includes(category)) {
      card.style.display = "flex";
      card.style.opacity = "1";
    } else {
      card.style.display = "none";
    }
  });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) {
    menu.classList.toggle("hidden");
  }
}

// -------------------------------------------------------------
// 5. INTERACTIVE SOFT FEMALE VOICE INTRODUCTION (Zero API Keys)
// -------------------------------------------------------------
let isVoicePlaying = false;

function playVoiceIntro() {
  const audioEl = document.getElementById("safa-voice-audio");

  if (isVoicePlaying) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
    setVoicePlayingState(false);
    return;
  }

  // Attempt playing custom audio file if user attached one, else fallback to soft female SpeechSynthesis
  if (audioEl && audioEl.currentSrc && audioEl.readyState >= 2) {
    audioEl.play().then(() => {
      setVoicePlayingState(true);
      audioEl.onended = () => setVoicePlayingState(false);
    }).catch(() => {
      speakWithNativeTTS();
    });
  } else {
    speakWithNativeTTS();
  }
}

function speakWithNativeTTS() {
  if (!('speechSynthesis' in window)) {
    alert("Speech Synthesis is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  // Gentle, warm, natural introduction script (without mentioning seconds)
  const introScript = "Hey there, I'm Safa. Welcome to my portfolio. Take a look around to explore my work in self-hosted language models, multilingual conversational AI, and computer vision.";
  const utterance = new SpeechSynthesisUtterance(introScript);
  
  // Soft, relaxed, feminine cadence
  utterance.rate = 0.93;
  utterance.pitch = 1.08;
  utterance.volume = 0.95;

  // Search for the softest, most natural female voices
  const voices = window.speechSynthesis.getVoices();
  
  // Priority list for top high-quality natural female voices across browsers & OS
  const femaleVoice = voices.find(v => 
    v.name.includes("Jenny") || 
    v.name.includes("Aria") || 
    v.name.includes("Zira") ||
    v.name.includes("Google UK English Female") || 
    v.name.includes("Google US English") ||
    v.name.includes("Samantha") ||
    v.name.includes("Victoria") ||
    v.name.includes("Karen") ||
    (v.name.toLowerCase().includes("female") && !v.name.toLowerCase().includes("male"))
  ) || voices.find(v => 
    v.lang.startsWith("en") && 
    !v.name.toLowerCase().includes("david") && 
    !v.name.toLowerCase().includes("mark") && 
    !v.name.toLowerCase().includes("george") &&
    !v.name.toLowerCase().includes("guy")
  );

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  utterance.onstart = () => {
    setVoicePlayingState(true);
  };

  utterance.onend = () => {
    setVoicePlayingState(false);
  };

  utterance.onerror = () => {
    setVoicePlayingState(false);
  };

  window.speechSynthesis.speak(utterance);
}

function setVoicePlayingState(playing) {
  isVoicePlaying = playing;
  const btnLabel = document.getElementById("voice-btn-label");
  const waveBars = document.getElementById("soundwave-bars");

  if (playing) {
    if (btnLabel) btnLabel.innerText = "Playing Welcome... (Tap to stop)";
    if (waveBars) waveBars.classList.add("animate-soundwave");
  } else {
    if (btnLabel) btnLabel.innerText = "Listen to Safa's Welcome";
    if (waveBars) waveBars.classList.remove("animate-soundwave");
  }
}

// Initialize on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  initThreeJS();
  init3DTiltCards();
  selectArchStage("ingest");

  document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mobile-menu");
      if (menu) menu.classList.add("hidden");
    });
  });

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
});
