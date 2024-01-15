import {messageDAO} from '../dao/index.js';

class MessageController {
  constructor() {
    this.messageManagerDAO = new messageDAO();
  }

  async addMessage(message) {
    try {
      await this.messageManagerDAO.addMessage(message);
      return true; // O cualquier otra información que quieras devolver
    } catch (error) {
      console.error('Error en MessageController.addMessage:', error);
      throw error;
    }
  }

  async getMessages() {
    try {
      const messages = await this.messageManagerDAO.getMessage();
      return messages;
    } catch (error) {
      console.error('Error en MessageController.getMessages:', error);
      throw error;
    }
  }
}

export default MessageController;