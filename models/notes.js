const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const
  { success, error, rainbow } = require('handy-log'),
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

const exit = () => {
  db.disconnect()
  process.exit()
}

const listNotes = () => {
  notes.find({}).sort({ created: -1 }).exec((err, notes) => {
    if (err) error(err.errmsg)
    console.log(JSON.stringify(notes, '', 2))
    success(`${notes.length} notes found!!`)
    exit()
  })
}

const addNote = note => {
  notes.create(note, err => {
    if (err) {
      let { code, errmsg } = err
      code == 11000 ?
        error('Title already exists!!')
        : err ? error(errmsg)
          : null
    }
    rainbow('Note Added!!')
    exit()
  })
}

const getNote = value => {
  notes.find(
    { title: value.toLowerCase() },
    (err, [{ title, content, created }]) => {
      if (err) error(err.errmsg)
      log(title, content, created)
      exit()
    })
}

const deleteNote = title => {
  notes.findOneAndRemove({ title }, err => {
    err ? error(err.errmsg) : rainbow('Note deleted!!')
    db.disconnect()
  })
}

const updateNote = ({ search, title, content }) => {
  notes.findOneAndUpdate({ title: search }, { title, content }, err => {
    err ? error(err.errmsg) : rainbow('Note updated!!')
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
