const select = document.querySelector('select[name="producto"]');
document.querySelectorAll("[data-product-query]").forEach(link => {
  link.addEventListener("click", () => {
    const productName = link.closest(".product-card").querySelector("h3").textContent.trim();
    select.value = productName;
  });
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "Abrir menú" : "Cerrar menú");
  nav.classList.toggle("is-open", !open);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false"); menuButton.setAttribute("aria-label", "Abrir menú"); nav.classList.remove("is-open");
}));

const quoteForm = document.querySelector("#quote-form");
const formStatus = document.querySelector("#form-status");
const quoteEmail = "polizymsaci@gmail.com";
const quoteSubject = "Solicitud de presupuesto - Polizym";
const quoteFields = [
  ["nombre", "Nombre"],
  ["empresa", "Empresa o emprendimiento"],
  ["email", "Email"],
  ["telefono", "Teléfono"],
  ["producto", "Tipo de producto"],
  ["cantidad", "Cantidad estimada"],
  ["mensaje", "Mensaje o descripción del pedido"]
];

function buildQuote(data) {
  const body = quoteFields
    .map(([name, label]) => `${label}: ${String(data.get(name) || "").trim() || "No indicado"}`)
    .join("\r\n");
  const copyText = `Para: ${quoteEmail}\r\nAsunto: ${quoteSubject}\r\n\r\n${body}`;
  const mailto = `mailto:${quoteEmail}?subject=${encodeURIComponent(quoteSubject)}&body=${encodeURIComponent(body)}`;
  return { body, copyText, mailto };
}

const submitButton = quoteForm.querySelector(".form-submit");
const submitButtonLabel = submitButton.innerHTML;

quoteForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;

  const data = Object.fromEntries(new FormData(quoteForm).entries());
  const submitUrl = quoteForm.action;
  submitButton.disabled = true;
  submitButton.textContent = "Enviando consulta...";
  quoteForm.setAttribute("aria-busy", "true");
  formStatus.dataset.state = "sending";
  formStatus.textContent = "Enviando consulta...";

  try {
    const response = await fetch(submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok || !(result.success === true || result.success === "true")) {
      throw new Error("El servicio no aceptó la consulta.");
    }
    formStatus.dataset.state = "success";
    formStatus.textContent = "FormSubmit aceptó la consulta. La entrega al correo depende de la activación y el procesamiento del servicio.";
  } catch {
    formStatus.dataset.state = "error";
    formStatus.textContent = "No se pudo confirmar el envío. Tus datos siguen en el formulario; podés reintentar o usar «Copiar consulta».";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = submitButtonLabel;
    quoteForm.removeAttribute("aria-busy");
  }
});

async function copyQuoteToClipboard(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temporaryField = document.createElement("textarea");
  temporaryField.value = text;
  temporaryField.setAttribute("readonly", "");
  temporaryField.style.position = "fixed";
  temporaryField.style.left = "0";
  temporaryField.style.top = "0";
  temporaryField.style.opacity = "0.01";
  temporaryField.style.fontSize = "16px";
  document.body.append(temporaryField);
  temporaryField.focus();
  temporaryField.select();
  temporaryField.setSelectionRange(0, temporaryField.value.length);
  const copied = document.execCommand("copy");
  temporaryField.remove();
  if (!copied) throw new Error("No se pudo copiar al portapapeles.");
}

document.querySelector("#copy-consultation").addEventListener("click", async () => {
  if (!quoteForm.reportValidity()) return;

  const { copyText } = buildQuote(new FormData(quoteForm));
  try {
    await copyQuoteToClipboard(copyText);
    formStatus.textContent = `Consulta copiada. Pegala en tu correo y enviala a ${quoteEmail}.`;
  } catch {
    window.prompt("No se pudo copiar automáticamente. Copiá la consulta completa:", copyText);
    formStatus.textContent = `Si no pudiste copiarla desde la ventana, volvé a intentarlo. El destinatario es ${quoteEmail}.`;
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
