# WhatsApp API dengan Docker Compose

## Deskripsi
Repositori ini menyediakan konfigurasi Docker Compose untuk menjalankan WhatsApp API menggunakan **whatsapp-web.js**. Dengan menggunakan Docker, kamu dapat dengan mudah mengatur lingkungan yang konsisten dan memudahkan pengelolaan dependensi.

## Fitur
- Pengaturan cepat menggunakan Docker Compose.
- Isolasi lingkungan aplikasi.
- Kemudahan dalam mengelola layanan yang terkait.

## Prerequisites
Pastikan kamu sudah menginstal [Docker](https://www.docker.com/get-started) dan [Docker Compose](https://docs.docker.com/compose/) di sistem kamu.

## Instalasi
1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/fahreziisnaen/Whatsapp-API.git
   cd Whatsapp-API

2. **Jalankan Docker Compose:**
   ```bash
   docker-compose up

3. **Scan QRCode:**
  Buka Whatsapp pada Device > Masuk ke Setting > Linked Devices > Pilih Link device.
  Scan QRCode yang muncul pada Docker Console.

5. **Scan QRCode:**
  Setelah QRCode berhasil di scan, CTRL+Z untuk keluar.

## Penggunaan API

Setelah kontainer berjalan dan pemindaian QR code berhasil, kamu dapat mengakses API untuk melakukan berbagai fungsi. 
Berikut adalah beberapa contoh penggunaan API.


### Mengirim Pesan
Untuk mengirim pesan, kamu dapat menggunakan endpoint `/send-message`. Berikut adalah contoh menggunakan `curl`:

1. **Personal:**
   ```bash
   curl -X POST http://localhost:3000/send-message \
   -H "Content-Type: application/json" \
   -d '{"message": "Hello Contact!","id": "1234567890@c.us"}'

2. **Group:**
   ```bash
   curl -X POST http://localhost:3000/send-message \
   -H "Content-Type: application/json" \
   -d '{"message": "Hello Group!","id": "1234567890-1234567890@g.us"}'

### Mendapatkan id Group
Untuk mengirim pesan, kamu dapat menggunakan endpoint `/send-message`. Berikut adalah contoh menggunakan `curl`:



![fahrezi](https://github.com/user-attachments/assets/11467d42-0600-4aed-8ab0-f6a9657c38f3)

