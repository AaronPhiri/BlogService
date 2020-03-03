const { Tag } = require('../models/tag.model')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
 describe("/api/tags", () => {
     beforeEach(async () => {
         await Tag.deleteMany({});
     })
     describe("Get /", () => {
         it ("Should return status 200 and tags", async () => {
             const tags = [
                 {
                    name: "tag1",
                    frequency: 3
                 },
                 {
                    name: "tag2",
                    frequency: 5
                 }
             ]
             await Tag.insertMany(tags)
             const res =await request(app).get('/api/tags/')
             expect(res.status).to.equal(200)
             expect(res.body.length).to.equal(2)

         })
     })
     describe("Get /:id",() =>{
        it("Should return a tag if valid id is passed",async () => {
            const tag = new Tag({
                name: "tag2",
                frequency: 5
             })
            await tag.save();
    
            const res =await request(app).get("/api/tags/" + tag._id );
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("name", "tag2")
        });
        it("should return 400 when invalid object id is passed", async () => {
            const res =await request(app).get("/api/tags/1")
            expect(res.status).to.equal(400)
        })
        it("should return 404 error when valid object is passed but does not exist", async () => {
            const res = await request(app).get("/api/tags/111111111111");
            expect(res.status).to.equal(404);
        })
    })
    describe("Post /", () => {
        it("should return tag when the all request body is valid", async () => {
            const res =await request(app)
            .post("/api/tags/")
            .send({
                name: "tag1",
                frequency: 5
             })
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("_id");
            expect(res.body).to.have.property("name", "tag1")
        })
    })
    describe("Put /:id", () => {
        it("should update the existing Tag and return 200", async () =>{
            const tag = new Tag({
                name: "tag1",
                frequency: 2
             })
            await tag.save();
            const res =await request(app)
            .put("/api/tags/" + tag._id)
            .send({
                name: "tag2",
                frequency: 7
             })
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("name", "tag2");
        })
    })
    describe("Delete /:id", () =>{
        it("should delete requested id and return response 200", async () =>{
            const tag = new Tag({
                name: "tag2",
                frequency: 7
             })
            await tag.save();
            const res =await request(app)
            .delete("/api/tags/" + tag._id)
            expect(res.status).to.be.equal(200)
        })
        it("should return 404 when deleted tag is requested", async () =>{
            const tag = new Tag({
                name: "tag1",
                frequency: 7
             })
            await tag.save()
            let res = await request(app)
            .delete("/api/tags/" + tag._id);
            expect(res.status).to.be.equal(200);

            res = await request(app)
            .get('/api/tags/' + tag._id);
            expect(res.status).to.be.equal(404);
        })
    })
 })