1. Tambahkan file .ENV terlebih dahulu untuk menyambungkan dengan database dengan isi "DATABASE_URL="postgresql://postgres:admin@localhost:5432/EchoLearn?schema=public"". rubah postgres dengan nama username database dan admin dengan password database.
2. Selanjutnya jalankan perintah "npm run build" pada terminal apabila folder dist tidak ada.
3. jalankan perintah "npm run start" untuk menjalankan servernya.
4. selanjutnya masukkan dummy data untuk song dan variant dengan format JSON menggunakan thunder client atau postman. Untuk data JSON nya dapat dilihat pada link https://docs.google.com/document/d/1zrOwZ9hcoiu8JOdBeAScGot9GsQpxnY3hrGZQXbNCUs/edit?usp=sharing
5. Setelah data berhasil dimasukkan API dapat digunakan.
