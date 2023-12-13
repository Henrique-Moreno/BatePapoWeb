import { RegisterUserService } from "../../services/registerUser/RegisterUserService .js";

class RegisterUserController {
  async handle(req, res) {
    try {
      const { name, birthdate, nickname, password } = req.body;

      const registerUserService = new RegisterUserService();
      const newUser = await registerUserService.execute({ name, birthdate, nickname, password });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error(`Erro no cadastro de usuário: ${error.message}`);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { RegisterUserController };

