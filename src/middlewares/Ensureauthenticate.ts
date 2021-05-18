import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import { AppError } from "../errors/AppError";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureauthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT is missing", 401);
  }

  const [_, token] = authHeader.split(" ");

  const { jwt } = authConfig;

  try {
    const decoded = verify(token, jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT Token", 401);
  }
}

export { ensureauthenticate };
