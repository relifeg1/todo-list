const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// رابط قاعدة البيانات الخاصة بك
const BLOB_URL = "https://jsonblob.com/api/jsonBlob/019bdbe5-a54f-705f-a70a-0e7e478b35ef";

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// نقطة الاتصال لجلب البيانات (السيرفر يتكلم مع JSONBlob)
app.get('/api/data', async (req, res) => {
    try {
        const response = await fetch(BLOB_URL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// نقطة الاتصال لحفظ البيانات
app.put('/api/data', async (req, res) => {
    try {
        const response = await fetch(BLOB_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error saving:", error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});