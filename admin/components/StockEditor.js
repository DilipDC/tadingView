import ModeSwitcher from "./ModeSwitcher.js";

export default function StockEditor(API, stock) {

  const modeSwitch = ModeSwitcher(stock.id);

  function render() {
    return `
      <div class="stock-card" id="stock-${stock.id}">
        <h3>${stock.name} — ${stock.price.toFixed(2)}</h3>

        ${modeSwitch.render()}

        <div class="controls">

          <label>Direction</label>
          <select id="dir-${stock.id}">
            <option value="up">UP</option>
            <option value="down">DOWN</option>
          </select>

          <label>%</label>
          <input id="pct-${stock.id}" type="number" value="1">

          <label>Time</label>
          <select id="time-${stock.id}">
            <option value="1">1m</option>
            <option value="2">2m</option>
            <option value="5">5m</option>
          </select>

          <label>Users Up</label>
          <input id="up-${stock.id}" value="50">

          <label>Users Down</label>
          <input id="down-${stock.id}" value="50">

        </div>

        <button onclick="saveStock(${stock.id})">Save</button>
        <button onclick="deleteStock(${stock.id})">Delete</button>
      </div>
    `;
  }

  function bind() {
    modeSwitch.bind();
  }

  // expose global save (simplified)
  window.saveStock = async (id) => {
    await fetch(API + "/api/update/" + id, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        mode: modeSwitch.getMode(),
        direction: document.getElementById(`dir-${id}`).value,
        percentage: document.getElementById(`pct-${id}`).value,
        interval: document.getElementById(`time-${id}`).value,
        users_up: document.getElementById(`up-${id}`).value,
        users_down: document.getElementById(`down-${id}`).value
      })
    });
  };

  window.deleteStock = async (id) => {
    await fetch(API + "/api/delete_stock/" + id, {
      method: "DELETE"
    });
    location.reload();
  };

  return { render, bind };
}