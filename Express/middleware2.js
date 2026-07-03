import express from 'express';

const app = express();

app.use(express.json());

const Guard = (req, res, next) => {
    const { role } = req.query;
    if (role === 'admin') {
        console.log("Middleware approved");
        next(); //approve
    } else {
        console.log("Middleware not approved");
        res.status(403).json({ error: 'Access Denied. Admins only.' });
    }
};

app.get('/public', (req, res) => {
    res.send('Anyone can see this!');
});

app.get('/admin', Guard, (req, res) => {
    res.send('Welcome to the elite matrix command center, Admin.');
});

app.listen(5000, () => console.log('Server running on port 3000'));



