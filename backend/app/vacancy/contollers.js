const Vacancy = require ('./models/Vacancy')
const Company = require('../auth/Company')

const createVacancy = async (req, res) => {
    const vacancy = await Vacancy.create({
        name: req.body.name,
        about_company: req.body.about_company,
        description: req.body.description,
        event_date: req.body.event_date,
        address: req.body.address,
        branding_photo: req.file
            ? '/vacancy/' + req.file.filename
            : null,
        userId: req.user.id,
        companyId: req.user.companyId,
    });

    res.status(200).send(vacancy);
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

    if(vacancy)
        res.status(200).send(vacancy)
    else res.status(404).send({message: "Vacancy with that id is not found"})
}

const deleteVacancy = async (req, res) => {    
   await Vacancy.destroy({
        where: {
            id: req.params.id,
        }
    })
    res.status(200).end()
}

const editVacancy = async (req, res) => {
    const vacancy = await Vacancy.findByPk(req.body.id);

    await Vacancy.update({
        name: req.body.name,
        about_company: req.body.about_company,
        description: req.body.description,
        event_date: req.body.event_date,
        address: req.body.address,
        branding_photo: req.file
            ? '/vacancy/' + req.file.filename
            : vacancy.branding_photo,
        userId: req.user.id,
        companyId: req.user.companyId,
    }, {
        where: {
            id: req.body.id
        }
    });

    res.status(200).end();
}

module.exports = {
    createVacancy,
    getMyVacancies,
    getVacancy,
    deleteVacancy,
    editVacancy
}