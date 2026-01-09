import jwt from "jsonwebtoken";

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("JWT verification error:", error);
    return res.status(401).json({ errors: "Invalid token or expired" });
  }
}

export default userMiddleware;
