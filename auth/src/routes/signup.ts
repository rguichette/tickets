import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator'
import jwt from "jsonwebtoken"

import {User} from "../models/user"

import {BadRequestError,validateRequest} from "@rgviz/common"


const router = express.Router()



router.post("/api/users/signup",[
    body('email').isEmail().withMessage("please enter a valid email"),
    body('password').trim().isLength({min:4, max:20})
    .withMessage('password must be between 4 and 20 characters')
], validateRequest, async (req: Request, res: Response)=>{
const errors = validationResult(req);


// if(!errors.isEmpty()){
//     console.log("something happened here....");
    
//    throw new RequestValidationError(errors.array())
// }



const {email, password} = req.body; 
const existingUser = await User.findOne({email})

// return res.send({email, password})

if(existingUser){
    console.log("email in use");
    // return res.send({})
    throw new BadRequestError("Email in use")
}



const user =  User.build({email,password});


await user.save()

//Gen jwt 

const userJwt = jwt.sign({
    id:user.id,
    email:user.email
}, process.env.JWT_KEY!
);
//store it on session
req.session = {
jwt: userJwt
}

res.status(201).send(user)
})

export {router as signupRouter}