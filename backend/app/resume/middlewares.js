const Resume = require('./models/Resume')

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
}

const isAuthorOfResume = async (req, res, next) => {
    const id = req.params.id || req.body.id

    const resume = await Resume.findByPk(id)

    if(!resume) res.status(400).send({message: "Resume with that id is not exist"})
    // if(resume && req.user.id === resume.userId) next();
    else if(resume && req.user.id === resume.userId) next();
    else res.status(403).send({message: "Access Forbiden"})
}


module.exports = {
    validateResume,
    isAuthorOfResume
}