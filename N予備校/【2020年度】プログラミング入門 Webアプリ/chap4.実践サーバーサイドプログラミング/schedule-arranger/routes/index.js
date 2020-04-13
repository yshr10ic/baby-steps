'use strict';

const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

/* GET home page. */
router.get('/', function(req, res, next) {
  const title = '予定調整くん';
  if (req.user) {
    Schedule.findAll({
      where: {
        createdBy: req.user.id
      },
      order: [['updatedAt', 'DESC']]
    }).then(scedules => {
      res.render('index', {
        title: title,
        user: req.user,
        schedules: scedules
      });
    });
  } else {
    res.render('index', { title: title, user: req.user });
  }
});

module.exports = router;
