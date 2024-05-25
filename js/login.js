document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verificar las credenciales
    if (username === "admin" && password === "admin123") {
      // Credenciales correctas, almacenar estado de inicio de sesión
      localStorage.setItem("usuarioAutenticado", true);
      // Redirigir a la página de upload
      window.location.href = 'upload.html';
    } else {
      // Credenciales incorrectas, mostrar mensaje de error
      alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
  });
});
