const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../model/User.model');

router.post('/register', async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const usernameCheck = await User.findOne({ username });
		if (usernameCheck) {
			return res.json({ message: 'username already in use' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});
		delete user.password;
		res.json(user);
	} catch (error) {
		console.log(error);
	}
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			res.json({ message: 'incorrect username or password' });
		}
		const ifPasswordValid = await bcrypt.compare(password, user.password);
		if (!ifPasswordValid) {
			res.json({ message: 'incorrect username or password' });
		}
		delete user.password;
		return res.json({ user });
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
