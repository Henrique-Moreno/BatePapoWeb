import { ListUserService } from "../../services/user/ListUserService.js";

class ListUserController {
  async handle(req, res) {

    const listUserService = new ListUserService();

    const listUser = await listUserService.execute();

    return res.json(listUser);

  }
}

export { ListUserController }