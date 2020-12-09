let counter = 0
const characters = ['Luke Skywalker', 'Rey Skywalker', 'Jar Jar Binks', 'Grogu']

characters.forEach((c) => {
  console.log(c)
  counter += 1

  console.log('works with the debugger too!')
})

console.warn(counter, 'total characters')
console.log('a new change')
