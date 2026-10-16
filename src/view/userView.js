import { UserController } from '../controller/userController.js';
// La vista se encarga de mostrar los datos al usuario y de interactuar con el usuario a través de eventos. La vista no debe contener lógica de negocio, solo debe mostrar los datos que le proporciona el controlador y enviar las acciones del usuario al controlador.
export class UserView {
   // El constructor recibe una instancia del controlador para poder interactuar con él y obtener los datos necesarios para mostrar al usuario.    
    constructor(controller) {
        this.UserController = controller;   
    };
    // El método render se encarga de mostrar los datos al usuario. En este caso, muestra una tabla con los productos. El método render se llama cada vez que se agrega, modifica o elimina un producto para actualizar la vista con los datos actuales.
    async render() {
        const users = await this.UserController.listarUsers();
        const nRol = users.map(user => user.id_rol == 1 ? user.Rol='Administrador' : user.id_rol == 2 ? user.Rol='Supervisor' : user.Rol='Usuario');
        const tableBody = document.getElementById('tabla-usuarios');
        tableBody.innerHTML='';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id_user}</td>
                <td>${user.username}</td>
                <td>${user.nombre_user}</td>
                <td>${user.apellido_user}</td>
                <td>${user.dni_user}</td>                
                <td>${user.Rol}</td>
                <td>
                    <button class="btn-modif" data-id="${user.id_user}">Modificar</button>    
                </td>
                <td>
                   <button class="btn-elim" data-id="${user.id_user}">Eliminar</button>
                </td>
            `;
            const pass = user.pass_user;
            const userRol = user.id_rol;
            tableBody.appendChild(row);
           
        });
        // Agregar event listeners a los botones de modificar y eliminar
        const modificarButtons = document.querySelectorAll('.btn-modif');
        const eliminarButtons = document.querySelectorAll('.btn-elim');
        
            modificarButtons.onclick = async (event) => {
                event.preventDefault();
                const id = parseInt(event.target.getAttribute('data-id'));
                await this.modificarUser(id);
            };
        
            eliminarButtons.onclick = async (event) => {
                event.preventDefault();
                const id = parseInt(event.target.getAttribute('data-id'));
               await this.eliminarUser(id);
            };
    }
    // El método modificarUser se encarga de mostrar un formulario con los datos del usuario a modificar y de enviar los datos modificados al controlador para que actualice el usuario. El método eliminarUser se encarga de enviar la acción de eliminar al controlador para que elimine el usuario.
    async modificarUser(id) {
        const users = await this.UserController.listarUsers();
        const user = users.find(user => user.id_user === id);
        if (user) {
            const nRol = user.id_rol == 1 ? 'Administrador' : user.id_rol == 2 ? 'Supervisor' : 'Usuario';
            document.getElementById('musername').value = user.username;
            document.getElementById('nnombre').value = user.nombre_user;
            document.getElementById('napellido').value = user.apellido_user;
            document.getElementById('nDNI').value = user.dni_user;
            document.getElementById('nrol').value = nRol;
            document.querySelector('dialog').showModal();
            const modificarForm = document.querySelector('dialog form');
            const cancelarBtn = document.getElementById('cancelar');
            
            modificarForm.onsubmit = (event) => {
                event.preventDefault();
                const username = document.getElementById('musername').value;
                const nombre = document.getElementById('nnombre').value;               ;
                const apellido = document.getElementById('napellido').value;
                const dni = document.getElementById('nDNI').value;
                const rol = document.getElementById('nrol').value;
                this.UserController.modificarUser(id, username, nombre, apellido, dni, rol);
                this.render();
                document.querySelector('dialog').close();
            };
            
            cancelarBtn.onclick = () => {
                document.querySelector('dialog').close();
            };
        }
    }

    // El método eliminarUser se encarga de enviar la acción de eliminar al controlador para que elimine el usuario. Luego, llama al método render para actualizar la vista con los datos actuales.
    async eliminarUser(id) {
        await this.UserController.eliminarUser(id);
        this.render(); 
    }


    }