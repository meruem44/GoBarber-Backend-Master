import { Router } from "express";

import { AuthenticateUserService } from "../services/AuthenticateUserService";

const sessiosRouter = Router();

sessiosRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    password,
    email,
  });

  return response.json({ user, token });
});

export { sessiosRouter };
