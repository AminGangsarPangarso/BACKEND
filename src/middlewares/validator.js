// const loginValidator = (req, res, next) => {
// 	const { user_name, password } = req.body;
// 	if (!user_name || !password) {
// 		res.status(400).json({ message: "user_name and password are required" });
// 	} else {
// 		next();
// 	}
// };

// const registerValidator = (req, res, next) => {
// 	const { password, user_name, number } = req.body;
// 	if (!password || !user_name) {
// 		res.status(400).json({ message: "Password and user_name are required" });
// 	} else if (password.length < 6) {
// 		res
// 			.status(400)
// 			.json({ message: "Password must be at least 6 characters long" });
// 	} else if (number.length < 12) {
// 		res
// 			.status(400)
// 			.json({ message: "Phone number must be at least 12 characters long" });
// 	} else if (number.slice(0, 2) !== "62") {
// 		res.status(400).json({ message: "Phone number must start with 62" });
// 	} else {
// 		next();
// 	}
// };

// module.exports = {
// 	loginValidator,
// 	registerValidator,
// };
const loginValidator = (req, res, next) => {
	const { user_name, password } = req.body;

	if (!user_name || !password) {
		return res.status(400).json({ message: "Username and password are required." });
	}

	next();
};

const registerValidator = (req, res, next) => {
	const { user_name, password, email, number } = req.body;

	if (!user_name || !password || !email || !number) {
		return res.status(400).json({ message: "Username, password, email, and number are required." });
	}

	if (password.length < 6) {
		return res.status(400).json({ message: "Password must be at least 6 characters long." });
	}

	if (number.length < 12) {
		return res.status(400).json({ message: "Number must be at least 12 characters long." });
	}

	if (!number.startsWith("62")) {
		return res.status(400).json({ message: "Number must start with 62." });
	}

	next();
};

module.exports = {
	loginValidator,
	registerValidator,
};
