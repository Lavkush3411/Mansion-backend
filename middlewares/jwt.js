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
  const cookietoken = req.cookies.token;
  if (!cookietoken) {
    res.status(501).send({ msg: "Token is required" });
    return;
  }
  try {
    const data = jwt.verify(cookietoken, process.env.JWT_KEY);
    req.body.valid = true;
    req.email = data.email;

    next();
  } catch (JsonWebTokenError) {
    console.log(JsonWebTokenError);
    res.status(401).send("Invalid Token");
  }
}

export { genrateToken, verifyToken };
