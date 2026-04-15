export default function ModeSwitcher(id) {

  let mode = "manual";

  function render() {
    return `
      <div class="mode-toggle">
        <button id="manual-${id}" class="active">Manual</button>
        <button id="auto-${id}">Auto</button>
      </div>
    `;
  }

  function bind() {
    const m = document.getElementById(`manual-${id}`);
    const a = document.getElementById(`auto-${id}`);

    m.onclick = () => {
      mode = "manual";
      m.classList.add("active-mode");
      a.classList.remove("active-mode");
    };

    a.onclick = () => {
      mode = "auto";
      a.classList.add("active-mode");
      m.classList.remove("active-mode");
    };
  }

  function getMode() {
    return mode;
  }

  return { render, bind, getMode };
}