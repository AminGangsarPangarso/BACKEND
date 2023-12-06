const { loginValidator, registerValidator } = require("./validator");
const auth = require("./auth");

module.exports = {
	loginValidator,
	registerValidator,
	auth,
};
