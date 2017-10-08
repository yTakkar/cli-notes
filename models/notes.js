const
  mongoose = require('mongoose'),
  hl = require('handy-log'),
  db = mongoose.connect('mongodb://localhost/notes'),
  { toLower, log } = require('./utils')

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    set: toLower,
  },
  content: {
    type: String,
    required: true
  },
  created: {
    type: String,
    required: true
  }
}, { versionKey: false })

const notes = mongoose.model('notes', notesSchema)

const listNotes = () => {
  notes.find({}, (err, notes) => {
    if (err) hl.error(err.errmsg)
    console.log(notes)
    hl.success(`${notes.length} notes!!`)
    db.disconnect()
  })
}

const addNote = note => {
  notes.create(note, err => {
    let { code, errmsg } = err
    code == 11000 ? hl.error('Title already exists!!') : err ? hl.error(errmsg) : hl.rainbow('Note Added!!')
    db.disconnect()
  })
}

const getNote = value => {
  let iValue = value.toLowerCase()
  let find = { $or: [{ title: iValue }, { content: iValue }] }
  notes.find(find, (err, [{ title, content, created }]) => {
    if (err) hl.error(err.errmsg)
    log(title, content, created)
    db.disconnect()
  })
}

const deleteNote = title => {
  notes.findOneAndRemove({ title }, err => {
    err ? hl.error(err.errmsg) : hl.success('Note Deleted!!')
    db.disconnect()
  })
}

const updateNote = (title, upt) => {
  notes.findOneAndUpdate({ title }, upt, err => {
    err ? hl.error(err.errmsg) : hl.success('Note updated!!')
    db.disconnect()
  })
}

module.exports = {
  listNotes,
  addNote,
  getNote,
  deleteNote,
  updateNote,
}
