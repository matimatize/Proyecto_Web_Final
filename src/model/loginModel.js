export class LoginModel {
  constructor(username, password, frase) {
    this.username = username;
    this.password = password;
    this.frase = frase;
    
  }

ruta = 'https://tupacdemo.runasp.net/api/User/'

  //}
  //Validamos el valor de usuario y pass, si son correctos setemeamos el user en la variable "currentUser" del session storage, sino colocamos como "none"
    async validateCredentials(username, password) {
        
      const url = `${this.ruta}validate?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': '*/*'
          }
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); // Cambiar a .text() si el backend retorna string o boolean directo
        const login = sessionStorage.setItem('currentUser', username)
        return login;

      } catch (error) {
        console.error('Error en la petición:', error);
        const login = sessionStorage.setItem('currentUser', 'none');
        return login;
        
      }
  
  
    //Validamos el usuario DNI y cambiamos nueva pass para de recuperacion 
    }
    async recoveryPhrase(username,dni, frase) {
    
    const url = `${this.ruta}${encodeURIComponent(username)}/change-password`;
    
    try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({ 
            dni: dni,
            newPassword: frase
          })
           });        

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Al cargar nuevo password:', error);
        return false;
      }        
    
      const usersData = localStorage.getItem('users');
    this.users = usersData ? JSON.parse(usersData) : [];
    this.users.username === username? true : false;
    const confrimarFrase = this.users.frase !== frase ? false : true;
    return confrimarFrase;
  }
  



}