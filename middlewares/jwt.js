import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function genrateToken(data) {
  try {
    return jwt.sign(data, process.env.JWT_KEY);
  } catch (e) {
    console.log(e);
  }
}

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  try {
    jwt.verify(token, process.env.JWT_KEY);
    req.body.valid = true;
    next();
  } catch (JsonWebTokenError) {
    console.log(JsonWebTokenError);
    res.status(401).send("Invalid Token");
  }
}

export { genrateToken, verifyToken };
