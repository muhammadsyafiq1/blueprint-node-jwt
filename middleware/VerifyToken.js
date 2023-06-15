export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const { email } = decoded;

    // Dapatkan nilai role_id dari objek req
    const { role_id } = req;

    // Lakukan verifikasi berdasarkan role_id
    if (role_id !== 1) {
      return res.sendStatus(403);
    }

    req.email = email;
    next();
  });
};
