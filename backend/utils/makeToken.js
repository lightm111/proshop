import jwt from "jsonwebtoken"

export default (res, userId) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    // set jwt token as http-only  cookie
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict"
    })
}
