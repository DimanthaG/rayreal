const { google } = require('googleapis');
const fs = require('fs');

// Configure OAuth2 Client
const credentials = require('../credentials.json'); // Path to your credentials.json
const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json', // Service account credentials file
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

// Function to upload a file
async function uploadFile(filePath, fileName) {
    try {
        const fileMetadata = {
            name: fileName,
            parents: ['your_folder_id'], // Replace 'your_folder_id' with the Google Drive folder ID
        };

        const media = {
            mimeType: 'image/jpeg', // Change if uploading other file types
            body: fs.createReadStream(filePath),
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });

        console.log(`File uploaded successfully: ${response.data.id}`);
        return response.data.id;
    } catch (err) {
        console.error('Error uploading file to Google Drive:', err);
        throw err;
    }
}

module.exports = { uploadFile };
