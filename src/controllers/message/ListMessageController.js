import { ListMessageService } from '../../services/message/ListMessageService.js';

class ListMessageController {
  async handle(req, res) {
    try {
      const listMessageService = new ListMessageService();
      const listMessage = await listMessageService.execute();
      return res.json(listMessage);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { ListMessageController };
