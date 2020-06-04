import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);

app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);
app.use(json());

// ######### ROUTES ##############
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

// Catch requests to the unspecified routes
app.all("*", () => {
  throw new NotFoundError();
});

// Errors go here
app.use(errorHandler);

// ######### SERVER FIRE UP ##############
const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log("MongodDB connection error", err);
  }

  console.log("MongoDB connected");

  app.listen(3000, () => {
    console.log("Server is listening on PORT 3000!");
  });
};

start();
