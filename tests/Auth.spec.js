const request = require("supertest");
const { connect } = require("./database")
const UserModel = require("../models/userModel");


const app = require("../app");


describe('App: Auth for Signup/Login Route', ()=>{


    let conn ;

    //repeating setup (before all test)
    beforeAll(async()=>{
         conn = await connect()
    })

    //one time setup (after each test)
    afterEach(async()=>{
        await conn.cleanup()
    })

    //repeating setup (before all test)
    afterAll(async()=>{
         await conn.disconnect()
   })


   it("should signup a user",async()=>{
       const response = await request(app).post("/signup")
       .set('content-type', 'application/json')
       .send({email:"aliaba@gmail.com", password:"12345", firstname:"Aliyu", lastname:"AbdulGaniy"})
       expect(response.status).toBe(201);
       expect(response.body).toHaveProperty('message');
       expect(response.body).toHaveProperty('user');
   })


   it("should login a user", async()=>{

    //test by creating user in the database  
    //NB: make sure to fulfill your user model requirement as usual

    const user = await UserModel.create({email:"aliaba@gmail.com", password:"12345", firstname:"Aliyu", lastname:"AbdulGaniy"})
    
   // login the user
    const response = await request(app).post("/login")
    .set("content-type", "application/json")
    .send({email:"aliaba@gmail.com", password:"12345"})

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token")
   })
   


})


