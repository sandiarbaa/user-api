import { Request, Response, NextFunction } from "express";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    res
      .status(400)
      .json({ statusCode: 400, message: "Name, email, and age are required" });
    return;
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof age !== "number" ||
    age <= 0
  ) {
    res.status(400).json({
      statusCode: 400,
      message: "Name, email, or age must be filled in the correct format",
    });
    return;
  }

  next();
};
