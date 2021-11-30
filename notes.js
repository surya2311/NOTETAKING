const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.find((note) => note.title === title)
  if (!duplicateNotes) {
    notes.push({
      title,
      body,
    })
    saveNotes(notes)
  } else {
    console.log(chalk.red.inverse('Note title already exists'))
  }
}

const loadNotes = () => {
  try {
    const dataJSON = fs.readFileSync('1_notes.json').toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('1_notes.json', dataJSON)
  console.log(chalk.green.inverse('filed saved'))
}

const listNote = () => {
  const notes = loadNotes()
  notes.forEach((note) => {
    console.log(note.title)
  })
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  console.log(notesToKeep)
  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep)
    console.log(chalk.green.inverse('successfully removed'))
  } else {
    console.log(chalk.red.inverse('notes not exist'))
  }
}

const readNote = (title) => {
  const notes = loadNotes()
  const noteToRead = notes.find((note) => note.title === title)
  console.log(chalk.green.bold.inverse('Title : ' + noteToRead.title))
  console.log(chalk.yellow('Body : ' + noteToRead.body))
}

module.exports = {
  addNote,
  removeNote,
  listNote,
  readNote,
}
