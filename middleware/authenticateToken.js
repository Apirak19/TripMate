import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log("tokenInMiddle: ", token);

  if (token === null) {
    return res.status(401).json({ message: "Token required" });
  }

  const decode = jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}
