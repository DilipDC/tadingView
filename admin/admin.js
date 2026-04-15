const API = "http://127.0.0.1:5000";

let stocks = [];

// ================= LOGIN =================
async function login() {
  const res = await fetch(API + "/api/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  if (res.ok) {
    loginPage.classList.add("hidden");
    dashboard.classList.remove("hidden");
    loadStocks();
  } else {
    alert("Invalid login");
  }
}

// ================= LOAD STOCKS =================
async function loadStocks() {
  const res = await fetch(API + "/api/stocks");
  stocks = await res.json();
  render();
}

// ================= RENDER =================
function render() {
  const container = document.getElementById("stockContainer");

  container.innerHTML = stocks.map(s => `
    <div class="stock-card">
      <h3>${s.name} — ${s.price.toFixed(2)}</h3>

      <div class="mode-toggle">
        <button onclick="setMode(${s.id}, 'manual')" id="m-${s.id}">Manual</button>
        <button onclick="setMode(${s.id}, 'auto')" id="a-${s.id}">Auto</button>
      </div>

      <div class="controls">

        <label>Direction</label>
        <select id="dir-${s.id}">
          <option value="up">UP</option>
          <option value="down">DOWN</option>
        </select>

        <label>Percentage</label>
        <input id="pct-${s.id}" type="number" value="1">

        <label>Time (min)</label>
        <select id="time-${s.id}">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
        </select>

        <label>Users Up</label>
        <input id="up-${s.id}" value="50">

        <label>Users Down</label>
        <input id="down-${s.id}" value="50">

      </div>

      <button onclick="save(${s.id})">Save</button>
      <button onclick="deleteStock(${s.id})">Delete</button>
    </div>
  `).join("");
}

// ================= ADD STOCK =================
async function addStock() {
  await fetch(API + "/api/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: newName.value,
      price: newPrice.value
    })
  });

  loadStocks();
}

// ================= MODE =================
function setMode(id, mode) {
  document.getElementById("m-"+id).classList.remove("active-mode");
  document.getElementById("a-"+id).classList.remove("active-mode");

  if (mode === "manual") {
    document.getElementById("m-"+id).classList.add("active-mode");
  } else {
    document.getElementById("a-"+id).classList.add("active-mode");
  }

  document.getElementById("m-"+id).dataset.mode = mode;
}

// ================= SAVE =================
async function save(id) {
  const modeBtn = document.getElementById("m-"+id);

  const mode = modeBtn.classList.contains("active-mode") ? "manual" : "auto";

  await fetch(API + "/api/update/" + id, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      mode: mode,
      direction: document.getElementById("dir-"+id).value,
      percentage: document.getElementById("pct-"+id).value,
      interval: document.getElementById("time-"+id).value,
      users_up: document.getElementById("up-"+id).value,
      users_down: document.getElementById("down-"+id).value
    })
  });

  loadStocks();
}

// ================= DELETE =================
async function deleteStock(id) {
  await fetch(API + "/api/delete_stock/" + id, {
    method: "DELETE"
  });

  loadStocks();
}

// ================= THEME =================
function toggleTheme() {
  document.body.classList.toggle("light");
}

// AUTO REFRESH
setInterval(loadStocks, 2000);