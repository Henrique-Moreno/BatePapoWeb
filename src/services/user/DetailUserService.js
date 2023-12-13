import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

class DetailUserService {
  constructor() {
    // Obtém o caminho do diretório do arquivo atual
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Define o caminho do arquivo JSON de usuários
    this.filePath = path.join(__dirname, '../data/users.json');
  }

  async execute(user_id) {
    try {
      // Lê os usuários existentes do arquivo JSON
      const existingUsers = await this.readFile();

      // Encontra o usuário com o user_id fornecido
      const user = existingUsers.find((u) => u.id === user_id);

      // Verifica se o usuário foi encontrado
      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      // Formata a data e hora atual
      const currentDateTime = new Date().toLocaleString();

      // Retorna os detalhes do usuário, incluindo a data e hora
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        // Adicione outros campos conforme necessário
        dateTime: currentDateTime,
      };
    } catch (error) {
      // Trata erros durante a busca dos detalhes do usuário
      console.error(`Erro ao buscar detalhes do usuário: ${error.message}`);
      throw new Error('Erro interno do servidor');
    }
  }

  // Função para ler o conteúdo do arquivo JSON
  async readFile() {
    try {
      // Lê o conteúdo do arquivo
      const content = await fs.readFile(this.filePath, 'utf-8');
      
      // Verifica se o conteúdo é uma string JSON válida
      return content.trim() === '' ? [] : JSON.parse(content);
    } catch (error) {
      // Trata erros de leitura do arquivo
      if (error.code === 'ENOENT') {
        // Se o arquivo não existe, retorna um array vazio
        return [];
      } else {
        // Loga o erro e lança uma exceção genérica em caso de erro desconhecido
        console.error(`Erro ao ler o arquivo: ${error.message}`);
        throw new Error('Erro interno do servidor');
      }
    }
  }
}

export { DetailUserService };


