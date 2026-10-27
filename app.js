/* ESSAM Digital Hub — no-backend contact forms
   Form data is not saved to a database. The visitor chooses WhatsApp or email
   and must press Send in their own app to deliver the message. */
(() => {
  "use strict";

  const WHATSAPP_NUMBER = "2349020397402"; // international format, no + or spaces
  const CONTACT_EMAIL = "essamtechnology76@gmail.com";

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Read a preselected service from URLs such as ?service=Online%20store.
  const params = new URLSearchParams(window.location.search);
  const serviceSelect = document.querySelector("#service-select");
  const requestedService = params.get("service");
  if (serviceSelect && requestedService) {
    const option = [...serviceSelect.options].find(
      (opt) => opt.text.trim().toLowerCase() === requestedService.trim().toLowerCase()
    );
    if (option) serviceSelect.value = option.value;
  }

  function cleanValue(value) {
    return String(value ?? "").trim();
  }

  function makeMessage(form) {
    const type = form.dataset.saveForm || "contact";
    const data = new FormData(form);
    const labels = {
      clients: "NEW CLIENT / PROJECT ENQUIRY",
      partners: "NEW MARKETING PARTNER APPLICATION",
      talent: "NEW TALENT REGISTRATION"
    };

    const lines = [
      `ESSAM DIGITAL HUB — ${labels[type] || "NEW MESSAGE"}`,
      "----------------------------------------"
    ];

    for (const [key, rawValue] of data.entries()) {
      if (key === "consent" || key === "terms") continue;
      const value = cleanValue(rawValue);
      if (!value) continue;
      const prettyKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
      lines.push(`${prettyKey}: ${value}`);
    }

    lines.push("----------------------------------------");
    lines.push("Please review this message and contact the applicant using the details provided.");
    return lines.join("\n");
  }

  function showDeliveryOptions(form, message) {
    let box = form.querySelector(".delivery-options");
    if (!box) {
      box = document.createElement("div");
      box.className = "delivery-options";
      box.setAttribute("aria-live", "polite");
      const status = form.querySelector(".form-message");
      if (status) status.insertAdjacentElement("afterend", box);
      else form.appendChild(box);
    }

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    const subject = encodeURIComponent("ESSAM Digital Hub — Website submission");
    const emailUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encoded}`;

    box.innerHTML = `
      <p><strong>Your details are ready.</strong> Choose how to send them. Your app will open with the message filled in; press <strong>Send</strong> to deliver it.</p>
      <div class="delivery-buttons">
        <a class="button primary" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Send through WhatsApp ↗</a>
        <a class="button secondary" href="${emailUrl}">Send through email ↗</a>
      </div>
      <p class="tiny-note">If neither app opens, copy your details and contact ESSAM directly at ${CONTACT_EMAIL} or WhatsApp +${WHATSAPP_NUMBER}.</p>
    `;
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.querySelectorAll("form[data-save-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const message = makeMessage(form);
      const status = form.querySelector(".form-message");
      if (status) status.textContent = "Your form is ready. Select WhatsApp or email below to send it.";
      showDeliveryOptions(form, message);
    });
  });

  // Contact links shared across the site.
  document.querySelectorAll("[data-essam-whatsapp]").forEach((link) => {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello ESSAM Digital Hub, I would like to make an enquiry.")}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  document.querySelectorAll("[data-essam-email]").forEach((link) => {
    link.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Enquiry for ESSAM Digital Hub")}`;
  });
})();
