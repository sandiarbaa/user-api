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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: object
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Get all user
    const users: UserType[] = await prisma.user.findMany();

    // Checking if data is empty
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
    res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error", error });
    return;
  }
};

// Get User by ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
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
 *                   example: User found
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@gmail.com"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: object
 */

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find user
    const findUser = await prisma.user.findUnique({ where: { id } });

    // Checking
    if (!findUser) {
      res.status(404).json({ statusCode: 404, message: "User not found" });
      return;
    }

    // Response
    res
      .status(200)
      .json({ statusCode: 200, message: "User found", data: findUser });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error", error });
  }
};

// Create User
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@gmail.com"
 *               age:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: object
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;

    // check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // Checking
    if (existingUser) {
      res.status(400).json({
        statusCode: 400,
        message: "Email already exists",
      });
      return;
    }

    // Create user if user dont exist
    const newUser: UserType | null = await prisma.user.create({
      data: { name, email, age },
    });

    // Responsse
    res.status(201).json({
      statusCode: 201,
      message: "User created successfully",
      data: newUser,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error", error });
    return;
  }
};

// Update User
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user's information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 example: "janedoe@gmail.com"
 *               age:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       200:
 *         description: User successfully updated
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
 *                   example: User successfully updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *                     name:
 *                       type: string
 *                       example: "Jane Doe"
 *                     email:
 *                       type: string
 *                       example: "janedoe@gmail.com"
 *                     age:
 *                       type: integer
 *                       example: 30
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: object
 */

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Find user
    const findUser = await prisma.user.findUnique({ where: { id } });

    // Checking if user don't exist
    if (!findUser) {
      res.status(404).json({ statusCode: 404, message: "User not found" });
      return;
    }

    // Update user
    const updatedUser: UserType | null = await prisma.user.update({
      where: { id },
      data: { name, email, age },
    });

    // Response
    res.status(200).json({
      statusCode: 200,
      message: "User successfully updated",
      data: updatedUser,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error", error });
    return;
  }
};

// Delete User
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: object
 */

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // find user first before deleted
    const user: UserType | null = await prisma.user.findUnique({
      where: { id },
    });

    // Checking if user don't exist
    if (!user) {
      res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
      return;
    }

    // Delete user
    await prisma.user.delete({ where: { id } });

    // Response
    res.status(200).json({
      statusCode: 200,
      message: `Delete User ${user.name} successfully`,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error", error });
    return;
  }
};
