const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const compression = require("compression");
const db = require("./database");

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const landingRouter = require("./routes/landing");
// const costumersRouter =require('./routes/costumers')

const { syncModels } = require("./models");

dotenv.config();

const port = process.env.PORT || process.env.APP_PORT;

app.use(morgan("tiny"));

app.use(compression());
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
);
app.use(
	cors({
		origin: "*",
	})
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/landing", landingRouter);
// app.use('/api/v1/costumers',costumersRouter)

try {
	db.authenticate();
	syncModels();
	console.log("Connection has been established successfully.");
} catch (err) {
	console.error("Unable to connect to the database:", err);
}

app.get('/',(req,res)=>{
	res.send("hellow word")
})
app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
