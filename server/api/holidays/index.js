'use strict';

var express = require('express');
var controller = require('./holidays.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/:holidayid', controller.deleteHoliday);
router.post('/:dd/:mm/:yyyy', controller.addHoliday);


module.exports = router;
