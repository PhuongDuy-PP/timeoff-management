'use strict';

var express   = require('express'),
    router    = express.Router(),
    Promise   = require('bluebird');

router.all(/.*/, require('../middleware/check_api_key'));

router.get('/time-off/:user_id/', async (req, res) => {
    const dbModel = req.app.get('db_model');

    Promise
      // Get the Leave object for submitted ID
      .try(() => dbModel.Leave.findAll({ where : { userId : req.params['user_id'] }}))
      .then(requested_leave => {
        res.json(requested_leave);
      })
      .catch(error => {
        return `error: ${error}`
      });
});
    
module.exports = router;