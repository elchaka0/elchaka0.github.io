document.addEventListener("DOMContentLoaded", function() {
  const usuarioAutenticado = localStorage.getItem("usuarioAutenticado");

  if (!usuarioAutenticado) {
    window.location.href = 'login.html';
    return;
  }

  const agregarExperienciaBtn = document.getElementById("agregar-experiencia");
  const borrarExperienciasBtn = document.getElementById("borrar-experiencias");
  const imagenInput = document.getElementById("imagen-input");
  const experienciasDiv = document.getElementById("experiencias");

   const homeButton = document.getElementById("home-button");
      homeButton.addEventListener("click", function() {
        window.location.href = 'index.html';
      });

  cargarExperiencias();

  agregarExperienciaBtn.addEventListener("click", agregarExperiencia);
  borrarExperienciasBtn.addEventListener("click", borrarTodasExperiencias);

  function agregarExperiencia() {
    const experienciaTitulo = document.getElementById("experiencia-titulo").value;
    const experienciaTexto = document.getElementById("experiencia-texto").value;
    const imagen = imagenInput.files.length > 0 ? imagenInput.files[0] : null;

    if (experienciaTitulo && experienciaTexto) {
      if (imagen) {
        const reader = new FileReader();
        reader.readAsDataURL(imagen);
        reader.onload = function () {
          const experiencia = {
            titulo: experienciaTitulo,
            descripcion: experienciaTexto,
            imagen: reader.result,
            fecha: obtenerFechaActual()
          };
          guardarExperiencia(experiencia);
          window.location.href = 'index.html';
        };
      } else {
        const experiencia = {
          titulo: experienciaTitulo,
          descripcion: experienciaTexto,
          imagen: null,
          fecha: obtenerFechaActual()
        };
        guardarExperiencia(experiencia);
        window.location.href = 'index.html';
      }
    } else {
      alert("Por favor, completa todos los campos antes de agregar la experiencia.");
    }
  }

  function guardarExperiencia(experiencia) {
    let experiencias = JSON.parse(localStorage.getItem("experiencias")) || [];
    experiencias.push(experiencia);
    localStorage.setItem("experiencias", JSON.stringify(experiencias));
  }

  function cargarExperiencias() {
    let experiencias = JSON.parse(localStorage.getItem("experiencias")) || [];
    experienciasDiv.innerHTML = '';
    experiencias.forEach((experiencia, index) => {
      mostrarExperiencia(experiencia, index);
    });
  }

  function mostrarExperiencia(experiencia, index) {
    const experienciaDiv = document.createElement("div");
    experienciaDiv.classList.add("experiencia");
    experienciaDiv.innerHTML = `
      <h2>${experiencia.titulo}</h2>
      <p>${experiencia.descripcion}</p>
      ${experiencia.imagen ? `<img src="${experiencia.imagen}" alt="Imagen de la experiencia">` : ''}
      <button class="editar-experiencia">Editar</button>
      <button class="borrar-experiencia">Borrar</button>
      <p class="fecha">${experiencia.fecha}</p>
    `;
    experienciasDiv.prepend(experienciaDiv);

    const editarBtn = experienciaDiv.querySelector(".editar-experiencia");
    editarBtn.addEventListener("click", function() {
      const nuevoTitulo = prompt("Editar título de la experiencia:", experiencia.titulo);
      const nuevoTexto = prompt("Editar experiencia:", experiencia.descripcion);
      if (nuevoTitulo !== null && nuevoTexto !== null) {
        experiencia.titulo = nuevoTitulo;
        experiencia.descripcion = nuevoTexto;
        experiencia.fecha = obtenerFechaActual();
        let experiencias = JSON.parse(localStorage.getItem("experiencias")) || [];
        experiencias[index] = experiencia;
        localStorage.setItem("experiencias", JSON.stringify(experiencias));
        cargarExperiencias();
      }
    });

    const borrarBtn = experienciaDiv.querySelector(".borrar-experiencia");
    borrarBtn.addEventListener("click", function() {
      if (confirm("¿Estás seguro de que quieres borrar esta experiencia?")) {
        borrarExperiencia(index);
        cargarExperiencias();
      }
    });
  }

  function borrarExperiencia(index) {
    let experiencias = JSON.parse(localStorage.getItem("experiencias")) || [];
    experiencias.splice(index, 1);
    localStorage.setItem("experiencias", JSON.stringify(experiencias));
  }

  function borrarTodasExperiencias() {
    if (confirm("¿Estás seguro de que quieres borrar todas las experiencias?")) {
      localStorage.removeItem("experiencias");
      experienciasDiv.innerHTML = '';
    }
  }

  function obtenerFechaActual() {
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
  }
});




