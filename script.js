const gameboardObject = (() => {
    let gameboardArray = new Array(9);
    let nextTurn = 'X';
    let gameEnd = false;
    return {gameboardArray, nextTurn, gameEnd}
})();

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that callingameboardObject.nextTurng sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  

gameboardObject.gameboardArray.fill('')

function updateDisplay(gameboardObject) {
    let info = Array.from(document.getElementsByClassName('info'))[0]
    info.innerText = 'Next Move: ' + gameboardObject.nextTurn
    let squares = Array.from(document.getElementsByClassName('square'))
    squares.forEach(item => {
        item.innerText = gameboardObject.gameboardArray[parseInt(item.id)]
    })
    console.log(squares)
}

function mark(gameboardObject) {
    let squares = Array.from(document.getElementsByClassName('square'))
    squares.forEach(item => {
        item.addEventListener('click', () => {
            if(gameboardObject.gameboardArray[parseInt(item.id)]==='') {
            gameboardObject.gameboardArray[parseInt(item.id)] = gameboardObject.nextTurn
            gameboardObject.nextTurn = gameboardObject.nextTurn==='X'?'O':'X'
            console.log(item.id)
            updateDisplay(gameboardObject)
            let winnerOutput = checkWinner(gameboardObject)
            console.log(winnerOutput)
            if(gameboardObject.gameEnd ===true) {console.log('Game Over!')
                gameboardObject.gameboardArray.fill('')
                gameboardObject.gameEnd = false
                }
            }
        })
    })
    
}

function checkWinner(gameboardObject) {
    let binaryArray = []
    gameboardObject.gameboardArray.forEach(item => {
        if (item==='X') {binaryArray.push(1)}
        else if (item==='O') {binaryArray.push(0)}
        else if(item==='') {binaryArray.push(999)}
    })

    if  ((binaryArray[0]+binaryArray[1]+binaryArray[2]===3)
    ||(binaryArray[3]+binaryArray[4]+binaryArray[5]===3)
    ||((binaryArray[6]+binaryArray[7]+binaryArray[8]===3))
    ||(binaryArray[0]+binaryArray[3]+binaryArray[6]===3)
    ||(binaryArray[1]+binaryArray[4]+binaryArray[7]===3)
    ||(binaryArray[2]+binaryArray[5]+binaryArray[8]===3)
    ||(binaryArray[0]+binaryArray[4]+binaryArray[8]===3)
    ||(binaryArray[2]+binaryArray[4]+binaryArray[6]===3)
     ) {
        gameboardObject.gameEnd = true
        return ('X Wins!')
        
    }

    if  ((binaryArray[0]+binaryArray[1]+binaryArray[2]===0)
    ||(binaryArray[3]+binaryArray[4]+binaryArray[5]===0)
    ||((binaryArray[6]+binaryArray[7]+binaryArray[8]===0))
    ||(binaryArray[0]+binaryArray[3]+binaryArray[6]===0)
    ||(binaryArray[1]+binaryArray[4]+binaryArray[7]===0)
    ||(binaryArray[2]+binaryArray[5]+binaryArray[8]===0)
    ||(binaryArray[0]+binaryArray[4]+binaryArray[8]===0)
    ||(binaryArray[2]+binaryArray[4]+binaryArray[6]===0)
     ) {
        gameboardObject.gameEnd = true
        return ('O Wins!')
    }

    else {return ''}
}



mark(gameboardObject)
