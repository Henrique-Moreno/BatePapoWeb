// No arquivo ListUserService.js

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ListUserService {
  constructor() {
    this.filePath = path.join(__dirname, '../data/users.json');
  }

  async readFile() {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
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
      const users = await this.readFile();
      const userList = users.map(({ id, name }) => ({ id, name }));
      return userList;
    } catch (error) {
      console.error(`Erro ao listar usuários: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }
}

export { ListUserService };
