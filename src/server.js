import express from "express";
import "express-async-error";
import session from "express-session";
import cors from "cors";
import { router } from "./routes.js";

const app = express();
const PORT = 3333;

app.use(express.json());

// Configuração do CORS para permitir acesso de qualquer lugar
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(router);

// Sessão
app.use(session({
  secret: "batepapoweb",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
}));

app.use((req, res, next) => {
  console.log("Middleware de sessão:", req.session);
  next();
});

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }

  return res.status(500).json({
    status: "erro",
    message: "erro no servidor"
  });
});

app.listen(PORT, () => {
  console.log("Servidor online!");
});
