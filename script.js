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

const config = window.POLIZYM_CONFIG || {};
if (config.whatsappE164 && /^\+[1-9]\d{7,14}$/.test(config.whatsappE164)) {
  const number = config.whatsappE164.replace(/\D/g, "");
  const message = "Hola, quisiera consultar por un presupuesto en Polizym.";
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const links = [document.querySelector(".whatsapp-link"), document.querySelector(".whatsapp-float")];
  links.forEach(link => {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.hidden = false;
  });

  const floatingLink = document.querySelector(".whatsapp-float");
  const quoteForm = document.querySelector("#quote-form");
  if ("IntersectionObserver" in window && floatingLink && quoteForm) {
    const formVisibility = new IntersectionObserver(([entry]) => {
      floatingLink.classList.toggle("is-form-visible", entry.isIntersecting);
    }, { threshold: 0.12 });
    formVisibility.observe(quoteForm);
  }
}

document.querySelector("#quote-form").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const fields = ["nombre", "empresa", "email", "telefono", "producto", "cantidad", "mensaje"];
  const labels = { nombre: "Nombre", empresa: "Empresa o emprendimiento", email: "Email", telefono: "Teléfono", producto: "Tipo de producto", cantidad: "Cantidad estimada", mensaje: "Mensaje" };
  const body = fields.map(key => `${labels[key]}: ${data.get(key) || "No indicado"}`).join("\n");
  const subject = encodeURIComponent(`Consulta desde la web - ${data.get("nombre")}`);
  window.location.href = `mailto:${encodeURIComponent(config.email || "polizymsaci@gmail.com")}?subject=${subject}&body=${encodeURIComponent(body)}`;
  document.querySelector("#form-status").textContent = "Tu aplicación de correo debería abrirse con la consulta preparada.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
