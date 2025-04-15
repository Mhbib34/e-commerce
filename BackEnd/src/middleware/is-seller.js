export const isAdmin = (req, res, next) => {
  const user = req.user;

  if (!user || user.role !== "SELLER") {
    return res.status(403).json({ message: "Forbidden. Seller only." });
  }

  next();
};
