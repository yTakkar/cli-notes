const bQ = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter Title..'
  },
  {
    type: 'input',
    name: 'content',
    message: 'Enter Content..'
  }
]

const getQ = {
  type: 'input',
  name: 'value',
  message: 'Enter title/content of the note..'
}

const dltQ = {
  type: 'input',
  name: 'title',
  message: 'Enter title of the note to delete..'
}

const updQ = [
  {
    type: 'input',
    name: 'search',
    message: 'Enter title of the note to update..'
  },
  ...bQ,
]

module.exports = {
  bQ,
  getQ,
  dltQ,
  updQ,
}
