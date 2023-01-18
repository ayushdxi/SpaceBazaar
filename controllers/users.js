const User = require('../models/user');

module.exports.renderRegister = (req, res) =>{
    res.render('users/register')
}

module.exports.register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = new User({email, username})
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/spaces')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome Back');
    const redirectUrl = req.session.returnTo || '/spaces';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.logout = (req, res) => {
    req.logout(() => {
        req.flash('success', 'You have been logged out.')
        res.redirect('/spaces')
    });
}