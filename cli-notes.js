#! usr/bin/env node

// Requiring needed packages & files
const program = require('commander')
const { prompt } = require('inquirer')
const {
  listNotes,
  addNote,
  getNote,
  deleteNote,
  updateNote,
} = require('./models/notes')
const questions = require('./models/questions')

// Program Basics
program
  .version('1.0.0')
  .description('A CLI App for notes!!')

// List all notes
program
  .command('listNotes')
  .alias('l')
  .description('List Notes!!')
  .action(() => listNotes() )

// Add a note
program
  .command('addNote')
  .alias('a')
  .description('Add a note!!')
  .action(async () => {
    let answer = await prompt(questions)
    let newNote = { ...answer, created: new Date().getTime() }
    addNote(newNote)
  })

// Get a note
program
  .command('getNote <name>')
  .alias('g')
  .description('Get note!!')
  .action(name => getNote(name) )

// Delete a note
program
  .command('deleteNote <title>')
  .alias('d')
  .description('Delete note!!')
  .action(title => deleteNote(title) )

// Update a note
program
  .command('updateNote <title>')
  .alias('u')
  .description('Update note!!')
  .action(async title => {
    let answer = await prompt(questions)
    updateNote(title, answer)
  })

program.parse(process.argv)
