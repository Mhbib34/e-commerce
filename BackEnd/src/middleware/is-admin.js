export const isAdmin = (req, res, next) => {
  const user = req.user;

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden. Admin only." });
  }

  next();
};
