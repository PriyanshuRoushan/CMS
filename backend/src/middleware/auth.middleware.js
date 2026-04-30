// Client → Request with token
//        ↓
// verifyToken middleware
//        ↓
// Token decoded → req.user = { id, role }
//        ↓
// authorize middleware (optional)
//        ↓
// Controller runs

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // ✅ FIX

    if (!authHeader) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};

export const authorize = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !roles.includes(req.user.role)) { // ✅ FIX
        return res.status(403).json({ msg: "Access Denied" });
      }

      next(); // ❗ you forgot this
    } catch (error) {
      return res.status(500).json({ msg: "Authorization error" });
    }
  };
};