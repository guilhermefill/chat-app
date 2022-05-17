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
		res.json(user);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
