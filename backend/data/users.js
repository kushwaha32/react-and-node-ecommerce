import bcrypt from "bcryptjs"

const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "Raj kushwaha",
        email: "raj@gmail.com",
        password: bcrypt.hashSync("123456", 10)
    },
    {
        name: "Rakhi yadav",
        email: "rakhi@gmail.com",
        password: bcrypt.hashSync("123456", 10)
    }
]


export default users