const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user.routes');
app.use('/api/auth', userRoutes);

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to database');
	})
	.catch((error) => {
		console.log(error);
	});

const server = app.listen(process.env.PORT, () =>
	console.log('Server listening on port 5000')
);
