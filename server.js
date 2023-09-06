const fs = require('fs');
const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const PORT = 3000;

function logToJSONFile(data) {
    const logFilePath = "./server_logs.json";
    let logs = [];
    
    // if (fs.existsSync(logFilePath)) {
    //     logs = JSON.parse(fs.readFileSync(logFilePath, 'utf8'));
    // }
    
    // logs.push(data);
    // fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
}

app.get('/address/:address', (req, res) => {
    const address = req.params.address;
    const options = {
        hostname: 'testnet-idx.voi.nodly.io',
        port: 443,
        path: `/v2/accounts/${address}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
            logToJSONFile({ endpoint: '/address/:address', data: JSON.parse(data) });
            res.json(JSON.parse(data));
        });
    });

    request.on('error', (error) => {
        logToJSONFile({ endpoint: '/address/:address', error: error.message });
        res.status(500).send({ error: 'Failed to fetch address details' });
    });
    
    request.end();
});

app.get('/block/:round', (req, res) => {
    const round = req.params.round;
    const options = {
        hostname: 'testnet-idx.voi.nodly.io',
        port: 443,
        path: `/v2/blocks/${round}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
            logToJSONFile({ endpoint: '/block/:round', data: JSON.parse(data) });
            res.json(JSON.parse(data));
        });
    });

    request.on('error', (error) => {
        logToJSONFile({ endpoint: '/block/:round', error: error.message });
        res.status(500).send({ error: 'Failed to fetch block details' });
    });
    
    request.end();
});

app.get('/ledger/supply', (req, res) => {
    const options = {
        hostname: 'testnet-idx.voi.nodly.io',
        port: 443,
        path: '/v2/ledger/supply',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
            logToJSONFile({ endpoint: '/ledger/supply', data: JSON.parse(data) });
            res.json(JSON.parse(data));
        });
    });

    request.on('error', (error) => {
        logToJSONFile({ endpoint: '/ledger/supply', error: error.message });
        res.status(500).send({ error: 'Failed to fetch ledger supply data' });
    });
    
    request.end();
});

app.get('/address/:address/transactions', (req, res) => {
    const address = req.params.address;
    const options = {
        hostname: 'testnet-idx.voi.nodly.io',
        port: 443,
        path: `/v2/accounts/${address}/transactions`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
            logToJSONFile({ endpoint: '/address/:address/transactions', data: JSON.parse(data) });
            res.json(JSON.parse(data));
        });
    });

    request.on('error', (error) => {
        logToJSONFile({ endpoint: '/address/:address/transactions', error: error.message });
        res.status(500).send({ error: 'Failed to fetch transactions for the given address' });
    });
    
    request.end();
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// Serving static files from the public directory
app.use(express.static('public'));

// If no API routes are hit, serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
