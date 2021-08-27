module.exports = fn => {
    return (req, res, next) => {
        // fn(req, res, next).catch(next);
        try {
            fn(req, res, next)
        } catch (err) {
            res.send(err.message)
            // next()
        }
    };
};
