const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');


router.get('/about', validateSession, function(req, res){
    res.send('Maybe I can get the hang of this!')
});



/* *********************
****CREATE IN LOG****
**********************/

router.post('/log/', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
})


/* ********************
*** GET ALL ENTRIES
********************* */
router.get("/", (req, res) => {
    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

/* *****************************
*** GET ALL LOGS BY INDIVIDUAL USER ***
***************************** */
router.get('/log/', validateSession, (req, res) =>{
    let userid = req.user.id
    Log.findAll({
        where: {owner_id: userid}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

/* ****************************
*** GET LOGS BY ID ***
***************************** */
router.get('/log/:id', function (req, res) {
    let userid = req.params.log;

    Log.findAll({
        where: {log: log}
    })
    .then(logs => res.status(500).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

/* **********************
 LOG ENTRY PUT METHOD
*********************** */
router.put("/log/:id", validateSession, function (req, res) {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Log.update(updateLogEntry, query)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({error: err}));
});

/* ***********************
Delete a Log Entry DELETE
************************* */
router.delete("/log/:id", validateSession, function(req, res) {
    const query = { where: { id: req.params.id, owner_id: req.user.id}};

    Log.destroy(query)
    .then(() => res.status(200).json({message: "Log Entry Removed"}))
    .catch((err) => res.status(500).json({ error: err}));
});


module.exports = router; 