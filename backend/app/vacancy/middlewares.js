const Vacancy = require('./models/Vacancy')
const validateVacancy = (req, res, next) => {
    let errors = {};
    
    if(!req.body.name || req.body.name.length == 0)
        errors.name = "Поле Название мероприятия обязательное"

    if(!req.body.description || req.body.description.length == 0)
        errors.description = "Поле Расскажите про мероприятие обязательное" 

    if(!req.body.event_date || req.body.event_date.length == 0)
        errors.event_date = "Поле Дата обязательное" 

    if(!req.body.address || req.body.address.length == 0)
        errors.address = "Поле Адрес обязательное"             

    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors)
    else next()
}

const isAuthorVacancy = async (req, res, next) => {
    const id = req.params.id || req.body.id
    const vacancy = await Vacancy.findByPk(id);

    if (!vacancy) {
        res.status(400).send({message: "Vacancy with that id is not exist"})
    }
    else if(vacancy.userId === req.user.id) {
        next()
    } else {
        res.status(403).send({message: "Access Forbiden"})
    }
}

module.exports = {
    validateVacancy,
    isAuthorVacancy
}