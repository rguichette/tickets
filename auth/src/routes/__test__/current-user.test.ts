import request from "supertest";
import {app} from '../../app';

it('responds with details about the current users', async() =>{
const cookie = await global.signin()

const response = await request(app)
.get("/api/users/currentuser")
.set("Cookie", cookie)
.expect(200);
// console.log(response.body);

expect(response.body.currentUser.email).toEqual('test@test.com')

})

it('respodes with null if not authenticated', async()=>{
    const response = await request(app)
    .get('/api/users/currentuser')
    .expect(200)
    
    expect(response.body.currentUser ).toEqual(null)
})
