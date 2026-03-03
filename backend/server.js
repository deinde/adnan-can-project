const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data
let products = [
    {
        id: 1,
        supplier: "Platinum Extracts",
        product: "Live Resin - Sour Diesel",
        type: "Live Resin",
        thc: "85%",
        volume: "30 lbs",
        price: "$450/lb",
        coa: "Verified",
        location: "California",
        extraction: "BHO / Proprietary Cryo",
        terpenes: "Caryophyllene, Myrcene, Limonene",
        tiers: [
            { qty: "1-10 lbs", price: "$450/lb" },
            { qty: "10-25 lbs", price: "$420/lb" },
            { qty: "25+ lbs", price: "$390/lb" }
        ]
    },
    {
        id: 2,
        supplier: "GreenLeaf Labs",
        product: "Distillate - Ultra Clear",
        type: "Distillate",
        thc: "92%",
        volume: "50 kg",
        price: "$320/kg",
        coa: "Verified",
        location: "Oregon",
        extraction: "Short Path Distillation",
        terpenes: "N/A - Isolated",
        tiers: [
            { qty: "1-10 kg", price: "$320/kg" },
            { qty: "10-50 kg", price: "$290/kg" },
            { qty: "50+ kg", price: "$260/kg" }
        ]
    },
    {
        id: 3,
        supplier: "Mountain Rosin",
        product: "Live Rosin - GMO",
        type: "Live Rosin",
        thc: "72%",
        volume: "15 lbs",
        price: "$650/lb",
        coa: "Verified",
        location: "Colorado",
        extraction: "Solventless / Ice Water Hash",
        terpenes: "Limonene, Humulene",
        tiers: [
            { qty: "1-5 lbs", price: "$650/lb" },
            { qty: "5-15 lbs", price: "$620/lb" }
        ]
    },
    {
        id: 4,
        supplier: "Crystal Clear",
        product: "THCa Isolate - 99.9%",
        type: "Isolate",
        thc: "99.9%",
        volume: "100 kg",
        price: "$450/kg",
        coa: "Verified",
        location: "California",
        extraction: "Pentane Precipitation",
        terpenes: "N/A - Isolated",
        tiers: [
            { qty: "1-10 kg", price: "$450/kg" },
            { qty: "10-50 kg", price: "$400/kg" }
        ]
    },
    {
        id: 5,
        supplier: "Terp King",
        product: "Terp Sauce - Blue Dream",
        type: "Sauce",
        thc: "68%",
        volume: "25 lbs",
        price: "$380/lb",
        coa: "Verified",
        location: "Oregon",
        extraction: "BHO / High Terpene",
        terpenes: "Myrcene, Pinene",
        tiers: [
            { qty: "1-10 lbs", price: "$380/lb" },
            { qty: "10-25 lbs", price: "$350/lb" }
        ]
    },
    {
        id: 6,
        supplier: "Gemstone Extracts",
        product: "Diamonds - HCE",
        type: "Diamonds",
        thc: "95%",
        volume: "20 lbs",
        price: "$550/lb",
        coa: "Verified",
        location: "Washington",
        extraction: "BHO / Crystal Growth",
        terpenes: "Residual - Low",
        tiers: [
            { qty: "1-5 lbs", price: "$550/lb" },
            { qty: "5-20 lbs", price: "$500/lb" }
        ]
    }
];

let orders = [];

// Endpoints
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const newProduct = {
        ...req.body,
        id: products.length + 1,
        coa: "Verified" // Auto-verify for this demo
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.post('/api/orders', (req, res) => {
    const order = {
        id: orders.length + 1,
        items: req.body.items,
        total: req.body.total,
        status: 'Pending',
        timestamp: new Date()
    };
    orders.push(order);
    res.status(201).json({ message: 'Order submitted successfully', orderId: order.id });
});

app.get('/api/inventory', (req, res) => {
    // Return sample inventory for the seller dashboard
    res.json([
        { id: 101, batch: "B-2024-001", volume: "150 lbs", status: "Active", views: 420, offers: 12 },
        { id: 102, batch: "B-2024-002", volume: "45 kg", status: "Processing", views: 150, offers: 2 }
    ]);
});

app.get('/api/analytics', (req, res) => {
    res.json({
        pricingTrends: [
            { category: "Live Resin", oct: 420, nov: 430, dec: 435, change: "+3.5%" },
            { category: "Live Rosin", oct: 680, nov: 660, dec: 650, change: "-4.4%" },
            { category: "Distillate", oct: 310, nov: 300, dec: 295, change: "-4.8%" }
        ],
        platformStats: {
            listingVol: "$2.4M",
            verifiedLbs: "14,500"
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
