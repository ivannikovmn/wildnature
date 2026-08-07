const validateResume = (req, res, next) => {
    let errors = {};

    const latinNameRegex = /^[A-Za-z\s'-]+$/;

    if (!req.body.first_name || req.body.first_name.length === 0) {
        errors.first_name = "Поле Имя обязательное";
    } else if (!latinNameRegex.test(req.body.first_name)) {
        errors.first_name = "Имя должно быть указано латиницей";
    }

    if (!req.body.last_name || req.body.last_name.length === 0) {
        errors.last_name = "Поле Фамилия обязательное";
    } else if (!latinNameRegex.test(req.body.last_name)) {
        errors.last_name = "Фамилия должна быть указана латиницей";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).send(errors);
    }

    next();
};

module.exports = {
    validateResume
};