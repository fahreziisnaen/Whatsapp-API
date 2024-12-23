const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    webVersionCache: {
        type: "remote",
        remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('WhatsApp Web client is ready!');

    try {
        const chats = await client.getChats();
        console.log(`Total chats fetched: ${chats.length}`);
        const groups = chats.filter(chat => chat.isGroup);

        if (groups.length === 0) {
            console.log('No groups found.');
        } else {
            console.log('Group IDs:');
            groups.forEach(group => {
                console.log(`Name: ${group.name}, ID: ${group.id._serialized}`);
            });
        }
    } catch (error) {
        console.error('Error getting groups:', error);
    } finally {
        client.destroy(); // Optional: Close the client after fetching group IDs
    }
});

client.on('error', (error) => {
    console.error('Error:', error);
});

client.initialize();

module.exports = client;
