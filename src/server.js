
// servidor
const express = require("express") // aparentemente é framework de server
const server = express()

const { pageLanding, pageStudy, pageGiveClasses, saveClasses, pageSuccess } = require("./pages")

// template engine, adicionar varias funcionalidades para o html
// configuração do nunjucks
const ale = null
const nunjucks = require("nunjucks")
const { query } = require("express")
// recebe o diretorio das htmls, a função do server e no cache
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// inicio e configuração
server
// receber os dados atraves do rec.body
.use(express.urlencoded({ extended: true }))
// configurar arquivos estaticos (css, scripts, imagens)
.use(express.static("public")) // determinando a nova root
// rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.get("/success", pageSuccess)
// start
.listen(5500)

