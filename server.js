const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routing');
const fs = require('fs'); // Import the 'fs' module to work with files
const path = require('path'); // Import the 'path' module for file paths

const app = express();
const port = 3000; // Port number

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/', routes);

app.post('/save-drawing', (req, res) => {
    const drawingData = req.body;

    // Define the filename based on the data
    const filename = drawingData.username + '_' + drawingData.session + '.json';
    const filePath = path.join(__dirname, 'drawing_json_files', filename);

    // Save the drawing data to the specified file
    fs.writeFile(filePath, JSON.stringify(drawingData), (err) => {
        if (err) {
            console.error('Error saving drawing data:', err);
            res.sendStatus(500); // Internal Server Error
        } else {
            console.log('Drawing data saved successfully.');

            // Respond with the saved filename for the client
            res.json({ filename });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
