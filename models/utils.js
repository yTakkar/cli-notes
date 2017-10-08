const timeAgo = require('handy-timeago')
const hl = require('handy-log')

const toLower = v => v.toLowerCase()

const log = (title, content, created) => {
  hl.success(title)
  hl.success(content)
  hl.success(timeAgo(created))
}

module.exports = {
  toLower,
  log
}
