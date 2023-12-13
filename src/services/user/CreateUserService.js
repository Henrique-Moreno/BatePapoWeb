

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CreateUserService {
  constructor() {
    this.filePath = path.join(__dirname, '../data/users.json');
    this.ensureDirectoryExistence(this.filePath);
  }

  ensureDirectoryExistence(filePath) {
    // Verifica se o diretório existe e cria se não existir
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  readFile() {
    try {
      // Lê o conteúdo do arquivo JSON
      const content = fs.readFileSync(this.filePath, 'utf-8');
      return content.trim() === '' ? [] : JSON.parse(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Se o arquivo não existir, retorna um array vazio
        return [];
      } else {
        console.error(`Erro ao ler o arquivo: ${error.message}`);
        throw new Error('Erro interno do servidor');
      }
    }
  }

  writeFile(content) {
    try {
      // Lê os usuários existentes
      const existingUsers = this.readFile();
      // Mescla os novos usuários com os existentes
      const updatedUsers = [...existingUsers, ...content];
      // Converte a lista mesclada de usuários para uma string JSON formatada
      const updateFile = JSON.stringify(updatedUsers, null, 2);
      // Escreve a string JSON de volta no arquivo
      fs.writeFileSync(this.filePath, updateFile, 'utf-8');
      console.log('Arquivo atualizado com sucesso!');
    } catch (error) {
      console.error(`Erro ao escrever no arquivo: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }

  async execute({ name, email, password }) {
    try {
      if (!name || !email || !password) {
        throw new Error('Campos obrigatórios não foram fornecidos.');
      }

      // Lê os usuários existentes
      const existingUsers = this.readFile();

      // Verifica se o usuário ou o e-mail já existem
      const userExists = existingUsers.some((user) => user.name === name);
      const emailExists = existingUsers.some((user) => user.email === email);

      if (userExists || emailExists) {
        throw new Error('Usuário ou e-mail já existem.');
      }

      // Gera um novo id único
      const id = uuidv4();
      // Criptografa a senha
      const passwordHash = await hash(password, 8);

      // Cria um novo usuário
      const newUser = { id, name, email, passwordHash };

      // Escreve o novo usuário no arquivo JSON existente
      this.writeFile([newUser]);

      return newUser;
    } catch (error) {
      console.error(`Erro ao criar usuário: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }
}

export { CreateUserService };



















