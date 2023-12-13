import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RegisterUserService {
  constructor() {
    this.filePath = path.join(__dirname, '../data/users.json');
    this.ensureFileExistence();
  }

  async ensureFileExistence() {
    try {
      await fs.access(this.filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(this.filePath, '[]', 'utf-8');
      } else {
        console.error(`Erro ao verificar a existência do arquivo: ${error.message}`);
        throw new Error('Erro interno do servidor');
      }
    }
  }

  async readFile() {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      return content.trim() === '' ? [] : JSON.parse(content);
    } catch (error) {
      console.error(`Erro ao ler o arquivo: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }

  async writeFile(content) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(content, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Erro ao escrever no arquivo: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }

  async execute({ name, birthdate, nickname, password }) {
    try {
      if (!name || !birthdate || !nickname || !password) {
        throw new Error('Campos obrigatórios não foram fornecidos.');
      }

      const existingUsers = await this.readFile();
      const userExists = existingUsers.some((user) => user.name === name || user.nickname === nickname);

      if (userExists) {
        throw new Error('Usuário ou apelido já existem.');
      }

      const id = uuidv4();
      const passwordHash = await hash(password, 8);

      const newUser = { id, name, birthdate, nickname, passwordHash };

      await this.writeFile([...existingUsers, newUser]);

      console.log('Usuário cadastrado com sucesso!');

      return newUser;
    } catch (error) {
      console.error(`Erro ao cadastrar usuário: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }
}

export { RegisterUserService };

