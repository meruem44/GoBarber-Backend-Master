import { Router } from "express";
import multer from "multer";
import { uploadConfig } from "../config/upload";

import { CreateUserService } from "../services/CreateUserService";
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";

import { ensureauthenticate } from "../middlewares/Ensureauthenticate";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    password,
    email,
  });

  return response.json(user);
});

usersRouter.patch(
  "/avatar",
  ensureauthenticate,
  upload.single("avatar"),
  async (request, response) => {
    console.log(request.file);
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.originalname,
    });

    return response.json(user);
  }
);

export { usersRouter };
