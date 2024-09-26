const express = require('express');
const bodyParser = require('body-parser');
const client = require('./index'); // Pastikan whatsapp.js berada dalam direktori yang sama

const app = express();
const port = 3000;

// Middleware untuk menangkap raw body sebagai string
app.use(bodyParser.text({ type: '*/*' }));

// Fungsi untuk mengekstrak data dari string raw
function extractDataFromRaw(rawBody) {
    const data = {};
    // Ekstrak key-value pairs dengan tanda '='
    const regex = /(\w+)="([^"]*)"/g;
    let match;
    while ((match = regex.exec(rawBody)) !== null) {
        data[match[1]] = match[2];
    }
    // Ekstrak ID dan pesan dari data yang telah diparsing
    const idMatch = rawBody.match(/id="([^"]*)"/);
    if (idMatch) {
        data.id = idMatch[1];
    }
    const messageMatch = rawBody.match(/message="([^"]*)"/);
    if (messageMatch) {
        data.message = messageMatch[1];
    }
    return data;
}

// Endpoint untuk mengirim pesan WhatsApp
app.post('/send-message', async (req, res) => {
    try {
        // Tangkap raw body sebagai string
        let rawBody = req.body;
        console.log('Raw body received:', rawBody); // Log raw body untuk debugging

        // Ekstrak data dari raw body
        const extractedData = extractDataFromRaw(rawBody);
        console.log('Extracted data:', extractedData); // Log data yang telah diekstrak

        // Ambil 'message' dan 'id' dari data yang diekstrak
        const { message, id } = extractedData;

        // Validasi apakah 'message' dan 'id' ada dalam data
        if (!message || !id) {
            return res.status(400).json({ status: 'error', message: 'ID dan pesan harus disertakan.' });
        }

        // Kirim pesan WhatsApp ke nomor atau grup
        if (id.includes('@c.us') || id.includes('@g.us')) {
            await client.sendMessage(id, message); // ID bisa berupa nomor telepon (diikuti dengan '@c.us') atau grup (diikuti dengan '@g.us')
            res.status(200).json({ status: 'success', message: 'Pesan berhasil dikirim!' });
        } else {
            res.status(400).json({ status: 'error', message: 'ID tidak valid. Pastikan menggunakan format yang benar.' });
        }
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ status: 'error', message: 'Gagal mengirim pesan', details: error.message });
    }
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
