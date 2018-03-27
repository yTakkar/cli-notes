#!/usr/bin/env node

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
const {
  bQ,
  getQ,
  dltQ,
  updQ,
} = require('./models/questions')

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
    let answer = await prompt(bQ)
    addNote({ ...answer, created: new Date().getTime() })
  })

// Get a note
program
  .command('getNote')
  .alias('g')
  .description('Get note!!')
  .action(async () => {
    let { value } = await prompt(getQ)
    getNote(value)
  })

// Delete a note
program
  .command('deleteNote')
  .alias('d')
  .description('Delete note!!')
  .action(async () => {
    let { title } = await prompt(dltQ)
    deleteNote(title)
  })

// Update a note
program
  .command('updateNote')
  .alias('u')
  .description('Update note!!')
  .action(async () => {
    let answer = await prompt(updQ)
    updateNote(answer)
  })

program.parse(process.argv)
