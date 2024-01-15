import {messageModel} from '../models/index.js';


class messageDAO {
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

    getMessage = function () {
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


export default messageDAO;

