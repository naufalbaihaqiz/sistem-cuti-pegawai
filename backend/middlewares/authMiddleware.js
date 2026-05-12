const requireLogin = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/auth/login');
};

const requireRole = (rolesAkses) => {
    return (req, res, next) => {
        const userRoles = req.session.roles || [];
        const hasAccess = userRoles.some(role => rolesAkses.includes(role));

        if (hasAccess) {
            return next();
        }
        res.status(403).send('Forbidden: Anda tidak memiliki hak akses.');
    };
};

module.exports = { requireLogin, requireRole };