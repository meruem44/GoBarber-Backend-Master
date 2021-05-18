import { getRepository } from "typeorm";
import { join } from "path";
import fs from "fs";
import { User } from "../model/User";

import { uploadConfig } from "../config/upload";
import { AppError } from "../errors/AppError";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      {
        throw new AppError("Only Authenticate users can change avatar", 401);
      }
    }

    if (user.avatar) {
      const { directory } = uploadConfig;

      const userAvatarFilePath = join(directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      console.log(userAvatarFileExist);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };
