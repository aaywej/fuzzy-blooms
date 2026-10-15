const $ = (s) => document.querySelector(s);
const peso = (n) => "₱" + n.toLocaleString("en-PH");

const cart = [];
const custom = {};
let filter = "all";

const PICKABLE = FLOWERS.map((f) => ({ ...f, k: "f" + f.id })).concat(LEAVES.map((l) => ({ ...l, k: "l" + l.id })));

function renderShop() {
  const list = PRODUCTS.filter((p) => filter === "all" || p.type === filter);
  $("#grid").innerHTML = list.map((p) => `
    <article class="card${p.available ? "" : " off"}">
      <button class="pic" type="button" data-zoom="${p.img}" data-alt="${p.name}" aria-label="View ${p.name} larger">
        <img src="${p.img}" alt="${p.name}" width="600" height="750" loading="lazy">
      </button>
      <div class="body">
        <h3>${p.name}</h3>
        <p class="note">${p.note || ""}</p>
        <div class="row">
          <span class="price">${peso(p.price)}</span>
          ${p.available ? `<button class="btn sm" type="button" data-add="${p.id}">Add to order</button>` : `<span class="badge">Not available</span>`}
        </div>
      </div>
    </article>`).join("");
}

function thumbPos(k) {
  const n = PICKABLE.findIndex((x) => x.k === k);
  return `background-position:-${(n % 5) * 56}px -${Math.floor(n / 5) * 56}px`;
}

function renderPicker(target, items, prefix) {
  $(target).innerHTML = items.map((i) => {
    const k = prefix + i.id;
    return `<div class="item${i.available ? "" : " off"}">
      <div class="who"><span class="thumb" style="${thumbPos(k)}" aria-hidden="true"></span><div class="nm"><strong>${i.name}</strong>${i.available ? `<span class="small">${peso(i.price)} each</span>` : ""}</div></div>
      ${i.available
        ? `<div class="step"><button type="button" data-k="${k}" data-d="-1" aria-label="Fewer ${i.name}">−</button><output id="q-${k}">0</output><button type="button" data-k="${k}" data-d="1" aria-label="More ${i.name}">+</button></div>`
        : `<span class="badge">Not available</span>`}
    </div>`;
  }).join("");
}

function picked() {
  return PICKABLE.filter((i) => i.available && custom[i.k] > 0);
}

function renderEstimate() {
  const p = picked();
  const total = p.reduce((s, i) => s + i.price * custom[i.k], 0);
  $("#est").textContent = peso(total);
  $("#estLines").innerHTML = p.length
    ? p.map((i) => `<li><span>${i.name} × ${custom[i.k]}</span><span>${peso(i.price * custom[i.k])}</span></li>`).join("")
    : "<li><span>Nothing selected yet</span></li>";
  $("#addCustom").disabled = !p.length;
}

function renderCart() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  $("#cartList").innerHTML = cart.length
    ? cart.map((i, n) => `<li><span>${i.name} × ${i.qty}${i.detail ? `<br><span class="small">${i.detail}</span>` : ""}</span><span>${peso(i.price * i.qty)}<button class="rm" type="button" data-rm="${n}">Remove</button></span></li>`).join("")
    : "<li><span>Nothing here yet. Add items from the shop or the custom bouquet builder.</span></li>";
  $("#cartTot").textContent = peso(total);
  $("#pill").hidden = !cart.length;
  $("#pill").textContent = `Your order (${count}) · ${peso(total)}`;
}

function renderGallery() {
  const imgs = PRODUCTS.map((p) => ({ src: p.img, alt: p.name })).concat(GALLERY_EXTRA);
  $("#gal").innerHTML = imgs.map((i) => `<button class="g" type="button" data-zoom="${i.src}" data-alt="${i.alt}" aria-label="View ${i.alt} larger"><img src="${i.src}" alt="${i.alt}" loading="lazy"></button>`).join("");
}

