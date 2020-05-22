import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

// ######### ROUTES ##############
app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there!");
});

// ######### SERVER FIRE UP ##############
app.listen(3000, () => {
  console.log("Server is listening on PORT 3000!");
});
