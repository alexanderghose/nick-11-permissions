import Users from '../models/users'
import { Request, Response } from 'express'
import { validatePassword } from '../models/users'
// ! import the jwt creation and verification utilities 
import jwt from 'jsonwebtoken'

export const signup = async (req : Request, res: Response) => {
    try {
        console.log('POSTING!', req.body)
        const user = await Users.create(req.body)
        res.send(user)
    } catch (e) {
        console.log(e)
        res.send("Signup failed")
    }
}

export const login = async(req: Request,res: Response) => {
    const incomingData = req.body
    const incomingPassword = req.body.password
    const incomingEmail = req.body.email
    // check if email belongs to an existing user in our database
    const foundUser = await Users.findOne({ email: incomingEmail })
    if (!foundUser) {
        return res.send({ message: "login failed. User not found" });
    }

    // check if the password is correct.
    const isValidPw:boolean = validatePassword(incomingPassword, foundUser.password)
    if (isValidPw) {

        // ! Issues a unique jwt for this user
        const token = jwt.sign(
            { userId: foundUser._id, email: foundUser.email }, // base64-compressed payload: anything you want
            "This is a very secret string only we know", // a secret only known to srv
            { expiresIn: '24h' }                        // an expiry of the token
        )

        res.send({ message: "Login successful", token })
    } else {
        res.status(401).send({ message: "Login failed. Check credentials and try again!" })
    }
}