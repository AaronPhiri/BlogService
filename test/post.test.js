const { Post } = require("../models/post.model")
const request = require('supertest')
const expect = require('chai').expect
const app = require("../app")

describe("api/posts", () => {
    beforeEach(async () => {
        await Post.deleteMany({});
    })
    describe("Get /", () => {
        it("Should return all posts", async () => {
            const posts = [
                {title: "test", content: 'test@gmail.com', status: 1,tags: []},
                {title: "test1", content: 'test1@gmail.com', status: 2,tags: []}
            ]
            await Post.insertMany(posts);
            const res =await request(app).get("/api/posts/");
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
        })
    });
    
    describe("Get /:id",() =>{
        it("Should return a post if valid id is passed",async () => {
            const post = new Post({title: "test", content: 'test@gmail.com', status: 1,tags: []})
            await post.save();
    
            const res =await request(app).get("/api/posts/" + post._id );
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("title", post.title)
        });
        it("should return 400 when invalid object id is passed", async () => {
            const res =await request(app).get("/api/posts/1")
            expect(res.status).to.equal(400)
        })
        it("should return 404 error when valid object is passed but does not exist", async () => {
            const res = await request(app).get("/api/posts/111111111111");
            expect(res.status).to.equal(404);
        })
    })
    describe("Post /", () => {
        it("should return posts when the all request body is valid", async () => {
            const res =await request(app)
            .post("/api/posts/")
            .send({title: "test", content: 'test@gmail.com', status: 1,tags: []})
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("_id");
            expect(res.body).to.have.property("title", "test")
        })
    })
    describe("Put /:id", () => {
        it("should update the existing post and return 200", async () =>{
            const post = new Post({title: "test", content: 'test@gmail.com', status: 1,tags: []})
            await post.save();
            const res =await request(app)
            .put("/api/posts/" + post._id)
            .send({title: "Newtest", content: 'Newtest@gmail.com', status: 1,tags: []})
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("title", "Newtest");
        })
    })
    describe("Delete /:id", () =>{
        it("should delete requested id and return response 200", async () =>{
            const user = new Post({title: "test", content: 'test@gmail.com', status: 1,tags: []})
            await user.save();
            const res =await request(app)
            .delete("/api/posts/" + user._id)
            expect(res.status).to.be.equal(200)
        })
        it("should return 404 when deleted user is requested", async () =>{
            const post = new Post({title: "test", content: 'test@gmail.com', status: 1,tags: []})
            await post.save()
            let res = await request(app)
            .delete("/api/posts/" + post._id);
            expect(res.status).to.be.equal(200);

            res = await request(app)
            .get('/api/posts/' + post._id);
            expect(res.status).to.be.equal(404);
        })
    })
});
