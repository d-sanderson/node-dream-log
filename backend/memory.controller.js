const Memory = require('./memory');

module.exports = {
  getMemories: (req, res) => {
    Memory.find((err, data) => {
      if(err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
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
    const { title } = req.body;
    Memory.findOneAndDelete(title, (err)  => {
      if(err) return res.send(err);
      return res.json({ success: true });
    })
  },
  createMemory: (req, res) => {
    let mem = new Memory();
    const { id, description, people, title, date } = req.body;

    if((!id && id !== 0) || !description) {
      return res.json({
        success: false,
        error: 'INVALID INPUTS'
      });
    }
    mem.description = description;
    mem.title = title;
    mem.people = people;
    mem.id = id;
    mem.date = date;
    mem.save((err) => {
      if(err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  },
}