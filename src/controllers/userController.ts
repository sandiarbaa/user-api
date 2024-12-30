import { Request, Response } from "express";
import prisma from "../config/prisma";
import { UserType } from "../types/userType";

// Get All User
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Success get all users
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "550e8400-e29b-41d4-a716-446655440000"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "johndoe@gmail.com"
 *                       age:
 *                         type: integer
 *                         example: 25
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Get all user
    const users: UserType[] = await prisma.user.findMany();

    if (users.length === 0) {
      res.status(200).json({
        statusCode: 200,
        message: "Request success, but data still empty.",
        data: users,
      });
      return;
    }

    // Response success
    res
      .status(200)
      .json({ statusCode: 200, message: "Success get all users", data: users });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};