//googleapis
const { google } = require('googleapis');

//path module
const path = require('path');

//file system module
const fs = require('fs');

//client id
const CLIENT_ID = '946477503913-h23eeisiq7uel3bnq5fgon35464sd2ms.apps.googleusercontent.com'

//client secret
const CLIENT_SECRET = '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';

//redirect URL
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

//refresh token
const REFRESH_TOKEN = '1//04_0AqYB09wobCgYIARAAGAQSNwF-L9Ir_KL4l4xKxnGX5p1wLf5ivkgKbl3ZBZRMF0yjaI5zmd2bm_msSqE-FNc2XuX_5B9_IiA'


//intialize auth client
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);


//setting our auth credentials
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


//initialize google drive
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});


export const uploadFile = async () => {
    //file path for out file
    const filePath = path.join(__dirname, 'filename.format');

    try{
        const response = await drive.files.create({
              requestBody: {
                  name: 'hero.png', //file name
                  mimeType: 'image/png',
              },
              media: {
                  mimeType: 'image/png',
                  body: fs.createReadStream(filePath),
              },
          });  
          // report the response from the request
          console.log(response.data);
      }catch (error) {
          //report the error message
          console.log(error.message);
      }
}


const uploadFile = (file) => {
    const fileMetadata = {
      'name': 'photo.jpg'
    };
    const media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream(file)
    };
    drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    }, (err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log('File Id: ', file.id);
      }
    });
  }
  