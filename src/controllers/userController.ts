import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  res.send("Get all users");
};
