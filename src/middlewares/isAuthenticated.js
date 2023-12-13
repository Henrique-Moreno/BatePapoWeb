import jwt from "jsonwebtoken";

export async function isAuthenticated(req, res, next) {
  // Recebe o token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    //Validar esse token
    const { id } = jwt.verify(
      token,
      'batepapoweb'
    );

     // Armazena o ID do usuário em req.user_id
     req.user_id = id;
    

    // Continue com a execução do próximo middleware ou rota
    next();
  } catch (err) {
    return res.status(401).end();
  }
}
