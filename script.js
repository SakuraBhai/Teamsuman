/**
 * ============================================================================
 * TEAM BLACK PANTHER EDUCATE — MAIN INTERACTIVE CONTROLLER (script.js)
 * ============================================================================
 * Renders data from config.js, powers the interactive Daily Salary Calculator,
 * YouTube video filtering, 1-click Copy buttons, and Neon Particle Canvas.
 */

(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};

  // SVG Icon Library for Services
  const SERVICE_ICONS = {
    "shield-check": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" stroke-linecap="round"/></svg>`,
    megaphone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
    send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    wallet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>`,
    headset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`
  };

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text) el.textContent = text;
  }

  function formatINR(num) {
    const symbol = (cfg.salary && cfg.salary.currencySymbol) || "₹";
    return symbol + Number(num).toLocaleString("en-IN");
  }

  // ---------------------------------------------------------------------------
  // 1. POPULATE ALL SECTIONS FROM CONFIG.JS
  // ---------------------------------------------------------------------------
  function renderSiteFromConfig() {
    // Brand & Hero
    if (cfg.brand) {
      setText("navBrandName", cfg.brand.name);
      setText("navBrandSub", `${cfg.brand.subName} • OFFICIAL`);
      setText("heroTagline", cfg.brand.tagline);
      setText("heroTitle1", cfg.brand.heroTitleLine1);
      setText("heroTitleHighlight", cfg.brand.heroTitleHighlight);
      setText("heroTitle2", cfg.brand.heroTitleLine2);
      setText("heroDescription", cfg.brand.heroDescription);
      setText("heroPrimaryCta", cfg.brand.primaryCtaText);
      setText("heroSecondaryCta", cfg.brand.secondaryCtaText);

      const statsContainer = document.getElementById("heroStatsContainer");
      if (statsContainer && Array.isArray(cfg.brand.stats)) {
        statsContainer.innerHTML = cfg.brand.stats
          .map(
            (st) => `
          <div class="stat-item">
            <div class="stat-number">${st.value.toLocaleString("en-IN")}${st.suffix || ""}</div>
            <div class="stat-label">${st.label}</div>
          </div>
        `
          )
          .join("");
      }
    }

    // Contact Links Globally
    if (cfg.contact) {
      const tgGroupLinks = document.querySelectorAll(".js-telegram-group-link");
      tgGroupLinks.forEach((a) => (a.href = cfg.contact.telegramGroupUrl));

      const tgPersonalLinks = document.querySelectorAll(".js-telegram-personal-link");
      tgPersonalLinks.forEach((a) => (a.href = cfg.contact.telegramPersonalUrl));

      const waUrl = `https://wa.me/${cfg.contact.whatsappCleanNumber}?text=${encodeURIComponent(
        cfg.contact.whatsappDefaultMsg || ""
      )}`;
      const waLinks = document.querySelectorAll(".js-whatsapp-link");
      waLinks.forEach((a) => (a.href = waUrl));

      setText("contactTgGroupHandle", cfg.contact.telegramGroupHandle);
      setText("contactTgPersonalId", cfg.contact.telegramPersonalId);
      setText("contactWhatsappNum", cfg.contact.whatsappNumber);
      setText("contactWorkingHours", cfg.contact.workingHours);
      setText("contactHeadquarters", cfg.contact.headquarters);

      setText("footerTgGroup", cfg.contact.telegramGroupHandle);
      setText("footerTgId", cfg.contact.telegramPersonalId);
      setText("footerWhatsapp", cfg.contact.whatsappNumber);
    }

    // About Us Section
    if (cfg.about) {
      setText("aboutBadge", cfg.about.badge);
      setText("aboutTitle", cfg.about.title);
      setText("aboutDescription", cfg.about.description);
      setText("aboutMission", cfg.about.mission);
      setText("aboutVision", cfg.about.vision);

      const pillarsBox = document.getElementById("aboutPillarsContainer");
      if (pillarsBox && Array.isArray(cfg.about.pillars)) {
        pillarsBox.innerHTML = cfg.about.pillars
          .map(
            (p) => `
          <div class="pillar-box">
            <h4>✦ ${p.title}</h4>
            <p>${p.desc}</p>
          </div>
        `
          )
          .join("");
      }

      const processBox = document.getElementById("processStepsContainer");
      if (processBox && Array.isArray(cfg.about.processSteps)) {
        processBox.innerHTML = cfg.about.processSteps
          .map(
            (s) => `
          <div class="process-step-card">
            <span class="step-num">${s.step}</span>
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
          </div>
        `
          )
          .join("");
      }
    }

    // Support & Services Section
    const servicesGrid = document.getElementById("servicesGridContainer");
    if (servicesGrid && Array.isArray(cfg.services)) {
      servicesGrid.innerHTML = cfg.services
        .map((srv) => {
          const iconSvg = SERVICE_ICONS[srv.icon] || SERVICE_ICONS["shield-check"];
          const pointsHtml = (srv.points || []).map((pt) => `<li>${pt}</li>`).join("");
          return `
          <article class="glass-card service-card reveal-up">
            <div>
              <div class="service-card-top">
                <div class="service-icon-box">${iconSvg}</div>
                <span class="service-badge">${srv.badge}</span>
              </div>
              <h3>${srv.title}</h3>
              <p>${srv.shortDesc}</p>
            </div>
            <ul class="service-points">
              ${pointsHtml}
            </ul>
          </article>
        `;
        })
        .join("");
    }

    // Salary Chart Section
    if (cfg.salary) {
      setText("salaryUpdatedLabel", cfg.salary.updatedLabel);
      setText("salarySubtitle", cfg.salary.subtitle);

      const paymentList = document.getElementById("paymentDetailsList");
      if (paymentList && Array.isArray(cfg.salary.paymentDetails)) {
        paymentList.innerHTML = cfg.salary.paymentDetails
          .map(
            (pd) => `
          <div class="payment-row">
            <span>${pd.label}</span>
            <strong>${pd.value}</strong>
          </div>
        `
          )
          .join("");
      }

      const rulesList = document.getElementById("salaryRulesList");
      if (rulesList && Array.isArray(cfg.salary.rules)) {
        rulesList.innerHTML = cfg.salary.rules.map((rule) => `<li><span>⚡</span><span>${rule}</span></li>`).join("");
      }
    }

    // Training Videos Section
    renderTrainingVideos("all");

    // BDG Game Official Deal Charts (Ads Fund Chart + Daily Salary Chart)
    const bdgChartsContainer = document.getElementById("bdgDealChartsContainer");
    if (bdgChartsContainer && cfg.bdgDealCharts) {
      const tgPersonal = (cfg.contact && cfg.contact.telegramPersonalUrl) || "#contact";
      const ads = cfg.bdgDealCharts.adsFund;
      const sal = cfg.bdgDealCharts.dailySalary;

      let chartsHtml = "";

      if (ads) {
        const adsRows = (ads.rows || [])
          .map(
            (r) => `
          <tr class="${r.popular ? "popular-tier" : ""}">
            <td><strong>${r.members}</strong></td>
            <td class="mono-num text-gold">${r.deposit}</td>
            <td><span class="daily-pay-badge">${r.fund}</span></td>
          </tr>
        `
          )
          .join("");

        const adsConds = (ads.conditions || []).map((c) => `<li><span>✔</span><span>${c}</span></li>`).join("");

        chartsHtml += `
          <div class="glass-card bdg-deal-panel reveal-up">
            <div class="bdg-panel-header">
              <div>
                <span class="bdg-gold-badge">🦅 ${ads.badge}</span>
                <h3>${ads.title}</h3>
                <p>${ads.subtitle}</p>
              </div>
              <button type="button" class="btn btn-glass btn-sm js-open-poster" data-poster-src="${ads.posterImage}" data-poster-title="BDG GAME — ADS FUND CHART">
                🔍 Full Poster
              </button>
            </div>

            <!-- Official Uploaded Poster Preview (Clickable for Zoom) -->
            <div class="bdg-poster-preview js-open-poster" data-poster-src="${ads.posterImage}" data-poster-title="BDG GAME — ADS FUND CHART">
              <img src="${ads.posterImage}" alt="BDG Game Trading System Ads Fund Chart" loading="lazy" />
              <div class="poster-zoom-hint">🔍 Tap to View Full Screen Chart</div>
            </div>

            <!-- Interactive Digital Table Version -->
            <div class="bdg-mini-table-wrap">
              <table class="bdg-mini-table" aria-label="BDG Game Ads Fund Chart">
                <thead>
                  <tr>
                    <th>DAILY NEW DEPOSIT MEMBER</th>
                    <th>DEPOSIT AMOUNT</th>
                    <th>ADS FUND</th>
                  </tr>
                </thead>
                <tbody>
                  ${adsRows}
                </tbody>
              </table>
            </div>

            <div class="bdg-highlight-strip">⚡ ${ads.highlightBanner}</div>

            <ul class="bdg-conditions-list">
              ${adsConds}
            </ul>

            <a href="${tgPersonal}" target="_blank" rel="noopener noreferrer" class="btn btn-neon btn-full">
              <span>Claim BDG Ads Fund Deal on Telegram</span>
              <span>→</span>
            </a>
          </div>
        `;
      }

      if (sal) {
        const salRows = (sal.rows || [])
          .map(
            (r) => `
          <tr>
            <td><strong>${r.active} ACTIVE PEOPLE</strong></td>
            <td><span class="daily-pay-badge">${r.salary} / DAY</span></td>
          </tr>
        `
          )
          .join("");

        const salConds = (sal.conditions || []).map((c) => `<li><span>⭐</span><span>${c}</span></li>`).join("");

        chartsHtml += `
          <div class="glass-card bdg-deal-panel reveal-up">
            <div class="bdg-panel-header">
              <div>
                <span class="bdg-gold-badge">👑 ${sal.badge}</span>
                <h3>${sal.title}</h3>
                <p>${sal.subtitle}</p>
              </div>
              <button type="button" class="btn btn-glass btn-sm js-open-poster" data-poster-src="${sal.posterImage}" data-poster-title="BDG GAME — DAILY SALARY CHART">
                🔍 Full Poster
              </button>
            </div>

            <!-- Official Uploaded Poster Preview (Clickable for Zoom) -->
            <div class="bdg-poster-preview js-open-poster" data-poster-src="${sal.posterImage}" data-poster-title="BDG GAME — DAILY SALARY CHART">
              <img src="${sal.posterImage}" alt="BDG Game Daily Salary Chart" loading="lazy" />
              <div class="poster-zoom-hint">🔍 Tap to View Full Screen Chart</div>
            </div>

            <!-- Interactive Digital Table Version -->
            <div class="bdg-mini-table-wrap">
              <table class="bdg-mini-table" aria-label="BDG Game Daily Salary Chart">
                <thead>
                  <tr>
                    <th>ACTIVE PEOPLE</th>
                    <th>DAILY SALARY</th>
                  </tr>
                </thead>
                <tbody>
                  ${salRows}
                </tbody>
              </table>
            </div>

            <div class="bdg-highlight-strip">🏆 ${sal.highlightBanner}</div>

            <ul class="bdg-conditions-list">
              ${salConds}
            </ul>

            <a href="${tgPersonal}" target="_blank" rel="noopener noreferrer" class="btn btn-neon btn-full">
              <span>Activate BDG Daily Salary Now</span>
              <span>→</span>
            </a>
          </div>
        `;
      }

      bdgChartsContainer.innerHTML = chartsHtml;
    }

    // Deals & Offers Section
    const offersGrid = document.getElementById("offersGridContainer");
    if (offersGrid && Array.isArray(cfg.offers)) {
      const tgPersonal = (cfg.contact && cfg.contact.telegramPersonalUrl) || "#contact";
      offersGrid.innerHTML = cfg.offers
        .map((of) => {
          const highlights = (of.highlights || []).map((h) => `<li>${h}</li>`).join("");
          return `
          <article class="glass-card offer-card ${of.featured ? "featured-offer" : ""} reveal-up">
            <div>
              <div class="offer-top-row">
                <span class="offer-badge">${of.badge}</span>
                <span class="offer-discount-pill">${of.discountTag}</span>
              </div>
              <h3>${of.title}</h3>
              <div class="offer-subtitle">${of.subtitle}</div>
              <p class="offer-desc">${of.description}</p>
              <ul class="offer-highlights">
                ${highlights}
              </ul>
            </div>
            <a href="${tgPersonal}" target="_blank" rel="noopener noreferrer" class="btn ${
            of.featured ? "btn-neon" : "btn-glass"
          } btn-full">
              <span>${of.ctaText}</span>
              <span>→</span>
            </a>
          </article>
        `;
        })
        .join("");
    }

    // Footer Year
    setText("currentYear", new Date().getFullYear());
  }

  // ---------------------------------------------------------------------------
  // 2. RENDER & FILTER YOUTUBE TRAINING VIDEOS
  // ---------------------------------------------------------------------------
  function renderTrainingVideos(categoryFilter) {
    const videoGrid = document.getElementById("videoGridContainer");
    if (!videoGrid || !Array.isArray(cfg.videos)) return;

    const filtered =
      categoryFilter === "all"
        ? cfg.videos
        : cfg.videos.filter((v) => v.category === categoryFilter);

    videoGrid.innerHTML = filtered
      .map((vid) => {
        const watchUrl =
          vid.customYoutubeUrl || `https://www.youtube.com/watch?v=${vid.youtubeId}`;
        const embedUrl = `https://www.youtube-nocookie.com/embed/${vid.youtubeId}?rel=0&modestbranding=1`;

        return `
        <article class="glass-card video-card reveal-up revealed">
          <div class="video-embed-frame">
            <iframe
              src="${embedUrl}"
              title="${vid.title}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div class="video-body">
            <div>
              <div class="video-meta-top">
                <span class="video-cat-tag">${vid.categoryLabel}</span>
                <span class="video-duration">⏱ ${vid.duration}</span>
              </div>
              <h3>${vid.title}</h3>
              <p>${vid.description}</p>
            </div>
            <div class="video-actions">
              <span class="video-level">🎓 ${vid.level}</span>
              <a href="${watchUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  }

  function initVideoFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        renderTrainingVideos(btn.getAttribute("data-filter"));
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 3. INTERACTIVE SALARY CALCULATOR SLIDER
  // ---------------------------------------------------------------------------
  function initSalaryCalculator() {
    const slider = document.getElementById("salaryTierSlider");
    if (!slider || !cfg.salary || !Array.isArray(cfg.salary.tiers)) return;

    const tiers = cfg.salary.tiers;
    slider.max = String(tiers.length - 1);

    function updateCalc(index) {
      const tier = tiers[index] || tiers[0];
      setText("calcSelectedRank", tier.rank);
      setText("calcActiveReq", tier.activeRequirement);
      setText("calcVolumeReq", tier.dailyVolume);
      setText("calcDailySalary", `${formatINR(tier.dailySalary)} / Day`);
      setText("calcSupportPerk", tier.supportLevel);
      setText("calcMonthlyTotal", tier.monthlyPotential);
      setText("calcWeeklyBonus", `Includes ${tier.weeklyBonus} Weekly Bonus`);
    }

    slider.addEventListener("input", (e) => {
      updateCalc(Number(e.target.value));
    });

    updateCalc(Number(slider.value));
  }

  // ---------------------------------------------------------------------------
  // 4. COPY TO CLIPBOARD & INSTANT ONBOARDING FORM LAUNCHER
  // ---------------------------------------------------------------------------
  function markButtonCopied(btn) {
    if (!btn) return;
    const orig = btn.getAttribute("data-orig-text") || btn.textContent;
    btn.setAttribute("data-orig-text", orig);
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = orig;
    }, 1600);
  }

  function initCopyButtons() {
    // Poster Lightbox Modal
    const lightbox = document.getElementById("posterLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
    const lightboxBackdrop = document.getElementById("lightboxBackdrop");

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });

    document.addEventListener("click", (e) => {
      const posterTrigger = e.target.closest(".js-open-poster");
      if (posterTrigger && lightbox && lightboxImg) {
        const src = posterTrigger.getAttribute("data-poster-src");
        const title = posterTrigger.getAttribute("data-poster-title") || "BDG GAME OFFICIAL CHART";
        if (src) {
          lightboxImg.src = src;
          if (lightboxCaption) lightboxCaption.textContent = title;
          lightbox.classList.add("open");
          lightbox.setAttribute("aria-hidden", "false");
        }
        return;
      }

      const btn = e.target.closest(".js-copy-btn");
      if (!btn) return;
      const targetId = btn.getAttribute("data-copy-target");
      const targetEl = document.getElementById(targetId);
      const valueToCopy = targetEl ? targetEl.textContent.trim() : "";
      if (!valueToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(valueToCopy).then(() => {
          markButtonCopied(btn);
        });
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = valueToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        markButtonCopied(btn);
      }
    });
  }

  function initQuickConnectLauncher() {
    const tgBtn = document.getElementById("sendViaTelegramBtn");
    const waBtn = document.getElementById("sendViaWhatsappBtn");

    function buildFormattedMessage() {
      const name = (document.getElementById("visitorName")?.value || "Panther Member").trim();
      const goal = document.getElementById("visitorGoal")?.value || "Daily Salary Program";
      const exp = document.getElementById("visitorExperience")?.value || "Beginner";
      const note = (document.getElementById("visitorNote")?.value || "").trim();

      let msg = `🦅 *TEAM BLACK PANTHER EDUCATE — VIP REQUEST*\n`;
      msg += `• *Name:* ${name}\n`;
      msg += `• *Selected Program:* ${goal}\n`;
      msg += `• *Experience:* ${exp}`;
      if (note) msg += `\n• *Note:* ${note}`;
      return msg;
    }

    if (tgBtn) {
      tgBtn.addEventListener("click", () => {
        const msg = buildFormattedMessage();
        const handle = ((cfg.contact && cfg.contact.telegramPersonalId) || "@BlackPanther_VIPSupport").replace(
          "@",
          ""
        );
        const url = `https://t.me/${handle}?text=${encodeURIComponent(msg)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      });
    }

    if (waBtn) {
      waBtn.addEventListener("click", () => {
        const msg = buildFormattedMessage();
        const phone = (cfg.contact && cfg.contact.whatsappCleanNumber) || "919876543210";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 5. NAVIGATION, SCROLL SPY & REVEAL ANIMATIONS
  // ---------------------------------------------------------------------------
  function initNavigationAndScroll() {
    const navbar = document.getElementById("navbar");
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const backToTopBtn = document.getElementById("backToTopBtn");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section-observer");

    // Mobile drawer toggle
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener("click", () => {
        const isOpen = mobileDrawer.classList.toggle("open");
        mobileBtn.classList.toggle("open", isOpen);
        mobileBtn.setAttribute("aria-expanded", String(isOpen));
      });

      mobileDrawer.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileDrawer.classList.remove("open");
          mobileBtn.classList.remove("open");
          mobileBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Sticky Navbar & Back-to-top visibility
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (navbar) navbar.classList.toggle("scrolled", y > 30);
        if (backToTopBtn) backToTopBtn.classList.toggle("visible", y > 500);

        // Active section scroll spy
        let currentId = "home";
        sections.forEach((sec) => {
          const top = sec.offsetTop - 160;
          if (y >= top) {
            currentId = sec.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
        });
      },
      { passive: true }
    );

    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Scroll reveal IntersectionObserver
    const revealEls = document.querySelectorAll(".reveal-up, .reveal-scale");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("revealed"));
    }

    // Cursor spotlight glow
    const cursorGlow = document.getElementById("cursorGlow");
    if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener(
        "mousemove",
        (e) => {
          cursorGlow.style.left = `${e.clientX}px`;
          cursorGlow.style.top = `${e.clientY}px`;
        },
        { passive: true }
      );
    }
  }

  // ---------------------------------------------------------------------------
  // 6. AMBIENT NEON PURPLE PARTICLE CANVAS
  // ---------------------------------------------------------------------------
  function initPantherParticles() {
    const canvas = document.getElementById("pantherParticles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = Math.min(48, Math.floor(width / 28));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.55 + 0.2
    }));

    window.addEventListener(
      "resize",
      () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      },
      { passive: true }
    );

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 180, 254, ${p.alpha})`;
        ctx.fill();

        // Subtle connecting constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${(1 - dist / 135) * 0.14})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    draw();
  }

  // Initialize Everything on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    renderSiteFromConfig();
    initSalaryCalculator();
    initVideoFilters();
    initCopyButtons();
    initQuickConnectLauncher();
    initNavigationAndScroll();
    initPantherParticles();
  });
})();
