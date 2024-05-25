document.addEventListener("DOMContentLoaded", function() {
  const usuarioAutenticado = localStorage.getItem("usuarioAutenticadoHerramientas");

  if (!usuarioAutenticado) {
    window.location.href = 'tools-login.html';
  }

  const agregarHerramientaBtn = document.getElementById("agregar-herramienta");
  const borrarHerramientasBtn = document.getElementById("borrar-herramientas");
  const imagenInput = document.getElementById("imagen-input");
  const herramientasDiv = document.getElementById("herramientas");

  cargarHerramientas();

  agregarHerramientaBtn.addEventListener("click", function() {
    const herramientaTitulo = document.getElementById("herramienta-titulo").value;
    const herramientaTexto = document.getElementById("herramienta-descripcion").value;
    const imagen = imagenInput.files.length > 0 ? imagenInput.files[0] : null;

    if (herramientaTitulo && herramientaTexto) {
      if (imagen) {
        const reader = new FileReader();
        reader.readAsDataURL(imagen);
        reader.onload = function () {
          const herramienta = {
            titulo: herramientaTitulo,
            descripcion: herramientaTexto,
            imagen: reader.result,
            fecha: obtenerFechaActual()
          };
          guardarHerramienta(herramienta);
          window.location.href = 'tools.html';
        };
      } else {
        const herramienta = {
          titulo: herramientaTitulo,
          descripcion: herramientaTexto,
          imagen: null,
          fecha: obtenerFechaActual()
        };
        guardarHerramienta(herramienta);
        window.location.href = 'tools.html';
      }
    } else {
      alert("Por favor, completa todos los campos antes de agregar la herramienta.");
    }
  });

  borrarHerramientasBtn.addEventListener("click", function() {
    if (confirm("¿Estás seguro de que deseas borrar todas las herramientas?")) {
      localStorage.removeItem("herramientas");
      herramientasDiv.innerHTML = '';
    }
  });

  function guardarHerramienta(herramienta) {
    let herramientas = JSON.parse(localStorage.getItem("herramientas")) || [];
    herramientas.push(herramienta);
    localStorage.setItem("herramientas", JSON.stringify(herramientas));
  }

  function cargarHerramientas() {
    let herramientas = JSON.parse(localStorage.getItem("herramientas")) || [];
    herramientas.forEach((herramienta) => {
      mostrarHerramienta(herramienta);
    });
  }

  function mostrarHerramienta(herramienta) {
    const herramientaDiv = document.createElement("div");
    herramientaDiv.classList.add("trabajo");
    herramientaDiv.innerHTML = `
      <h2>${herramienta.titulo}</h2>
      <p>${herramienta.descripcion}</p>
      ${herramienta.imagen ? `<img src="${herramienta.imagen}" alt="Imagen de la herramienta">` : ''}
      <p class="fecha">${herramienta.fecha}</p>
    `;
    herramientasDiv.prepend(herramientaDiv);
  }

  function obtenerFechaActual() {
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', };
    return fecha.toLocaleDateString('es-ES', opciones);
  }
});
