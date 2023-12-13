import { CreateUserService } from "../../services/user/CreateUserService.js";

class CreateUserController {
  async handle(req, res) {
    // Obtém os dados da requisição
    const { id, name, email, password } = req.body;

    // Instancia o serviço responsável por criar usuários
    const createUserService = new CreateUserService();

    try {
      // Chama o método execute do serviço para criar um novo usuário
      const user = await createUserService.execute({ id, name, email, password });

      // Retorna a resposta da criação do usuário em formato JSON
      return res.json(user);
    } catch (error) {
      // Se ocorrer um erro durante a criação do usuário, retorna uma resposta de erro
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController };



