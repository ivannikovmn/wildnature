const Apply = require('./Apply')
const Resume = require('../resume/models/Resume')
const validateApply = (req, res, next) => {
    let errors = {};
    
    if(!req.body.resumeId || req.body.resumeId.length == 0)
        errors.resumeId = "Поле Резюме обязательное"

    if(!req.body.vacancyId || req.body.vacancyId.length == 0)
        errors.vacancyId = "Поле Вакансия обязательное"         

    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors)
    else next()
}

const isAuthorOfApply = async (req, res, next) => {
    const id = req.params.id;

    const apply = await Apply.findByPk(id);

    if (!apply) {
        return res.status(400).send({
            message: "Apply with that id is not exist"
        });
    }

    const resumes = await Resume.findAll({
        where: {
            userId: req.user.id
        }
    });

    const ids = resumes.map(item => item.id);

    if (ids.includes(apply.resumeId)) {
        next();
    } else {
        res.status(403).send({
            message: "Access Forbiden"
        });
    }
}

module.exports = {
    validateApply,
    isAuthorOfApply
}