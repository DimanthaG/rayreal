const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../credentials.json'), // Path to your credentials.json
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

async function uploadFile(filePath, fileName) {
    try {
        const fileMetadata = {
            name: fileName,
            parents: ['1KyOoOcmMrXBL9Yzoy49dgcAaAD0z8gfA'], // Replace with your Google Drive folder ID
        };

        const media = {
            mimeType: 'image/png', // Replace with the appropriate mime type
            body: fs.createReadStream(filePath),
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media,
            fields: 'id',
        });

        const fileId = response.data.id;

        // Make the file public
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Generate the public URL
        const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
        return fileUrl;
    } catch (error) {
        console.error('Error uploading file to Google Drive:', error);
        throw error;
    }
}

module.exports = { uploadFile };
