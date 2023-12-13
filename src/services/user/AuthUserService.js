// import fs from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { compare } from 'bcrypt';
// import jwt from 'jsonwebtoken';

// // Obtém o caminho do arquivo atual
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// class AuthUserService {
//   constructor() {
//     // Define o caminho do arquivo JSON de usuários
//     this.filePath = path.join(__dirname, '../data/users.json');
//   }

//   // Função para ler o conteúdo do arquivo JSON
//   async readFile() {
//     try {
//       // Lê o conteúdo do arquivo
//       const content = await fs.readFile(this.filePath, 'utf-8');
      
//       // Verifica se o conteúdo é uma string JSON válida
//       return content.trim() === '' ? [] : JSON.parse(content);
//     } catch (error) {
//       // Trata erros de leitura do arquivo
//       if (error.code === 'ENOENT') {
//         // Se o arquivo não existe, retorna um array vazio
//         return [];
//       } else {
//         // Loga o erro e lança uma exceção genérica em caso de erro desconhecido
//         console.error(`Erro ao ler o arquivo: ${error.message}`);
//         throw new Error('Erro interno do servidor');
//       }
//     }
//   }

//   // Função principal para autenticar o usuário
//   async execute({ email, password }) {
//     try {
//       // Lê os usuários existentes do arquivo JSON
//       const existingUsers = await this.readFile();

//       // Encontra o usuário com o email fornecido
//       const user = existingUsers.find((u) => u.email === email);

//       // Verifica se o usuário foi encontrado
//       if (!user) {
//         throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
//       }

//       // Compara a senha fornecida com a senha criptografada no arquivo
//       const passwordMatch = await compare(password, user.passwordHash);

//       // Verifica se a senha é válida
//       if (!passwordMatch) {
//         throw new Error('Senha incorreta :(');
//       }

//       // Gera um token JWT para o usuário autenticado
//       const token = jwt.sign(
//         {
//           name: user.name,
//           email: user.email,
//         },
//         'batepapoweb',
//         { expiresIn: '1h' }
//       );

//       // Retorna os dados do usuário autenticado e o token gerado
//       return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         token,
//       };
//     } catch (error) {
//       // Trata erros durante a autenticação
//       console.error(`Erro ao autenticar usuário: ${error.message}`);
//       throw new Error('Erro interno do servidor');
//     }
//   }
// }

// export { AuthUserService };

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AuthUserService {
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

  async execute({ email, password }) {
    try {
      const existingUsers = await this.readFile();
      const user = existingUsers.find((u) => u.email === email);

      if (!user) {
        throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
      }

      const passwordMatch = await compare(password, user.passwordHash);

      if (!passwordMatch) {
        throw new Error('Senha incorreta :(');
      }

      const token = jwt.sign(
        {
          id: user.id, // Incluímos o ID no token
          name: user.name,
          email: user.email,
        },
        'batepapoweb',
        { expiresIn: '1h' } // Definimos o tempo de expiração do token
      );

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      };
    } catch (error) {
      console.error(`Erro ao autenticar usuário: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }
}

export { AuthUserService };



















