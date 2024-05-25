document.addEventListener("DOMContentLoaded", function() {
  const toolsLoginForm = document.getElementById("tools-login-form");

  toolsLoginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("usuarioAutenticadoHerramientas", true);
      window.location.href = 'tools-upload.html';
    } else {
      alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
  });
});
