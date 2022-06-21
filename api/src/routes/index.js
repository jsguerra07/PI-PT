const { Router } = require('express');

const jwt = require("jsonwebtoken");
const bcrytp = require("bcrypt")
require("dotenv").config();

const auth = require("../middlewares/auth")

const { Ticket, User } = require("../db");

const router = Router();

//+++++++++++++++++++AUTH++++++++++++++++++++

//+++++++++++++++++++USERS++++++++++++++++++++

router.post("/signup", async (req, res) => {
    try {
        const { name, lastName, email } = req.body

        let password = await bcrytp.hashSync(req.body.password, 10)

        const newUser = await User.findOrCreate({
            where: {
                name,
                lastName,
                email,
                password
            },
        })
        
        const token = jwt.sign({ id: newUser[0].id }, process.env.SECRET, { expiresIn: "20m" })
        res.json({ userAuth: true, token })
    } catch (error) {
        console.error(error)
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (user.length === 0) {
            res.json("invalid email")
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: "20m" })
                res.json({ userAuth: true, token })
            } else {
                res.status(4001).json({ msg: "invalid password" })
            }
        }
    } catch (error) {
        res.json(error)
    }
})

router.get("/user", (req, res) => {

    res.json("user")
})


//+++++++++++++++++++TICKETS++++++++++++++++++++

router.get("/tickets", auth ,async (req, res) => {
    try {
        const allTicketsDb = await Ticket.findAll()
        /* const allTickets = allTicketsDb.data */
        //console.log(allTicketsDb)
        /* console.log(allTickets) */
        //res.send("list of tickets");
        res.send(allTicketsDb)
    } catch (error) {
        res.send(error)
    }
})

router.post("/tickets/new", async (req, res) => {
    const { id } = req.params
    const { name, comments, status } = req.body

    try {

        const result = await Ticket.findOrCreate({
            where: {
                name: name,
                comments: comments,
                status: status,
            }
        })
        //console.log(req.body)
        res.send(result);

    } catch (error) {
        res.send(error)
    }
})


router.put("/tickets/:id", async (req, res) => {
    const { id } = req.params
    const { name, comments, status } = req.body
    console.log(id, name, comments, status)

    const updatedTicket = await Ticket.update(
        {
            name: name,
            comments: comments,
            status: status,
        },
        {
            where: {
                id: id,
            },
            returning: true, plain: true
        })

    console.log(updatedTicket)

    res.json("updating of tickets");
})

router.delete("/tickets/:id", async (req, res) => {
    const { id } = req.params

    try {

        const deletedTicket = await Ticket.destroy({
            where: {
                id: id,
            }
        })

        deletedTicket === 1 ? res.sendStatus(204) : res.send("Ticket not found")

    } catch (error) {
        res.send(error)
    }

})

router.get("/tickets/:id", async (req, res) => {

    const { id } = req.params

    try {
        const ticketDb = await Ticket.findOne({
            where: {
                id: id,
            }
        })
        //console.log(req.params)

        ticketDb !== null ? res.send(ticketDb) : res.status(404).send("Ticket not found");

    } catch (error) {
        res.send(error)
    }
})


module.exports = router;
