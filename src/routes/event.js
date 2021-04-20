const router = require('express').Router()
const verify = require('./verifyToken')
const Event = require('../models/Event')
const {
    createEventValidation
} = require('../helpers/validation');

router.post('/create', verify, async (req, res) => {

    //Validation of the data
   const {
        error
    } = createEventValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Create a new User
    
    const event = new Event({
        userId: req.user._id,
        eventDateTime: req.body.eventDateTime
    });

    req.body.nubiles.forEach(nubile => {
        event.nubiles.push(nubile)
    });

    req.body.guests.forEach(guest => {
        event.guests.push(guest)
    });

    try {
        await event.save();
        res.send({
            message: "Evento Criado com sucesso!"
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;