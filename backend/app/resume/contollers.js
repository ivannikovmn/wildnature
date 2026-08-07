const Resume = require('./models/Resume')

const createResume = async (req, res) => {
    const resume = await Resume.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        userId: req.user.id
    })

    res.status(200).send(resume);
}

module.exports = {
    createResume
}