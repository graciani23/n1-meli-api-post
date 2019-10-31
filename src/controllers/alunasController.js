const alunas = require("../model/alunas.json")
const fs = require('fs')

exports.get = (req, res) => {
    console.log(req.url)
    res.status(200).send(alunas)
}

exports.getById = (req, res) => {
    const id = req.params.id
    if (id < 1 && id > 17) {
        res.send('Id maior que a quantidade de garotas')
    }
    console.log(id)
    res.status(200).send(alunas.find(aluna => aluna.id == id))
}

exports.getBooks = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(aluna => aluna.id == id)

    if (!aluna) {
        res.send('Não encontrei esta garota')
    }

    const livros = aluna.livros
    const livrosLidos = livros.filter(livro => livro.leu == 'true')
    const titulo = livros.map(livro => livro.titulo)

    res.status(200).send(livrosLidos)
}

exports.getSp = (req, res) => {
    const sp = alunas.filter(nascSP => nascSP.nasceuEmSp == 'true')
    const paulista = sp.map(nascSP => nascSP.nome)


    res.status(200).send(paulista)
}

function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
    const now = new Date()
    const anoAtual = now.getFullYear()
    const mesAtual = now.getMonth() + 1
    const hoje = now.getDate()

    let idade = anoAtual - anoDeNasc

    if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
        idade -= 1
    }
    return idade
}


exports.getIdade = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(aluna => aluna.id == id)
    const anoNascimento = aluna.dateOfBirth.split('/')
    const anoNasc = anoNascimento[2]
    const mesNascimento = anoNascimento[1]
    const diaNascimento = anoNascimento[0]
    const idade = calcularIdade(anoNasc, mesNascimento, diaNascimento)
    res.status(200).send({ idade })
}

exports.post = (req, res) => {
    const { nome, dateOfBirth, nasceuEmSp, id, livros } = req.body;
    alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros }); // tratando como array

    // fs precisa do caminho absoluto do arquivo
    fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), "utf8", function (err) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        console.log("The file was saved!");
    });

    return res.status(201).send(alunas)
}

exports.postBooks = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(aluna => aluna.id == id)
    if (!aluna) {
        res.send('Não encontrei essa garota')
    }
    const { titulo, leu } = req.body
    alunas[aluna.id - 1].livros.push({ titulo, leu })

    fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        console.log('The file was saved!')
    })

    res.status(201).send(alunas[aluna.id - 1].livros)
}


