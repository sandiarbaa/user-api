import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
app.use(express.json());

// Setup Swagger
setupSwagger(app);

// Routes
app.use("/", userRoutes);

export default app; // Tambahkan ini untuk ekspor default

const PORT = process.env.PORT || 3000;

// jika sedang testing tidak akan dijalankan, syarat ubah variabel NODE_ENV
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`Server running on port http://localhost:${PORT}`)
  );
}
