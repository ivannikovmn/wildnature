const Apply = require('./Apply')
const {NEW, DECLINED, INVITATION} = require('./utils')
const sendEmail = require('../utils/sendMail')
const Vacancy = require('../vacancy/models/Vacancy')
const Resume = require('../resume/models/Resume')
const User = require('../auth/User')
const Company = require('../auth/Company')
const { Op } = require('sequelize')

const createApply = async (req, res) => {
    try {        
        const apply = await Apply.create({
            resumeId: req.body.resumeId,
            vacancyId: req.body.vacancyId,
            status: NEW
        })

        const resume = await Resume.findByPk(req.body.resumeId)
        const vacancy = await Vacancy.findByPk(req.body.vacancyId)
        const user = await User.findByPk(vacancy.userId)
        sendEmail(user.email, `Новый отклик на мероприятие ${vacancy.name}`, `
        Имя участника: ${resume.first_name}
        Фамилия участника: ${resume.last_name}        
        `)

        res.status(200).send(apply)        
    } catch (error) {
        res.status(500).send(error)   
    }
} 

const getEmployeeAplies = async(req, res) => {
    try {
        const resumes = await Resume.findAll({
            where: {
                userId: req.user.id
            }
        })

        const ids = resumes.map(item => item.id)

        const applies = await Apply.findAll({
            where: {
                resumeId: { [Op.in]: ids}
            },
            include: {
                model: Vacancy,
                as: 'vacancy'
            }
        })
        res.status(200).send(applies)        
    } catch(error){
        res.status(500).send(error)
    }
}

const deleteApply = async (req, res) => {
    try{
        await Apply.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).end()
    } catch(error){
        res.status(500).send(error)
    }    
}

const acceptEmployee = async (req, res) => {
    try{
        await Apply.update(
            {
                status: INVITATION
            },
            {
                where: {
                    id: req.body.applyId
                }
        })
        const apply = await Apply.findByPk(req.body.applyId)
        const vacancy = await Vacancy.findByPk(apply.vacancyId)
        const resume = await Resume.findByPk(apply.resumeId)
        const user = await User.findByPk(resume.userId)
        const company = await Company.findByPk(req.user.companyId)
        const certificateUrl =`${process.env.APP_URL}/certificate/${resume.userId}/${vacancy.id}`

        sendEmail(user.email, `Вы были на мероприятии ${vacancy.name}`, `
        Компания: ${company.name}
        Адрес: ${company.address}
        Спикер: ${req.user.full_name}

        Ваш сертификат:
        ${certificateUrl}
        `) 
        res.status(200).end()
    } catch(error){
        res.status(500).send(error)
    }      
}

const declineEmployee = async (req, res) => {
    try{    
        await Apply.update(
            {
                status: DECLINED
            },
            {
                where: {
                    id: req.body.applyId
                }
        })

        const apply = await Apply.findByPk(req.body.applyId)
        const vacancy = await Vacancy.findByPk(apply.vacancyId)
        const resume = await Resume.findByPk(apply.resumeId)
        const user = await User.findByPk(resume.userId)
        const company = await Company.findByPk(req.user.companyId)

        sendEmail(user.email, `К сожалению мы вас не увидели на мероприятии ${vacancy.name}`, `
            Компании: ${company.name}

        `)     
        res.status(200).end()
    } catch(error){
        res.status(500).send(error)
    }         
}

const getVacancyApplies = async (req, res) => {
    try{     
        const options = {
            vacancyId: req.params.id
        }

        if(req.query.status && (req.query.status === NEW || req.query.status === INVITATION || req.query.status === DECLINED)){
            options.status = req.query.status
        }

        const applies = await Apply.findAll({
            where: options,        
            include: {
                model: Resume,
                as: 'resume'
            }
        })
        res.status(200).send(applies)
    } catch(error){
        res.status(500).send(error)
    }      
}

module.exports = {
    createApply,
    getEmployeeAplies,
    deleteApply,
    acceptEmployee,
    declineEmployee,
    getVacancyApplies
}