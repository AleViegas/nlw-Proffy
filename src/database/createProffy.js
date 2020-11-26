module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    // função que vai colocar os dados nas respectivas tabelas
    // função que adiciona os dados da 1º tabela e retorna o proffy_id
    // V SQL    
    const insertedProffy = await db.run(`
            INSERT INTO proffys (
                name, 
                avatar, 
                whatsapp, 
                bio
            ) VALUES (
                "${proffyValue.name}",
                "${proffyValue.avatar}",
                "${proffyValue.whatsapp}",
                "${proffyValue.bio}"
            );
        `)

    const proffy_id = insertedProffy.lastID
    // constante que estancia o proffy_id para usar

    // função que adiciona os dados na 2º tabela
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );       
        `)
    
    const class_id = insertedClass.lastID
    // constante que estancia o class_id para usar
    
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    await Promise.all(insertedAllClassScheduleValues)

}