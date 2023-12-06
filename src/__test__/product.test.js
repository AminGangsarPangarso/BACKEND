const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);
// const { nanoid } = require("nanoid");

describe("Get the product", () => {
    let id = "";
    let token = "";
    const user = {
        user_name: "admin1322",
        password: "coba1"
    }
    beforeAll(async () => {
        const res = await request.post("/api/v1/user/login").send(user);
		token = res.body.data.token;
    })
    it("should return all of products", async () => {
        const res = await request.get("/api/v1/products").set('Authorization', `Bearer ${token}`);
        console.log(res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("data");
        id = res.body.data[0].product_id
    });
    it("should return one product", async () => {
        const res = await request.get(`/api/v1/products/${id}`).set('Authorization', `Bearer ${token}`);;
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("data");
    });
});

// describe("Delete the product", () => {
//     const id = "YvoD6GGoLCAl3rm9724qe";
//     const user = {
//         user_name =
//     }
//     beforeAll(async () => {
//         await request.post(`api/v1/user/login`)
//     } )
//     it("should delete one product", async () => {
//         const res = await request.delete(`/api/v1/products/${id}`)
//         expect(res.statusCode).toEqual(200)
//     });
// });

// request(app)
//   .post('/api')
//   .set('Authorization', 'abc123')
