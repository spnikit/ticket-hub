import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";

const app = express();
app.use(json());

// ######### ROUTES ##############
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

// ######### SERVER FIRE UP ##############
app.listen(3000, () => {
  console.log("Server is listening on PORT 3000!");
});
