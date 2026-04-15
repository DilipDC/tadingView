export default function Login(API, onSuccess) {

  async function handleLogin(username, password) {
    const res = await fetch(API + "/api/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      onSuccess();
    } else {
      alert("Invalid login");
    }
  }

  function render() {
    return `
      <div class="center">
        <div class="card">
          <h2>Admin Login</h2>
          <input id="login-user" placeholder="Username">
          <input id="login-pass" type="password" placeholder="Password">
          <button id="login-btn">Login</button>
        </div>
      </div>
    `;
  }

  function bind() {
    document.getElementById("login-btn").onclick = () => {
      const user = document.getElementById("login-user").value;
      const pass = document.getElementById("login-pass").value;
      handleLogin(user, pass);
    };
  }

  return { render, bind };
}