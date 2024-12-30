import request from "supertest";
import app from "../src/app";
import prisma from "../src/config/prisma";

// Membersihkan database sebelum setiap tes
beforeEach(async () => {
  await prisma.user.deleteMany();
});

// Menutup koneksi Prisma setelah semua tes selesai
afterAll(async () => {
  await prisma.$disconnect();
});

describe("User API Tests", () => {
  it("should get all users", async () => {
    const res = await request(app).get("/users"); // Sesuaikan endpoint
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array); // Pastikan hasil adalah array
    expect(res.body.data.length).toBeGreaterThanOrEqual(0); // Data minimal 0
  });

  it("should create a user", async () => {
    const res = await request(app).post("/users").send({
      name: "Mona",
      email: "mona@gmail.com",
      age: 20,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toMatchObject({ name: "Mona" });
    expect(res.body.data.email).toBe("mona@gmail.com");
    expect(res.body.data.age).toBe(20);
  }, 20000); // Timeout 20 detik

  it("should get a user by ID", async () => {
    // Membuat pengguna terlebih dahulu
    const createRes = await request(app).post("/users").send({
      name: "Ridho Febrian",
      email: "ridhofebrian@gmail.com",
      age: 25,
    });

    const userId = createRes.body.data.id; // Ambil ID pengguna yang baru dibuat

    const res = await request(app).get(`/users/${userId}`); // Mengambil user berdasarkan ID
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(userId);
    expect(res.body.data.name).toBe("Ridho Febrian");
    expect(res.body.data.email).toBe("ridhofebrian@gmail.com");
    expect(res.body.data.age).toBe(25);
  }, 20000);

  it("should update a user", async () => {
    const createRes = await request(app).post("/users").send({
      name: "Ridho",
      email: "ridho@gmail.com",
      age: 28,
    });

    const userId = createRes.body.data.id; // Ambil ID pengguna yang baru dibuat

    const res = await request(app).put(`/users/${userId}`).send({
      name: "Ridho Febrian",
      email: "ridhofebrian@gmail.com",
      age: 29,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Ridho Febrian");
    expect(res.body.data.email).toBe("ridhofebrian@gmail.com");
    expect(res.body.data.age).toBe(29);
  }, 20000);

  it("should delete a user", async () => {
    const createRes = await request(app).post("/users").send({
      name: "Bayu",
      email: "Bayu@gmail.com",
      age: 30,
    });

    const userId = createRes.body.data.id;

    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(`Delete User Bayu successfully`);

    const findRes = await request(app).get(`/users/${userId}`);
    expect(findRes.statusCode).toBe(404);
    expect(findRes.body.message).toBe("User not found");
  }, 20000);
});
