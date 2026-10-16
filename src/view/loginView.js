import {LoginController} from '../controller/loginController.js';

export class LoginView {
    constructor() {
        this.controller = new LoginController();
    }
//Solicitamos al controlador que ejecute la validacion de credencial y accionamos de acuerdo al resultado     
async validateCredencial(username, password){
    const vuser = username.value;
    const vpass = password.value;
    const valida = await this.controller.validateCredentials(vuser,vpass);
    const session =sessionStorage.getItem('currentUser');
    if (session === "none"){
        let errorPass= document.getElementById('passerror');
        errorPass.innerHTML="credenciales erroneas";
    }else{ 
        window.location.href = "../index.html"
    }
}
//GEneramos la apertura del dialog modal chequeamos la frase de recuperacion y accionamos al respecto
RecoveryFrase(){
    const recoveryForm = document.getElementById('recoveryForm');
    const errorDialog = document.getElementById('errorDialog');
    errorDialog.showModal();
    recoveryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const recoveryFrase = document.getElementById('recoveryPhrase').value;
        const recoveryUser = document.getElementById('rusername').value;
        const newPass = document.getElementById('newpass').value;
        const cnewPass= document.getElementById('confirmnewpass').value;
        
        if(newPass !== cnewPass)
            {return alert("Las contraseñas no coinciden")} else {
            const reFrase = await this.controller.recoveryPhrase(recoveryUser,recoveryFrase,newPass);
            alert("Contraseña modificada correctamente");
            errorDialog.close();
        };
        
        
        /*const controller = new LoginController();
        const reFrase = controller.recoveryPhrase(recoveryUser,recoveryFrase);
        if(reFrase===true){
            newPass.innerHTML='<input type="text"placeholder="nuevo password"id="newpass" name="nwepass" required class="input-field"/> <input type="text"  placeholder="confirmar nuevo password" id="confirmnewpass" name="confirmnewpass" required class="input-field"></input> <button type="button" id="validarnewpass">Cambiar</button> <div id="nomachrecovery"></div>';}else{
            newPass.innerHTML='La frase no es correcta, reintente o presione "escape" para salir'
        };
        //Validamos el nuevo pass y ejecutamos su guardado en local storage
        const valChange=document.getElementById('validarnewpass');
        valChange.addEventListener('click', function (e){
            e.preventDefault;
            const confirmpass =() =>{
                alert(controller.recoveryPassword(recoveryUser,newPass));
            }
            const newPass= document.getElementById('newpass').value;
            const cnewPass= document.getElementById('confirmnewpass').value;
            const noMatchPass= document.getElementById('nomachrecovery');
            newPass === cnewPass ? confirmpass() :
            noMatchPass.innerHTML="Las contraseñas no coinciden";

        })*/
    })
       
}
    
}