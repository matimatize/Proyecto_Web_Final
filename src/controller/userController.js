import { User } from "../model/userModel.js";

export class UserController {
    // El controlador se encarga de manejar la lógica de negocio relacionada con los usuarios, como agregar, modificar, eliminar y listar usuarios. El controlador se comunica con el modelo para realizar las operaciones necesarias y con la vista para mostrar los datos al usuario. El controlador no debe contener lógica de presentación, solo debe manejar la lógica de negocio y enviar los datos a la vista para que los muestre al usuario.
    constructor() {
        this.userModel = new User();
    }
    // El método addUser se encarga de agregar un nuevo usuario al modelo. El método modificarUser se encarga de modificar un usuario existente en el modelo. El método eliminarUser se encarga de eliminar un usuario del modelo. El método listarUsers se encarga de recuperar todos los usuarios del modelo y devolverlos como un array.
    async addUser(username, nombre, apellido, dni, id_rol) {
        const id = 1;
        const user = new User(id, username, nombre, apellido, dni, id_rol);
        await this.userModel.add(user);
    }
    // El método modificarUser se encarga de modificar un usuario existente en el modelo. El método eliminarUser se encarga de eliminar un usuario del modelo. El método listarUsers se encarga de recuperar todos los usuarios del modelo y devolverlos como un array.
    async modificarUser(id, username, nombre, apellido, dni, id_rol) {
        const user = new User(id, username, nombre, apellido, dni, id_rol);
        await this.userModel.modificar(user);
    }
    // El método eliminarUser se encarga de eliminar un usuario del modelo. El método listarUsers se encarga de recuperar todos los usuarios del modelo y devolverlos como un array.
    async eliminarUser(id) {
        
        await this.userModel.eliminar(id);
    }
    // El método listarUsers se encarga de recuperar todos los usuarios del modelo y devolverlos como un array.
    async listarUsers() {
        return await this.userModel.listar();
    }
}