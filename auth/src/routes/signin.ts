import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Enter the correct password"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    //**************************BODY OF THE ROUTE **************************** */
    // 1. Validate req data (done in middleware inside arguments list)

    // 2. check if email in the DB

    // 3. check provided email
    // 4. create jwt
    // 5. send jwt

    res.status(200).send({});
  }
);

export { router as signinRouter };
