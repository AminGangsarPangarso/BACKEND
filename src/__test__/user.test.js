const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);

describe("User Endpoints", () => {
	let token = null;
	const user = {
		user_name: "admin" + Math.floor(Math.random() * 1000),
		password: "admin1234",
		number: "6285647847468",
	};
	it("should register a new user", async () => {
		const res = await request.post("/api/v1/user/register").send(user);
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("data");
	});
	it("should login a user", async () => {
		const res = await request.post("/api/v1/user/login").send(user);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("data");
		token = res.body.data.token;
	});
	it("should get user detail", async () => {
		const res = await request
			.get("/api/v1/user")
			.set("Authorization", `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("data");
	});
	it("should update user", async () => {
		const res = await request
			.put("/api/v1/user")
			.set("Authorization", `Bearer ${token}`)
			.send({ number: "6285647847468" });
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("data");
	});
});
