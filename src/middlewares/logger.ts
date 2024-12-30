import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

// Tentukan lokasi file log
const logFilePath = path.join(__dirname, "../access.log");

// Pastikan file log ada, jika tidak buat file baru
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, "", { flag: "w" });
}

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFileSync(logFilePath, log);
  next();
};
