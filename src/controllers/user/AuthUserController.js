import { AuthUserService } from "../../services/user/AuthUserService.js";

class AuthUserController {
  async handle(req, res) {
    try {
      const { email, password } = req.body;

      const authUserService = new AuthUserService();

      // Chama o método execute do serviço para autenticar o usuário
      const authToken = await authUserService.execute({
        email, password
      });

      // Se a autenticação for bem-sucedida, retorna o token em formato JSON
      return res.json({ token: authToken });
    } catch (error) {
      // Se ocorrer um erro durante a autenticação, retorna uma resposta de erro
      return res.status(401).json({ error: error.message });
    }
  }
}

export { AuthUserController };
