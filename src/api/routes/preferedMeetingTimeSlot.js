var express = require('express');
var router = express.Router();
var db = require('../../models');
var checkAuth = require('../../middleware/check-auth')

router.put('/:timeSlotId', async function (req, res) {
    try {
        let { timeSlotId } = req.params;
        let { status } = req.body;
        let fetchPreferedDateAndTimeslot = await db.PreferedDateAndTimeslot.findOne({
            where: {
                id: timeSlotId
            }
        });
        if (fetchPreferedDateAndTimeslot === null) {
            res.json({
                "status": "failed",
                "message": "fetchPreferedDateAndTimeslot failed"
            })
        }
        let updatePreferedDateAndTimeslot = await db.PreferedDateAndTimeslot.update({
            meeting_requested_user_id: fetchPreferedDateAndTimeslot.meeting_requested_user_id,
            date: fetchPreferedDateAndTimeslot.date,
            time: fetchPreferedDateAndTimeslot.time,
            status: status

        }, {
            where: {
                id: timeSlotId
            },
            returning: true
        }
        )
        const fetchPreferedDateAndTimeslots = await db.PreferedDateAndTimeslot.findAll({ where: { meeting_requested_user_id: fetchPreferedDateAndTimeslot.meeting_requested_user_id } })
        res.status(200).json({
            'status': 'success',
            'payload': fetchPreferedDateAndTimeslots,
            'message': 'PreferedDateAndTimeslots updated successfully'
        })

    } catch (error) {
        console.log("Error=====>" + error)
        res.status(500).json({
            'status': 'failed',
            'payload': {},
            'message': 'PreferedDateAndTimeslot failed to update'
        })
    }
}
)

module.exports = router;