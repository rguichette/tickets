import request from "supertest";
import {app} from '../../app';


it('returns a 201 on successful signup', async()=>{
    return request(app)
    .post("/api/users/signup")
    .send({
        email:"test@test.com",
        password:"mypasstest"
    })
    .expect(201);
})

it("returns a 400 with an invalid email", async()=>{
    return request(app)
    .post("/api/users/signup")
    .send({
        email:"testtest.com",
        password:"mypasstest"
    })
    .expect(400);
})

it("returns a 400 with an invalid password", async()=>{
    return request(app)
    .post("/api/users/signup")
    .send({
        email:"test@test.com",
        password:"4"
    })
    .expect(400);
})
it("returns a 400 with missing email and password", async()=>{
    return request(app)
    .post("/api/users/signup")
    .send({})
    .expect(400);
})

it("it disallows duplicate emails", async () =>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email:'test@test.com',
        password:"beaver"
    })
    .expect(201);

    await request(app)
    .post('/api/users/signup')
    .send({
        email:'test@test.com',
        password:"beaver"
    })
    .expect(400);
})


it("sets a cookie after a successfule signup", async ()=>{
   const respose =  await request(app)
    .post('/api/users/signup')
    .send({
        email:'test@test.com',
        password:"beaver"
    })
    .expect(201);

    expect(respose.get("Set-Cookie")).toBeDefined();
})