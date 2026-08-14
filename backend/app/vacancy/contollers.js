const Vacancy = require ('./models/Vacancy')
const Company = require('../auth/Company')

const createVacancy = async (req, res) => {
    const vacancy = await Vacancy.create({
            name: req.body.name,
            about_company: req.body.about_company,
            description: req.body.description,
            event_date: req.body.event_date,
            address: req.body.address,
            branding_photo: req.body.branding_photo,            
            userId: req.user.id,
            companyId: req.user.companyId,
    })
    res.status(200).send(vacancy)
}

const getMyVacancies = async (req, res) => {
    const vacancies = await Vacancy.findAll({
        where: {
            companyId: req.user.companyId
        }
    })
    res.status(200).send(vacancies)
}

const getVacancy = async (req, res) => {
    const vacancy = await Vacancy.findByPk(req.params.id,{
        include: [{
            model: Company,
            as: "company"
        },     
        ]
    })
    res.status(200).send(vacancy)
}

module.exports = {
    createVacancy,
    getMyVacancies,
    getVacancy
}