import { jwtDecode } from "jwt-decode";
function verifyAdmin(req, res, next) {
  const decodedValue = jwtDecode(req.cookies.token);
  const { isAdmin } = decodedValue;
  req.body.isAdmin = isAdmin;

  next();
}

export { verifyAdmin };
