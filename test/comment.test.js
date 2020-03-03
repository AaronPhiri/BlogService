const { Comment } = require('../models/comment.model')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
 describe("/api/comments", () => {
     beforeEach(async () => {
         await Comment.deleteMany({});
     })
     describe("Get /", () => {
         it ("Should return status 200 and comments", async () => {
             const comments = [
                 {
                    author: "comment",
                    email: "comment@gmail.com",
                    url: "url",
                    content: "content",
                    status: 1
                 },
                 {
                    author: "comment1",
                    email: "comment1@gmail.com",
                    url: "url1",
                    content: "content1",
                    status: 2
                 }
             ]
             await Comment.insertMany(comments)
             const res =await request(app).get('/api/comments/')
             expect(res.status).to.equal(200)
             expect(res.body.length).to.equal(2)

         })
     })
     describe("Get /:id",() =>{
        it("Should return a comment if valid id is passed",async () => {
            const comment = new Comment({
                author: "comment1",
                email: "comment1@gmail.com",
                url: "url1",
                content: "content1",
                status: 2
             })
            await comment.save();
    
            const res =await request(app).get("/api/comments/" + comment._id );
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("author", "comment1")
        });
        it("should return 400 when invalid object id is passed", async () => {
            const res =await request(app).get("/api/comments/1")
            expect(res.status).to.equal(400)
        })
        it("should return 404 error when valid object is passed but does not exist", async () => {
            const res = await request(app).get("/api/comments/111111111111");
            expect(res.status).to.equal(404);
        })
    })
    describe("Post /", () => {
        it("should return commets when the all request body is valid", async () => {
            const res =await request(app)
            .post("/api/comments/")
            .send({
                author: "comment",
                email: "comment1@gmail.com",
                url: "url1",
                content: "content1",
                status: 2
             })
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("_id");
            expect(res.body).to.have.property("author", "comment")
        })
    })
    describe("Put /:id", () => {
        it("should update the existing comment and return 200", async () =>{
            const comment = new Comment({
                author: "comment",
                email: "comment1@gmail.com",
                url: "url1",
                content: "content1",
                status: 2
             })
            await comment.save();
            const res =await request(app)
            .put("/api/comments/" + comment._id)
            .send({
                author: "commentupdated",
                email: "comment1@gmail.com",
                url: "url1",
                content: "content1",
                status: 2
             })
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("author", "commentupdated");
        })
    })
    describe("Delete /:id", () =>{
        it("should delete requested id and return response 200", async () =>{
            const comment = new Comment({
                author: "comment",
                email: "comment1@gmail.com",
                url: "url1",
                content: "content1",
                status: 2
             })
            await comment.save();
            const res =await request(app)
            .delete("/api/comments/" + comment._id)
            expect(res.status).to.be.equal(200)
        })
        it("should return 404 when deleted comment is requested", async () =>{
            const comment = new Comment({
                author: "comment",
                email: "comment1@gmail.com",
                url: "url1",
                content: "content1",
                status: 2
             })
            await comment.save()
            let res = await request(app)
            .delete("/api/comments/" + comment._id);
            expect(res.status).to.be.equal(200);

            res = await request(app)
            .get('/api/comments/' + comment._id);
            expect(res.status).to.be.equal(404);
        })
    })
 })