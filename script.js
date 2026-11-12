const products = [
  { name: "Bolsas riñón", category: "PACKAGING COMERCIAL", description: "Bolsas con manija troquelada tipo riñón para packaging comercial y otras aplicaciones.", alt: "Imagen ilustrativa de bolsa plástica con manija troquelada" },
  { name: "Bolsas camiseta", category: "COMERCIOS Y ACTIVIDADES", description: "Bolsas con manijas integradas, pensadas para comercios y distintas actividades.", alt: "Imagen ilustrativa de bolsa plástica tipo camiseta" },
  { name: "Bolsas e-commerce", category: "EMBALAJE Y ENVÍOS", description: "Bolsas para embalaje y envío de productos, con opciones de personalización según requerimientos.", alt: "Imagen ilustrativa de sobre plástico para envíos" },
  { name: "Termocontraíbles", category: "PROTECCIÓN Y PRESENTACIÓN", description: "Soluciones de films y bolsas termocontraíbles para diferentes aplicaciones de embalaje.", alt: "Imagen ilustrativa de film termocontraíble aplicado a una caja" },
  { name: "Bolsas de arranque", category: "ENVASADO", description: "Bolsas destinadas a distintas necesidades de envasado y presentación.", alt: "Imagen ilustrativa de rollo de bolsas plásticas perforadas" },
  { name: "Láminas de polietileno", category: "APLICACIONES INDUSTRIALES", description: "Láminas para diversas aplicaciones comerciales e industriales.", alt: "Imagen ilustrativa de lámina flexible de polietileno" },
  { name: "Films y bobinas", category: "EMBALAJE Y PROTECCIÓN", description: "Soluciones de film para embalaje, protección y otras aplicaciones.", alt: "Imagen ilustrativa de bobinas de film plástico" },
  { name: "Impresiones personalizadas", category: "HASTA CUATRO COLORES", description: "Impresión de hasta cuatro colores para personalizar bolsas y materiales según cada requerimiento.", alt: "Imagen ilustrativa de envase flexible con impresión simple" }
];

const productGrid = document.querySelector("#product-grid");
const select = document.querySelector('select[name="producto"]');
products.forEach((product, index) => {
  const card = document.createElement("article");
  card.className = "product-card";
  const x = (index % 4) * -100;
  const y = Math.floor(index / 4) * -100;
  card.innerHTML = `<div class="product-image"><img class="product-sheet" src="assets/product-grid.png" alt="${product.alt}" loading="lazy" style="--sheet-x:${x}%;--sheet-y:${y}%"><span class="product-number">0${index + 1}</span></div><div class="product-info"><span class="product-category">${product.category}</span><h3>${product.name}</h3><p>${product.description}</p><a href="#contacto" aria-label="Consultar por ${product.name}">Consultar <span aria-hidden="true">↗</span></a></div>`;
  productGrid.append(card);
  const option = document.createElement("option"); option.value = product.name; option.textContent = product.name; select.append(option);
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
