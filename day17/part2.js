'use strict'

const fs = require('fs');
const lines = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(row => row.split('').map(v => v === '.' ? false : true));

const cube = [[lines]]
/* 
  cube will look like
  [ [ [ [ false, true, false ], [ false, false, true ], [ true, true, true ] ] ] ]
          \_x_/  \_x_/  \_x_/     \_x_/  \_x_/  \_x_/    \_x_/  \_x_/ \_x_/  - columns/cells
           \_______y_______/       \_______y_______/      \_______y______/   - rows
            \______________________________z____________________________/    - slices
             \_____________________________w___________________________/     - twilight zone
  cube[w][z][y][x]
  cube[0][0][0][0] === false
  cube[0][0][1][2] === true
*/
let sublength = cube[0][0].length


const findActiveNeighbors = (myCube, windex, zindex, yindex, xindex) => {
  let count = 0
  const tmax = windex + 1 > myCube.length - 1 ? myCube.length - 1 : windex + 1
  const smax = zindex + 1 > myCube[0].length - 1 ? myCube[0].length - 1 : zindex + 1
  const rmax = yindex + 1 > sublength - 1 ? sublength - 1 : yindex + 1
  const cmax = xindex + 1 > sublength - 1 ? sublength - 1 : xindex + 1
  const tmin = windex === 0 ? 0 : windex - 1
  const smin = zindex === 0 ? 0 : zindex - 1
  const rmin = yindex === 0 ? 0 : yindex - 1
  const cmin = xindex === 0 ? 0 : xindex - 1

  for(let ti = tmin; ti <= tmax; ti += 1) {
    for(let si = smin; si <= smax; si += 1) {
      for(let ri = rmin; ri <= rmax; ri += 1) {
        for( let ci = cmin; ci <= cmax; ci += 1) {
          if(ti === windex && si === zindex && ri === yindex && ci === xindex) continue
          if(myCube[ti][si][ri][ci]) count += 1
        }
      }
    }
  }
  return count
}

let newYTemplate = Array.from({length: sublength}, () => false)
let newZTemplate = Array.from({length: sublength}, () => [...newYTemplate])
let newWTemplate = Array.from({length: sublength}, () => [...newZTemplate])

let theCube = []
for(let i = 0; i < sublength; i += 1) {
  theCube.push(newZTemplate)
  if(sublength / i === 2) {
    theCube.push(cube[0][0])
    i += 1
  }
}
theCube = [newWTemplate, theCube, newWTemplate]

for(let loop = 0; loop < 6; loop += 1) {
  theCube.forEach((twilight, windex) => {
    twilight.forEach((slice, zindex) => {
      console.log('z=', zindex, 'w=', windex)
      slice.forEach((row, yindex) => {
        console.log(row.map(v=> v ? '#' : '.').join('')) 
      })
      console.log('')
    })
  })

  sublength += 2
  newYTemplate = Array.from({length: sublength}, () => false)
  newZTemplate = Array.from({length: sublength}, () => [...newYTemplate])
  newWTemplate = Array.from({length: sublength}, () => [...newZTemplate])

  const newCube = []
  newCube.push([...newWTemplate])
  theCube.forEach(w => {
    const newW = []
    newW.push([...newZTemplate])
    w.forEach(z => {
      const newZ = []
      newZ.push(newYTemplate)
      z.forEach(y => {
        const newY = []
        newY.push(false)
        newY.push(...y)
        newY.push(false)
        newZ.push(newY)
      })
      newZ.push(newYTemplate)
      newW.push(newZ)
    })
    newW.push([...newZTemplate])
    newCube.push(newW)
  })
  newCube.push([...newWTemplate])

  const aCube = newCube.map((twilight, windex) => 
    twilight.map((slice, zindex) => 
      slice.map((row, yindex) => 
        row.map((cell, xindex) => {
          const activeNeighbors = findActiveNeighbors(newCube, windex, zindex, yindex, xindex)
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
  )

  theCube = aCube
}

console.log(theCube.join().match(/true/ig).length)