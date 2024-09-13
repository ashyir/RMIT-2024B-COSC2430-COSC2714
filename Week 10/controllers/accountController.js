const PATH = 'account';

const index = (req, res) => {
    return res.render(`${PATH}/account`, { title: 'Account' });
};

const login = (req, res) => {
    return res.render(`${PATH}/login`, { title: 'Login' });
};

const authenticate = (req, res) => {
    const { email, password } = req.body;

    // Simple authentication check
    if (password === 'COSC2430') {
        // Store email in session
        req.session.user = email;

        // Redirect to profile page after login
        return res.redirect(`/${PATH}/profile`);
    }

    return res.render(`${PATH}/login`, { title: 'Login', error: 'Invalid credentials.' });
};

const profile = (req, res) => {
    if (req.session.user)
        return res.render(`${PATH}/profile`, { title: 'Profile', username: req.session.user });

    // Redirect to login if not authenticated
    res.redirect(`/${PATH}/login`);
}

const logout = (req, res) => {
    req.session.destroy((error) => {
        if (error)
            return res.redirect(`/${PATH}/profile`);

        res.redirect(`/${PATH}/login`);
    });
}

module.exports = { index, login, authenticate, profile, logout };