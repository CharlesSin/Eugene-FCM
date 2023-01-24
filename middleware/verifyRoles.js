const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.status(401).json({ data: "Roles missing" });
    const rolesArray = [...allowedRoles];
    const result = req.roles.map((role) => rolesArray.includes(role)).find((val) => val === true);
    if (!result) return res.status(401).json({ data: "Roles setup missing" });
    next();
  };
};

module.exports = verifyRoles;
