import { messageModel } from '../Dao/MongoDB/models/message.model.js';


class MessageManagerDB {
    constructor() {
        this.author = "";
        this.message = "";
    }

    addMessage = function (message) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await messageModel.create(message);
                console.log('Message insertado:', message);
                resolve(result);

            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    }

    getProducts = function () {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await messageModel.find();
                this.lista = result; // actualizo lista con la Base de datos
                resolve(this.lista);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };
}


export default MessageManagerDB;

/*
const lm = new MessageManagerDB;


const nuevoMensaje = {
    author: 'Fancisco',
    message: 'Cuarto mensaje de Chat',
    };

lm.addMessage(nuevoMensaje)
    .then((mensajeInsertado) => {
        // Hacer algo con el producto insertado, si es necesario
    })
    .catch((error) => {
        // Manejar el error, si es necesario
    });
*/
