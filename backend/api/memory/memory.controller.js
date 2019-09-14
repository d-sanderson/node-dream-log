const Memory = require('./memory');

module.exports = {
  getMemories: (req, res, next) => {
    Memory.find({})
    .populate('owner', '-password')
    .exec()
    .then(function(mems){
      res.json({success : true, data: mems});
    }, function(err){
      next(err);
    });
  },
  updateMemory: (req, res) => {
    const { id, update } = req.body;
    Memory.findByIdAndUpdate(id, update, (err) => {
      if(err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  },
  deleteMemory: (req, res) => {
    const { id } = req.body;
    console.log(req.body)
    Memory.findByIdAndRemove(id, (err) => {
      if(err) return res.send(err);
      return res.json({ success: true });
    })
  },
  post: function(req, res, next) {
    let mem = req.body;
    mem.owner = req.user._id;
    Memory.create(mem)
      .then(function(data) {
        res.json(data);
      }, function(err) {
        console.error(err);
        next(err);
      });
  },
}