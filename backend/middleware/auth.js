import jwt from "jsonwebtoken";

const Auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(400).json({msg: "not authorized"})
    }
    
    try {
        
        req.user = jwt.verify(token, process.env.jwt_secret)
        
        
        next()
    } catch (error) {
        return res.status(500).json({err: error})
    }
    

}

export default Auth