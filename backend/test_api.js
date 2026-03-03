const http = require('http');

const testApi = (path, method = 'GET', data = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(body) }));
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
};

async function runTests() {
    try {
        console.log('--- Testing GET /api/products ---');
        const products = await testApi('/api/products');
        console.log('Status:', products.status);
        console.log('First Product:', products.body[0].product);

        console.log('\n--- Testing POST /api/orders ---');
        const order = await testApi('/api/orders', 'POST', { items: [{ product: 'Verified Batch', price: '$500' }], total: 500 });
        console.log('Status:', order.status);
        console.log('Response:', order.body);
    } catch (err) {
        console.error('Test Failed:', err.message);
    }
}

runTests();
