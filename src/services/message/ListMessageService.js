import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ListMessageService {
  constructor() {
    this.messagesFilePath = path.join(__dirname, '../data/messages.json');
    this.usersFilePath = path.join(__dirname, '../data/users.json');
  }

  async readFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return content.trim() === '' ? [] : JSON.parse(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      } else {
        console.error(`Erro ao ler o arquivo: ${error.message}`);
        throw new Error('Erro interno do servidor');
      }
    }
  }

  async execute() {
    try {
      const messages = await this.readFile(this.messagesFilePath);
      const users = await this.readFile(this.usersFilePath);

      const messageList = messages.map((message) => {
        const user = users.find((u) => u.id === message.userId);
        return user
          ? {
              id: message.messageId,
              user: { id: user.id, name: user.name },
              content: message.content,
              timestamp: message.timestamp,
            }
          : null;
      });

      const filteredMessages = messageList.filter((message) => message !== null);

      console.log('Mensagens listadas com sucesso!');

      return filteredMessages;
    } catch (error) {
      console.error(`Erro ao listar mensagens: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }
}

export { ListMessageService };
