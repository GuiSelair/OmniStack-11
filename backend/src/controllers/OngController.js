
const crypto = require("crypto")

const database = require("../database/connection.js")

module.exports = {
    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body
        const id = crypto.randomBytes(4).toString("HEX")    // GERENDO UM ID UNICO
        await database("ongs").insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        return response.json({ id })
    },

    async index(request, response){
        const ongs = await database("ongs").select("*")
        return response.status(200).json(ongs)
    }
}