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

module.exports = {
    validateVacancy
}