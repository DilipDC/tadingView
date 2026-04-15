import StockEditor from "./StockEditor.js";

export default function Dashboard(API) {

  let stocks = [];

  async function load() {
    const res = await fetch(API + "/api/stocks");
    stocks = await res.json();
    renderStocks();
  }

  function render() {
    return `
      <header>
        <h1>Market Control</h1>
        <button id="themeBtn">🌙</button>
      </header>

      <section class="add-stock">
        <input id="newName" placeholder="Stock Name">
        <input id="newPrice" placeholder="Start Price">
        <button id="addBtn">+ Add</button>
      </section>

      <div id="stockContainer"></div>
    `;
  }

  function bind() {
    document.getElementById("addBtn").onclick = addStock;
    document.getElementById("themeBtn").onclick = () => {
      document.body.classList.toggle("light");
    };
  }

  async function addStock() {
    await fetch(API + "/api/add", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: newName.value,
        price: newPrice.value
      })
    });

    load();
  }

  function renderStocks() {
    const container = document.getElementById("stockContainer");

    container.innerHTML = stocks.map(s => {
      const editor = StockEditor(API, s);
      return editor.render();
    }).join("");

    stocks.forEach(s => {
      const editor = StockEditor(API, s);
      editor.bind();
    });
  }

  return { render, bind, load };
}