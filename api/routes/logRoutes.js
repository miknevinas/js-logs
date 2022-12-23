'use strict';


module.exports = function(app) {
  let logController = require('../controllers/logController')

  app.route('/logs/:filename?/:lines?/:keyword?')
    .get(logController.getLogs)
};
