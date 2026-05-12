const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const bookingForm = document.querySelector("#bookingForm");
const statusMessage = document.querySelector(".form-status");
let siteContent = {};

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    if (value) {
      element.textContent = value;
    }
  });
}

function setLink(selector, href, label) {
  const element = document.querySelector(selector);
  if (!element) return;

  if (href) {
    element.href = href;
  }

  if (label) {
    element.textContent = label;
  }
}

function setImage(selector, src, alt) {
  const image = document.querySelector(selector);
  if (!image) return;

  if (src) {
    image.src = src;
  }

  if (alt) {
    image.alt = alt;
  }
}

function renderHighlights(highlights = []) {
  const container = document.querySelector("[data-highlights]");
  if (!container || !highlights.length) return;

  container.innerHTML = highlights
    .map(
      (highlight) => `
        <div>
          <strong>${highlight.title}</strong>
          <span>${highlight.text}</span>
        </div>
      `
    )
    .join("");
}

function renderServices(services = []) {
  const serviceList = document.querySelector("[data-services-list]");
  const serviceSelect = document.querySelector("[data-service-select]");
  if (!services.length) return;

  if (serviceList) {
    serviceList.innerHTML = services
      .map(
        (service) => `
          <article class="service-card${service.featured ? " accent" : ""}">
            <span class="service-icon">${service.initials}</span>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="service-meta">
              <span>${service.duration}</span>
              <strong>${service.price}</strong>
            </div>
          </article>
        `
      )
      .join("");
  }

  if (serviceSelect) {
    serviceSelect.innerHTML = '<option value="">Select a service</option>';
    services.forEach((service) => {
      const option = document.createElement("option");
      option.textContent = service.name;
      option.value = service.name;
      serviceSelect.append(option);
    });
  }
}

function renderCareTips(tips = []) {
  const careList = document.querySelector("[data-care-list]");
  if (!careList || !tips.length) return;

  careList.innerHTML = tips
    .map(
      (tip, index) => `
        <div>
          <span>${String(index + 1).padStart(2, "0")}</span>
          <p>${tip}</p>
        </div>
      `
    )
    .join("");
}

function renderContent(content) {
  siteContent = content;

  document.title = content.siteName || document.title;
  const description = document.querySelector('meta[name="description"]');
  if (description && content.description) {
    description.content = content.description;
  }

  setText("[data-site-name]", content.siteName);
  setText("[data-brand-mark]", content.brandMark);
  setText("[data-hero-eyebrow]", content.hero?.eyebrow);
  setText("#hero-title", content.hero?.headline || content.siteName);
  setText("[data-hero-copy]", content.hero?.copy);
  setText("[data-primary-cta]", content.hero?.primaryButton);
  setText("[data-secondary-cta]", content.hero?.secondaryButton);
  renderHighlights(content.hero?.highlights);

  if (content.hero?.backgroundImage) {
    document.documentElement.style.setProperty("--hero-image", `url("${content.hero.backgroundImage}")`);
  }

  setText("[data-intro-eyebrow]", content.intro?.eyebrow);
  setText("[data-intro-heading]", content.intro?.heading);
  setText("[data-intro-copy]", content.intro?.copy);

  setText("[data-services-eyebrow]", content.servicesSection?.eyebrow);
  setText("[data-services-heading]", content.servicesSection?.heading);
  renderServices(content.services);

  setText("[data-gallery-eyebrow]", content.gallery?.eyebrow);
  setText("[data-gallery-heading]", content.gallery?.heading);
  setImage("[data-gallery-primary-image]", content.gallery?.primaryImage, content.gallery?.primaryAlt);
  setImage("[data-gallery-secondary-image]", content.gallery?.secondaryImage, content.gallery?.secondaryAlt);
  setText("[data-gallery-caption]", content.gallery?.caption);
  setText("[data-quote-text]", content.gallery?.quote);
  setText("[data-quote-author]", content.gallery?.quoteAuthor);

  setText("[data-care-eyebrow]", content.care?.eyebrow);
  setText("[data-care-heading]", content.care?.heading);
  setText("[data-care-copy]", content.care?.copy);
  renderCareTips(content.care?.tips);

  setText("[data-booking-eyebrow]", content.booking?.eyebrow);
  setText("[data-booking-heading]", content.booking?.heading);
  setText("[data-booking-copy]", content.booking?.copy);
  setText("[data-booking-button]", content.booking?.button);
  setLink("[data-phone-link]", `tel:${content.booking?.phoneHref}`, content.booking?.phoneDisplay);
  setLink("[data-email-link]", `mailto:${content.booking?.email}`, content.booking?.email);

  setText("[data-footer-copy]", content.footer?.copy);
  setText("[data-footer-credit]", content.footer?.credit);
}

async function loadContent() {
  try {
    const response = await fetch("content/site.json", { cache: "no-cache" });
    if (!response.ok) return;
    renderContent(await response.json());
  } catch (error) {
    console.warn("Using the built-in page content because the editable content file could not be loaded.", error);
  }
}

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

function encodeFormData(formData) {
  return new URLSearchParams(formData).toString();
}

async function submitBooking(event) {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const name = formData.get("name")?.toString().trim() || "there";
  const service = formData.get("service")?.toString() || "your service";
  const localMessage = siteContent.booking?.localMessage || "Thanks, {name}. Your {service} request is ready to send.";
  const successMessage = siteContent.booking?.successMessage || "Thanks, {name}. Your {service} request was sent.";

  if (window.location.protocol === "file:") {
    statusMessage.textContent = localMessage.replace("{name}", name).replace("{service}", service);
    bookingForm.reset();
    return;
  }

  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData(formData)
    });
    statusMessage.textContent = successMessage.replace("{name}", name).replace("{service}", service);
    bookingForm.reset();
  } catch (error) {
    statusMessage.textContent = localMessage.replace("{name}", name).replace("{service}", service);
  }
}

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

bookingForm.addEventListener("submit", submitBooking);
window.addEventListener("scroll", updateHeader, { passive: true });

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user && window.location.hash.includes("invite_token")) {
      window.netlifyIdentity.open("signup");
    }
  });
}

loadContent();
updateHeader();
