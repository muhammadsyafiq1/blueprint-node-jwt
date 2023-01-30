import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // memggunakan split karena bearer dan token ada space dan ambil index 1 untuk ambil token
    // operator && apabila user tidak mengirim token maka variabel tokennya juga kosong
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}




