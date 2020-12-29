'use strict'

const fs = require('fs');
const lines = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(row => row.split('').map(v => v === '.' ? false : true));

const cube = [lines]
/* 
  cube will look like
  [ [ [ false, true, false ], [ false, false, true ], [ true, true, true ] ] ] 
        \_x_/  \_x_/  \_x_/     \_x_/  \_x_/  \_x_/    \_x_/  \_x_/ \_x_/  - columns/cells
         \_______y_______/       \_______y_______/      \_______y______/   - rows
          \______________________________z____________________________/    - slices
  cube[z][y][x]
  cube[0][0][0] === false
  cube[0][1][2] === true
*/
let sublength = cube[0].length

let theCube = [...cube]

const findActiveNeighbors = (myCube, sindex, rindex, cindex) => {
  let count = 0
  const smax = sindex + 1 > myCube.length - 1 ? myCube.length - 1 : sindex + 1
  const rmax = rindex + 1 > sublength - 1 ? sublength - 1 : rindex + 1
  const cmax = cindex + 1 > sublength - 1 ? sublength - 1 : cindex + 1
  const smin = sindex === 0 ? 0 : sindex - 1
  const rmin = rindex === 0 ? 0 : rindex - 1
  const cmin = cindex === 0 ? 0 : cindex - 1

  for(let si = smin; si <= smax; si += 1) {
    for(let ri = rmin; ri <= rmax; ri += 1) {
      for( let ci = cmin; ci <= cmax; ci += 1) {
        if(si === sindex && ri === rindex && ci === cindex) continue
        if(myCube[si][ri][ci]) count += 1
      }
    }
  }
  return count
}

for(let loop = 0; loop < 6; loop += 1) {
  theCube.forEach((slice, sindex) => {
    console.log('z=', sindex)
    slice.forEach((row, rindex) => {
      console.log(row.map(v=> v ? '#' : '.').join('')) 
    })
    console.log('')
  })

  sublength += 2

  const newY = Array.from({length: sublength} , (v) => false)
  const newZ = Array.from({length: sublength}, (v) => [...newY])

  const newCube = []
  newCube.push([...newZ])
  theCube.forEach((slice, index) => {
    const newSlice = []
    newSlice.push(newY)
    slice.forEach(row => {
      const newRow = []
      newRow.push(false)
      newRow.push(...row)
      newRow.push(false)  
      newSlice.push(newRow)
    })
    newSlice.push(newY)
    newCube.push(newSlice)
  })
  newCube.push([...newZ])

  const aCube = newCube.map((slice, sindex) => 
    slice.map((row, rindex) => 
      row.map((cell, cindex) => {
        const activeNeighbors = findActiveNeighbors(newCube, sindex, rindex, cindex)
        if(cell) {
          if (activeNeighbors === 2 || activeNeighbors === 3) return true
          return false
        }
        if(!cell) {
          if (activeNeighbors === 3) return true
          return false
        }
      })
    )
  )

  theCube = aCube
}

console.log(theCube.join().match(/true/ig).length)