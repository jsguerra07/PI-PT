const { Ticket,User } = require("../src/db");
const { ticket, user } = require("./capdMock");


async function createTicket(ticket) {
    try {
        const { name, comments, status } = ticket

        const newTicket = await Ticket.findOrCreate({
            where: {
                name,
                comments,
                status,
            }
        })

    } catch (error) {
        console.log(error)
    }

}

async function createUser(user) {
    try {
        const { name, lastName, email, password } = user

        const newUser = await User.findOrCreate({
            where: {
                name,
                lastName,
                email,
                password
            }
        })

    } catch (error) {
        console.log(error)
    }

}
module.exports = {
    createTicket,
    createUser
}