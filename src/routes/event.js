const router = require('express').Router()
const verify = require('./verifyToken')
const Event = require('../models/Event')
const {
    nubilesTypeEnum
} = require("../helpers/enums/nubilesTypeEnum")
const {
    guestsTypeEnum
} = require("../helpers/enums/guestsTypeEnum")
const {
    createEventValidation
} = require('../helpers/validation');

router.get('/get', verify, async (req, res) => {
    try {
        const userEvents = await Event.find({userId: req.user._id})
        res.send(userEvents)
    } catch (err) {

    }
})

router.get('/getAll', async (req, res) => {
    try {
        const events = {
            allEvents: [],
            count: 0
        }
        const userEvents = await Event.find()
        events.allEvents = userEvents,
        Event.countDocuments({}, function(err, count) {
            events.count = count
        })
        res.send(events)
    } catch (err) {

    }
})

router.post('/create', verify, async (req, res) => {

    //Validation of the data
    const {
        error
    } = createEventValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Create a new Event
    const event = new Event({
        userId: req.user._id,
        eventDateTime: req.body.eventDateTime
    });

    req.body.nubiles.forEach(nubile => {
        if (nubile.nubileType.toUpperCase() === nubilesTypeEnum.BRIDE) {
            nubile.nubileType = nubilesTypeEnum.BRIDE
        }

        if (nubile.nubileType.toUpperCase() === nubilesTypeEnum.GROOM) {
            nubile.nubileType = nubilesTypeEnum.GROOM
        }
        event.nubiles.push(nubile)
    });

    req.body.guests.forEach(guest => {
        guest.guestType = guest.guestType.toUpperCase()
        switch (guest.guestType) {
            case guestsTypeEnum.REGULAR:
                guest.guestType = guestsTypeEnum.REGULAR
                break;
            case guestsTypeEnum.GROOMSMAN:
                guest.guestType = guestsTypeEnum.GROOMSMAN
                break;
            case guestsTypeEnum.MAID:
                guest.guestType = guestsTypeEnum.MAID
                break;
            case guestsTypeEnum.GROOMSMOTHER:
                guest.guestType = guestsTypeEnum.GROOMSMOTHER
                break;
            case guestsTypeEnum.GROOMSFATHER:
                guest.guestType = guestsTypeEnum.GROOMSFATHER
                break;
            case guestsTypeEnum.BRIDESMOTHER:
                guest.guestType = guestsTypeEnum.BRIDESMOTHER
                break;
            case guestsTypeEnum.BRIDESFATHER:
                guest.guestType = guestsTypeEnum.BRIDESFATHER
                break;
            default:
                guest.guestType = guestsTypeEnum.REGULAR
                break;
        }
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