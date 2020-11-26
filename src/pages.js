const database = require("./database/db")

const  {subjects, weekdays, getSubject, convertHoursToMinutes} = require("./utils/format")
const createProffy = require("./database/createProffy")

// functions

function pageLanding(req, res) {
    return res.render("index.html")
    // main - dir = diretorio
}

async function pageStudy(req, res) {
    const filters = req.query
    // query(), função do express que pega os dados enviados do site 
    
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", {filters, subjects, weekdays})
        // o botao do index retorna /study e aqui o /study é trabalhado        
    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

    
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `

    try {
        const db = await database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html", { proffys, subjects, weekdays, filters })

    } catch (error) {
        console.log(error)
    }

}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", {subjects, weekdays})
    // caso nenhum dado foi enviado
}

async function saveClasses(req, res) {
    // caso algum dado foi enviado
    // const data = req.body
    // pegar os dados do formulario, se for get = query, post = body

    const createProffy = require("./database/createProffy")

    // tabelas
    // proffys: id - name - avatar - whatssap - bio
    // classes: id - subject - cost - proffy_id
    // class_schedule: id - class_id - weekday - time_from - time_to

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio

    }
    
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index]),
        }
    })

    try {
        const db = await database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("./study" + queryString)        
    } catch (error) {
        console.log(error)
    }

}

function pageSuccess(req, res) {
    return res.render("success.html")
}


module.exports = { pageLanding, pageStudy, pageGiveClasses, saveClasses, pageSuccess }