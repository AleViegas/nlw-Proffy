const database = require('sqlite-async')
// chamando o mudolo do sql lite

function execute(db) {
    // função que criara as tabelas (metodo que armazena os dados)

    // V responsavel pela crição das tabelas
    // proffys: id - name - avatar - whatssap - bio
    // classes: id - subject - cost - proffy_id
    // class_schedule: id - class id - weekday - time_from - time_to

    // Recebe apenas linguagem sql
    // banco de dados relacional (relações entre tabelas)
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );

    `)
}

module.exports = database.open(__dirname + "/database.sqlite").then(execute)
// criando o banco de dados e executando a função execute somente apos a abertura do banco
// exportei tudo ou seja posso chamar no require

