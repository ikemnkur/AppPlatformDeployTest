// Simple Node.js server that calls Python
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/run-python', (req, res) => {
    const pythonProcess = spawn('python3', [
        path.join(__dirname, '../python-app/script.py'),
        'Hello from Node.js'
    ]);

    let output = '';
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        res.send(`Python output: ${output}`);
    });
});

app.listen(PORT, () => {
    console.log(`Node.js server running on port ${PORT}`);
});
