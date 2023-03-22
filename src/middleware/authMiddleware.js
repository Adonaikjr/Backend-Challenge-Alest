import { verify } from "jsonwebtoken";
import { authTokenJWT } from "../configs/jwt.js";

export function AuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error("Token JWT não informado", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user } = verify(token, authTokenJWT.jwt.secret);
    req.user = {
      id: String(user),
    };
    return next();
  } catch (error) {
    throw new Error("JWT invalido");
  }
}
