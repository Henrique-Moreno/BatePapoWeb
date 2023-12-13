import { CreateMessageService } from '../../services/message/CreateMessageService.js';

class CreateMessageController {
  async handle(req, res) {
    try {
      const { userId, message } = req.body;

      const createMessageService = new CreateMessageService();

      const newMessage = await createMessageService.execute({ userId, message });

      return res.status(201).json(newMessage);
    } catch (error) {
      console.error(`Erro ao criar mensagem: ${error.message}`);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { CreateMessageController };


