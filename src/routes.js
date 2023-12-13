import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";
import { DetailUserController } from "./controllers/user/DetailUserController.js";

import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import { ListUserController } from "./controllers/user/ListUserController.js";
import { CreateMessageController } from "./controllers/message/CreateMessageController.js";
import { ListMessageController } from "./controllers/message/ListMessageController.js";
import { RegisterUserController } from "./controllers/registerUser/RegisterUserController.js";

const router = Router();

// User

router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailUserController().handle);
router.get("/users", isAuthenticated, new ListUserController().handle);

// Message

router.post("/message", isAuthenticated, new CreateMessageController().handle)
router.get("/message", isAuthenticated, new ListMessageController().handle)

// Register User

router.post("/register", isAuthenticated, new RegisterUserController().handle);

export { router };