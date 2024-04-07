import mysql from "mysql";

// Informasi koneksi ke database MySQL
const connection = mysql.createConnection({
  host: "localhost", // ganti dengan nama host MySQL Anda jika perlu
  user: "username", // ganti dengan username MySQL Anda
  password: "password", // ganti dengan password MySQL Anda
  database: "patientsdb", // ganti dengan nama database yang telah Anda buat
});

// Membuat koneksi
connection.connect((err) => {
  if (err) {
    console.error("Koneksi gagal: " + err.stack);
    return;
  }

  console.log("Koneksi berhasil dengan ID " + connection.threadId);
});

// Menutup koneksi setelah selesai
connection.end();
