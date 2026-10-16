
import { LoginController } from "./controller/loginController.js";
import { LoginView } from "./view/loginView.js";

const controller = new LoginController();
const view = new LoginView();

//Solicitamos al controller la creacion del user
//controller.guardarUsuario('admin','tupac','Quiero mi pass');


//acpturamos usuario y pass
const user= document.getElementById('username');
const pass= document.getElementById('password');

//generamos el evento para capturar el logueo
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await view.validateCredencial(user,pass);
});
//generamos el evento para recuperar la contraseña
const recuperar = document.getElementById('recuperar')
recuperar.addEventListener('click',async (e)=>{
    e.preventDefault();
    await view.RecoveryFrase();
})





