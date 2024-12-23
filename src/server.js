const express = require('express');
const bodyParser = require('body-parser');
const client = require('./index'); // Pastikan index.js berada dalam direktori yang sama

const app = express();
const port = 3000;

// Middleware untuk memproses data JSON
app.use(bodyParser.json());

// Middleware untuk memproses data x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint untuk mengirim pesan WhatsApp
app.post('/send-message', async (req, res) => {
    const { message, id } = req.body; // Data tetap diakses dari req.body

    try {
        // Kirim pesan WhatsApp ke nomor atau grup
        if (id.includes('@c.us') || id.includes('@g.us')) {
            await client.sendMessage(id, message); // ID bisa berupa nomor telepon (diikuti dengan '@c.us') atau grup (diikuti dengan '@g.us')
            res.status(200).json({ status: 'success', message: 'Pesan berhasil dikirim!' });
        } else {
            res.status(400).json({ status: 'error', message: 'ID tidak valid. Pastikan menggunakan format yang benar.' });
        }
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ status: 'error', message: 'Gagal mengirim pesan' });
    }
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
