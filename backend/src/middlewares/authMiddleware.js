const { auth } = require("../config/firebaseAdmin");

const authMiddleware = async (req, res, next) => {
  if (
    req.originalUrl.includes("/productos") ||
    req.originalUrl.includes("/categorias") ||
    req.originalUrl.includes("/presentaciones") ||
    req.originalUrl.includes("/banners")
  ) {
    return next();
  }

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authorizationHeader.split("Bearer ")[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);

    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(401).json({ error: "Token has expired" });
    }

    if (!decodedToken.permissions.includes("admin")) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);

    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
