export class User {
    // La clase User representa un usuario con sus atributos y métodos para agregar, modificar, eliminar y listar usuarios. La clase User se encarga de manejar la lógica de negocio relacionada con los usuarios, como generar un ID único para cada usuario, almacenar los usuarios en la DB y recuperar los usuarios de la DB. 
    constructor(id, username, nombre, apellido, dni, id_rol) {
        this.id_user = id;
        this.username = username;
        this.nombre_user = nombre;
        this.apellido_user = apellido;
        this.dni_user = dni;
        this.contraseña_user = dni;
        this.id_rol = id_rol;
    }
    //Ruta base de la API para las operaciones de usuarios
    ruta = 'https://tupacdemo.runasp.net/api/User/'


    // EEl método se encarga de agregar un nuevo user en la DB a traves de la API.
    async add(user) {
        
        const url = this.ruta;
           
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_user: 1,
                    username: user.username,
                    nombre_user: user.nombre_user,
                    apellido_user: user.apellido_user,
                    dni_user: user.dni_user,
                    pass_user: user.dni_user,
                    id_rol: user.id_rol
                })
            });       
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
        console.error('Error en la petición:', error);        
        return 'Error al cargar el usuario, vuelva a intentarlo más tarde';
        }

    }    

  
    // El método modificar se encarga de modificar un producto existente en el la DB. El método eliminar se encarga de eliminar un producto de la DB. El método listar se encarga de recuperar todos los productos de la DB y devolverlos como un array. El método generarID se encarga de generar un ID único para cada producto basado en el ID más alto existente en el localStorage.
    async modificar(user) {
        
        const url = `${this.ruta}${user.id_user}`;
           
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_user: user.id_user,
                    username: user.username,
                    nombre_user: user.nombre_user,
                    apellido_user: user.apellido_user,
                    dni_user: user.dni_user,
                    pass_user: user.dni_user,
                    id_rol: user.id_rol
                })
                })
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
        console.error('Error en la petición:', error);        
        return 'Error al modificar el usuario, vuelva a intentarlo más tarde';
        }
                
    }
    // El método eliminar se encarga de eliminar un producto de la DB. El método listar se encarga de recuperar todos los productos de la DB y devolverlos como un array. El método generarID se encarga de generar un ID único para cada producto basado en el ID más alto existente en el localStorage.
    async eliminar(id) {
        const url = `${this.ruta}${id}`;
        try {
            const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: '*/*'
            }
            })
            const data = await response.json();
            if (response.ok || response.status === 204) {
                return data;
            } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);}
            
        } catch (error) {
        console.error('Error en la petición:', error);        
        return 'Error al intentar eliminar el usuario, vuelva a intentarlo más tarde';
        }
    }
    // El método listar se encarga de recuperar todos los productos de la DB y devolverlos como un array. El método generarID se encarga de generar un ID único para cada producto basado en el ID más alto existente en la DB.
    async listar() {
        
        const url = this.ruta;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: '*/*'
                }
            })
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en la petición:', error);
            return 'Error al listar los usuarios, vuelva a intentarlo más tarde';
        }
    }
    
    
}