function renderFaq() {
  $("#faqList").innerHTML = FAQS.map((f) => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("");
}

function flash(btn, text) {
  const old = btn.textContent;
  btn.textContent = text;
  setTimeout(() => { btn.textContent = old; }, 1200);
}

document.addEventListener("click", (e) => {
  const zoom = e.target.closest("[data-zoom]");
  if (zoom) {
    $("#zimg").src = zoom.dataset.zoom;
    $("#zimg").alt = zoom.dataset.alt;
    $("#zoom").showModal();
    return;
  }
  const add = e.target.closest("[data-add]");
  if (add) {
    const p = PRODUCTS.find((x) => x.id === add.dataset.add);
    const line = cart.find((x) => x.id === p.id);
    if (line) line.qty += 1;
    else cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
    renderCart();
    flash(add, "Added");
    return;
  }
  const step = e.target.closest("[data-k]");
  if (step) {
    const k = step.dataset.k;
    custom[k] = Math.max(0, Math.min(50, (custom[k] || 0) + Number(step.dataset.d)));
    $("#q-" + k).textContent = custom[k];
    renderEstimate();
    return;
  }
  const rm = e.target.closest("[data-rm]");
  if (rm) {
    cart.splice(Number(rm.dataset.rm), 1);
    renderCart();
  }
});

$("#tabs").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  filter = b.dataset.f;
  document.querySelectorAll("#tabs button").forEach((t) => t.setAttribute("aria-pressed", t === b));
  renderShop();
});

$("#addCustom").addEventListener("click", (e) => {
  const p = picked();
  if (!p.length) return;
  const total = p.reduce((s, i) => s + i.price * custom[i.k], 0);
  cart.push({ id: "custom" + Date.now(), name: "Custom bouquet", detail: p.map((i) => `${i.name} × ${custom[i.k]}`).join(", "), price: total, qty: 1 });
  renderCart();
  flash(e.currentTarget, "Added to your order");
});

function copyText(text) {
  if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
}

$("#orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!cart.length) {
    $("#err").textContent = "Add at least one item to your order first.";
    return;
  }
  $("#err").textContent = "";
  const v = (id) => $(id).value.trim();
  const ref = "CTF-" + Date.now().toString(36).toUpperCase().slice(-5);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const items = cart.map((i) => `- ${i.name}${i.detail ? ` (${i.detail})` : ""} x${i.qty} = ${peso(i.price * i.qty)}`);
  const text = [
    "C & T FUZZY BLOOMS ORDER REQUEST",
    "Reference: " + ref,
    "Name: " + v("#name"),
    "Contact: " + v("#phone"),
    "Facebook or TikTok: " + (v("#social") || "none"),
    "Address: " + v("#addr"),
    "Pickup or delivery: " + $("#ful").value,
    "",
    "Items:",
    ...items,
    "Estimated total: " + peso(total),
    "",
    "Notes: " + (v("#notes") || "none"),
    "Payment: GCash, full payment or 50% downpayment after confirmation"
  ].join("\n");
  $("#sum").value = text;
  $("#msgBtn").href = CONFIG.messengerLink;
  copyText(text);
  $("#doneDlg").showModal();
});

$("#copyBtn").addEventListener("click", (e) => {
  $("#sum").select();
  copyText($("#sum").value);
  flash(e.currentTarget, "Copied");
});
$("#closeBtn").addEventListener("click", () => $("#doneDlg").close());
$("#zclose").addEventListener("click", () => $("#zoom").close());

$("#gcNum").textContent = CONFIG.gcashNumber;
$("#gcName").textContent = CONFIG.gcashName;
$("#delNote").textContent = CONFIG.deliveryNote;

renderShop();
renderPicker("#flowers", FLOWERS, "f");
renderPicker("#leaves", LEAVES, "l");
renderEstimate();
renderCart();
renderGallery();
renderFaq();
