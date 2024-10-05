const express = require('express');
const bodyParser = require('body-parser');
const client = require('./index'); // Make sure whatsapp.js is in the same directory

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to send WhatsApp message
app.post('/send-message', async (req, res) => {
    try {
        // Log the request body for debugging
        console.log('Request body received:', req.body);

        // Extract 'message' and 'id' from the JSON body
        const { message, id } = req.body;

        // Validate whether 'message' and 'id' are present in the request body
        if (!message || !id) {
            return res.status(400).json({ status: 'error', message: 'ID dan pesan harus disertakan.' });
        }

        // Send WhatsApp message to a number or group
        if (id.includes('@c.us') || id.includes('@g.us')) {
            await client.sendMessage(id, message); // ID can be a phone number ('@c.us') or group ('@g.us')
            res.status(200).json({ status: 'success', message: 'Pesan berhasil dikirim!' });
        } else {
            res.status(400).json({ status: 'error', message: 'ID tidak valid. Pastikan menggunakan format yang benar.' });
        }
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ status: 'error', message: 'Gagal mengirim pesan', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
