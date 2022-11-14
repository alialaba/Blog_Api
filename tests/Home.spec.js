const request = require("supertest");

const app = require("../app");//getting my app.js func

describe('App Home Route', ()=>{
    it('should return status true', async ()=>{
        const response = await request(app).get("/").set('content-type', 'application/json');
        console.log(response)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({status:true,  message:"Hey, Welcome to the Blog APIs World "})
    })
    
    it('should return error when route is not defined', async ()=>{
        const response = await request(app).get("/undefined").set('content-type', 'application/json');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({message:"Route is not found"})
    })
});