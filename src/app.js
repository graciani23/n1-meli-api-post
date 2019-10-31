const express = require("express")
const app = express()

app.all('*', function(req, res, next) {
    console.log('passamos pelo app')
    next()
})
// rota
const index = require('./routes/index')
const alunas = require('./routes/alunasRoute')
const professoras = require('./routes/professorasRoute')

app.use(express.json())

app.use(function(re , res, next) {
    res.header("Access-Control-Allow-Origin", '*')
    res.header(
        "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
        )
    next()
})
app.use('/', index)
app.use("/alunas", alunas)
app.use('/professoras', professoras)

module.exports = app