const professoras = require("../model/professoras.json")
const fs = require('fs')

exports.get = (req, res) => {
    res.status(200).send(professoras)
}

// exports.getSemCpf = (req, res) => {
//     const arrProfas = []
//     for (let i=0; i<professoras.length; i++) {
//         const semCpf = {}
//         semCpf.id = professoras[i].id
//         semCpf.nome = professoras[i].nome
//         semCpf.especialidade = professoras[i].especialidade
//         semCpf.signo = professoras[i].signo
//         arrProfas.push(semCpf)
//     }
//     res.status(200).send(arrProfas)
// }

// exports.getSemCpf = (req, res) => {
//     const profSemCpf = professoras.map(item => {
//         item.cpf = '********'
//         return item
//     })
//     res.status(200).send(profSemCpf)'
// }

exports.getSemCpf = (req, res) => {
    const profSemCpf = professoras.map(item => {
        delete item.cpf
        return item
    })
    res.status(200).send(profSemCpf)
}

exports.getById = (req, res) => {
    const id = req.params.id
    const profSemCpf = professoras.map(item => {
        delete item.cpf
        return item
    })
    const profas = profSemCpf.find(prof => prof.id == id)
    res.status(200).send(profas)

}

exports.post = (req, res) => {
    const { id, nome, especialidade, signo, cpf } = req.body;
    professoras.push({ id, nome, especialidade, signo, cpf });

    fs.writeFile("./src/model/professoras.json", JSON.stringify(professoras), "utf8", function (err) {
        if (err) {
            return res.status(500).send({ message:err });
        }
        console.log("The file was saved!");
    });
    return res.status(201).send(professoras)
}
