const timeAgo = require('handy-timeago')
const hl = require('handy-log')

const toLower = v => v.toLowerCase()

const log = (title, content, created) => {
  hl.success(`Title: ${title}`)
  hl.success(`Content: ${content}`)
  hl.success(`Created: ${timeAgo(created)}`)
}

module.exports = {
  toLower,
  log
}
