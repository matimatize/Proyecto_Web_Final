import { LoginModel } from '../model/loginModel.js';

export class LoginController {
  constructor() {
    this.loginModel = new LoginModel();
  }
  //Solicitamos al modelo guardar el usuario
 /*   guardarUsuario(username, password, frase) {
    const user = { username, password, frase };
    this.loginModel.guardarUsuario(user);
  }*/
  //Solicitamos al modelo validar las credenciales
  async validateCredentials(username, password) {
    return await this.loginModel.validateCredentials(username, password);
  }
  //Solicitamos al modelo verificar la frase de recuperacion
  async recoveryPhrase(username, frase, password) {
    return await this.loginModel.recoveryPhrase(username, frase,password);
  }
  //Solicitamos al modelo guardar la nueva pass en el user y devolvemos la pass
  async recoveryPassword(username, newPassword) {
    const pass = await this.loginModel.recoveryPassword(username, newPassword);
    return pass
  }

}