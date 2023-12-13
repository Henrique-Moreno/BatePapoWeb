import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CreateMessageService {
  constructor() {
    this.usersFilePath = path.join(__dirname, '../data/users.json');
    this.messagesFilePath = path.join(__dirname, '../data/messages.json');
  }

  async ensureFileExistence(filePath) {
    try {
      await fs.access(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(filePath, '[]', 'utf-8');
      } else {
        console.error(`Erro ao verificar a existência do arquivo: ${error.message}`);
        throw new Error('Erro interno do servidor');
      }
    }
  }

  async readFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return content.trim() === '' ? [] : JSON.parse(content);
    } catch (error) {
      console.error(`Erro ao ler o arquivo: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }

  async writeFile(filePath, content) {
    try {
      await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Erro ao escrever no arquivo: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }

  async execute({ userId, message }) {
    try {
      await this.ensureFileExistence(this.usersFilePath);
      await this.ensureFileExistence(this.messagesFilePath);

      const users = await this.readFile(this.usersFilePath);
      const user = users.find((u) => u.id === userId);

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      const userName = user.name;

      const messages = await this.readFile(this.messagesFilePath);
      const messageId = uuidv4();

      const newMessage = { messageId, userId, userName, content: message, timestamp: new Date() };

      await this.writeFile(this.messagesFilePath, [...messages, newMessage]);

      console.log('Mensagem criada com sucesso!');

      return newMessage;
    } catch (error) {
      console.error(`Erro ao criar mensagem: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }
}

export { CreateMessageService };





