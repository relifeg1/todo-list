const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// جعل مجلد public متاحاً للجميع
app.use(express.static(path.join(__dirname, 'public')));

// الصفحة الرئيسية تحولك لصفحة الأدمن
app.get('/', (req, res) => {
    res.redirect('/admin.html');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});