# User API

This is a simple User API built using Express, Prisma, and Swagger for documentation. The API allows the creation and management of users with features such as checking for existing emails, creating new users, and viewing API documentation through Swagger.

## Prerequisites

Make sure you have the following installed:

- Node.js (v16 or later)
- PostgreSQL
- Prisma

## Setup and Installation

### 1. Clone the repository:

```bash
git clone https://github.com/sandiarbaa/user-api.git
cd user-api

npm install

DATABASE_URL="postgresql://postgres:admin@localhost:5432/user-api"
NODE_ENV=development

npx prisma migrate dev

npm run dev

http://localhost:3000/user-api

npm run test

{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "age": 25
}


### Penjelasan tentang bagian-bagian dalam README ini:

1. **Prasyarat**: Memberitahukan pembaca untuk memastikan bahwa mereka telah menginstal Node.js, PostgreSQL, dan Prisma.
2. **Setup dan Instalasi**: Panduan langkah demi langkah untuk menginstal dependensi, mengonfigurasi variabel lingkungan, dan menjalankan aplikasi.
3. **Swagger Documentation**: Memberikan akses ke dokumentasi API yang dibuat otomatis menggunakan Swagger.
4. **API Endpoints**: Menyediakan informasi tentang endpoint yang tersedia, cara mengirim permintaan, dan respons yang diharapkan.
5. **Pengembangan**: Menyebutkan penggunaan TypeScript, Prisma, dan Nodemon di dalam proyek.
6. **Lisensi**: Menyertakan bagian lisensi untuk menyatakan bahwa proyek ini menggunakan lisensi MIT.

Silakan sesuaikan dengan detil tambahan terkait proyek Anda, seperti pengaturan konfigurasi lain atau fitur tambahan yang Anda tambahkan.


