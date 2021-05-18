import { getRepository } from "typeorm";
import { User } from "../model/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";

import { AppError } from "../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const { jwt } = authConfig;

    const token = sign({}, jwt.secret, {
      expiresIn: jwt.expiresIn,
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
