
import {UserView} from "../src/view/userView.js";
import {UserController} from "./controller/userController.js";


const controller = new UserController();
const view = new UserView(controller);



//validamos currentUser en session Storage si no encontramos enviamos a la pagina de loggin
const isLogin = sessionStorage.getItem('currentUser');
 if (!isLogin){ window.location.href = "/Proyecto_Web_Final/login.html"};

await  view.render();



// Asignamos los eventos necesarios para el funcionamiento del formulario principal, el formulario de modificacion de productos y la tabla de productos
const form = document.getElementById("formulario");
const tabla = document.querySelector(".tabla");
// El evento submit del formulario principal se encarga de agregar un nuevo producto al controlador y de actualizar la vista con los datos actuales. El evento click de la tabla se encarga de detectar si se hizo click en un botón de modificar o eliminar y de llamar a los métodos correspondientes de la vista para modificar o eliminar el producto.
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const dni = document.getElementById("DNI").value;
  const rol = document.getElementById("rol").value;
  await controller.addUser(username, nombre, apellido, dni, rol);
  await view.render();
  form.reset();
  });

// El evento click de la tabla se encarga de detectar si se hizo click en un botón de modificar o eliminar y de llamar a los métodos correspondientes de la vista para modificar o eliminar el producto.
tabla.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-modif")) {
    const id = parseInt(event.target.getAttribute("data-id"));
    await view.modificarUser(id);
  } else if (event.target.classList.contains("btn-elim")) {
    const id = parseInt(event.target.getAttribute("data-id"));
    await view.eliminarUser(id);
  }
});

// Evento para cerrar sesión, eliminando el currentUser del sessionStorage y redirigiendo a la página de login
document.getElementById("endsession").addEventListener("click", () => {
  sessionStorage.removeItem('currentUser');
  window.location.href = "../login.html";
})



