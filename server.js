const express = require('express');
const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const app = express();
const port = 8080; // Port number

app.use(express.json());
app.use(express.static('docs'));

/* Google Cloud Storage */
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const keyFilename = process.env.GOOGLE_CLOUD_KEY_FILENAME;
const storage = new Storage({
    projectId,
    keyFilename,
});
const bucket = storage.bucket('drawings_app')



/* Handle /save-drawing endpoint */
app.post('/save-drawing', (req, res) => {
    console.log('save called', req.body)
    try {
        if (req.body) {
            console.log('File found')
            const drawingData = req.body;
            const fileName = drawingData.username + '_' + drawingData.session + '.json';

            const drawingsValidation = Object.keys(drawingData.drawings)
            const validDrawings = ['cat', 'cellphone', 'tree', 'chair', 'bicycle', 'pencil']

            // Check if the arrays are of the same length
            let isValid = true;
            if (drawingsValidation.length !== validDrawings.length) {
                isValid = false;
            } else {
                for (let i = 0; i < drawingsValidation.length; i++) {
                    if (drawingsValidation[i] !== validDrawings[i]) {
                        isValid = false;
                        break;
                    }
                }
            }

            if (!isValid) {
                console.log('Validation failed.')
                res.status(500).send('Validation failed. Do not modify the drawings keys please.');
            }

            const file = bucket.file(fileName);
            file.save(JSON.stringify(drawingData), (err) => {
                if (err) {
                    console.error('Error saving drawing data:', err);
                    res.status(500).send('Error saving drawing data');
                } else {
                    console.log('Drawing data saved successfully!');
                    res.status(200).send('Drawing data saved successfully!')
                }
            })
        } else {
            console.log('not request body', req.body)
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
