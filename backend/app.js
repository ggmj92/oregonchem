const express = require('express');
const dbConnection = require('./src/config/config');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./src/routes/apiRoutes');
const authRouter = require('./src/routes/auth');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', routes);
app.use('/auth', authRouter);


app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
});