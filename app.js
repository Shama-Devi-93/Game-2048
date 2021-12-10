
document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid')
  const resultDisplay = document.getElementById('result')
  const width = 4
  let squares = []
  let score = 0
  //creating a playing board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement('div')
      square.innerHTML = ""
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
  }
  createBoard()
  //generating a random number
  function generate() {
    random_Number = Math.floor(Math.random() * squares.length)
    if (squares[random_Number].innerHTML === "") {
      squares[random_Number].innerHTML = 2
      checkForGameOver()
    } else generate()
  }
  //swipe right
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let one = squares[i].innerHTML
        let two = squares[i + 1].innerHTML
        let three = squares[i + 2].innerHTML
        let four = squares[i + 3].innerHTML
        let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

        let rowFiltered = row.filter(num => num)


        let missing = 4 - rowFiltered.length
        let zeroes = Array(missing).fill("")


        let newRow = zeroes.concat(rowFiltered)


        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]

      }
    }
  }


  //swipe left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let one = squares[i].innerHTML
        let two = squares[i + 1].innerHTML
        let three = squares[i + 2].innerHTML
        let four = squares[i + 3].innerHTML
        let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

        let rowFiltered = row.filter(num => num)


        let missing = 4 - rowFiltered.length
        let zeroes = Array(missing).fill("")


        let newRow = rowFiltered.concat(zeroes)


        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]

      }
    }
  }


  //swipe up
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let one = squares[i].innerHTML
      let two = squares[i + width].innerHTML
      let three = squares[i + (width * 2)].innerHTML
      let four = squares[i + (width * 3)].innerHTML
      let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

      let columnFiltered = column.filter(num => num)
      let miss = 4 - columnFiltered.length
      let zeroes = Array(miss).fill("")
      let newColumn = columnFiltered.concat(zeroes)
      squares[i].innerHTML = newColumn[0]
      squares[i + width].innerHTML = newColumn[1]
      squares[i + (2 * width)].innerHTML = newColumn[2]
      squares[i + (3 * width)].innerHTML = newColumn[3]

    }
  }



  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let one = squares[i].innerHTML
      let two = squares[i + width].innerHTML
      let three = squares[i + (width * 2)].innerHTML
      let four = squares[i + (width * 3)].innerHTML
      let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

      let columnFiltered = column.filter(num => num)
      let miss = 4 - columnFiltered.length
      let zeroes = Array(miss).fill("")
      let newColumn = zeroes.concat(columnFiltered)
      squares[i].innerHTML = newColumn[0]
      squares[i + width].innerHTML = newColumn[1]
      squares[i + (2 * width)].innerHTML = newColumn[2]
      squares[i + (3 * width)].innerHTML = newColumn[3]
    }
  }




  function combinerow() {
    for (let i = 0; i < 15; i++) {
      if ((squares[i].innerHTML === squares[i + 1].innerHTML) && (squares[i].innerHTML != "")) {
        let combined = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
        squares[i].innerHTML = combined
        squares[i + 1].innerHTML = ""
        score += combined


      }
    }
    checkForWin()
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if ((squares[i].innerHTML === squares[i + width].innerHTML) && (squares[i].innerHTML != "")) {
        let combined = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
        squares[i].innerHTML = combined
        squares[i + width].innerHTML = ""
        score += combined

      }
    }
    checkForWin()
  }


  //assigning keyboard keys

  function control(e) {
    if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 37) {
      keyLeft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }
  document.addEventListener('keyup', control)

  function keyRight() {
    moveRight()
    combinerow()
    moveRight()
    generate()
  }

  function keyLeft() {
    moveLeft()
    combinerow()
    moveLeft()
    generate()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  //check for the number 2048 in the squares to win
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        document.querySelector('#result-box').style.opacity = "1"
        document.querySelector('#result-message').innerHTML = "You Won the Game"
        document.querySelector('#result-tile').innerHTML = "Score -" + score;
        document.querySelector('#keep-going-button').style.opacity = "1"
        document.querySelector('.grid').style.opacity = "0.4"
        document.querySelector('#new-game').style.opacity = "0"
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 10000)
      }
    }
  }

  //check if there are no zeroes on the board to lose
  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == "") {
        zeros++;
      }
    }

    if (zeros === 0) {
      let f = 1;
      for (let i = 0; i < 15; i++) {
        if (squares[i].innerHTML === squares[i + 1].innerHTML) {
          f = 0;
        }
      }
      for (let i = 0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
          f = 0;
        }
      }
      if (f === 1) {
        document.querySelector('#result-box').style.opacity = "1"
        document.querySelector('#result-message').innerHTML = "Game Over"
        document.querySelector('#result-tile').innerHTML = "Score : " + score;
        document.querySelector('#try-again-button').style.opacity = "1"
        document.querySelector('.grid').style.opacity = "0.5"
        document.querySelector('#new-game').style.opacity = "0"
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 10000)
      }
    }
  }
  //clear timer
  function clear() {
    clearInterval(myTimer)
  }

  //function to add colours to different digits
  function addingColors() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == "") squares[i].style.backgroundColor = '#4D4C7D'
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#867AE9'
      else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = '#005792'
      else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#480032'
      else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = '#FF449F'
      else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = '#734046'
      else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#FF004D'
      else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#7EA04D'
      else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#AD62AA'
      else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff'
      else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5'
      else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#FA1E0E'
    }
  }
  addingColors()
  var myTimer = setInterval(addingColors, 10)
});
