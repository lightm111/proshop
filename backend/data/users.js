import bcrypt from "bcrypt"

const users = [
    {
        name: "admin",
        email: "ad@mi.n",
        password: bcrypt.hashSync("admin", 10),
        isAdmin: true
    },
    {
        name: "foo",
        email: "foo@foo.foo",
        password: bcrypt.hashSync("foo", 10),
        isAdmin: false
    }
]

export default users