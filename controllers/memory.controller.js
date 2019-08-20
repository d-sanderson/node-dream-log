const Memory = require('../models/memory.model');

// controllers/products.js
exports.memory_create = function (req, res, next) {
  let memory = new Memory(
      {
          name: req.body.name,
          date: req.body.date,
          description: req.body.description,
          whowasthere: req.body.whowasthere,
          importance: req.body.importance,

      }
  );

  memory.save(function (err) {
      if (err) {
          return next(err);
      }
      res.send('Memory Created successfully')
  })
};