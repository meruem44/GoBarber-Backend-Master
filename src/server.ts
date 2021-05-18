import "reflect-metadata";

import app from "./app";
import { handleError } from "./middlewares/HandleError";

app.use(handleError);

app.listen(process.env.PORT || 3333, () => {
  console.log("Server is Running");
});
