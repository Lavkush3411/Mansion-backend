import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function genrateToken(data) {
  try {
    const { password, ...datanew } = data;
    return jwt.sign(datanew, process.env.JWT_KEY);
  } catch (e) {
    console.log(e);
  }
}

function verifyToken(req, res, next) {
  try {
    const tokenIsValid = jwt.verify(req.body.Token, process.env.JWT_KEY);
    console.log(tokenIsValid);
    req.body.valid = true;
    next();
  } catch (JsonWebTokenError) {
    console.log(JsonWebTokenError);
    res.status(401).send("Invalid Token");
  }
}

export { genrateToken, verifyToken };
