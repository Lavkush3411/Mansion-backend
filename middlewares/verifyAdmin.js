import { jwtDecode } from "jwt-decode";
function verifyAdmin(req, res, next) {
  const decodedValue = jwtDecode(req.cookies.token);
  const { isAdmin } = decodedValue;
  if (isAdmin) {
    req.body.isAdmin = isAdmin;
    next();
  } else {
    res.status(501).json({ msg: "Admin verification failed" });
  }
}

export { verifyAdmin };
