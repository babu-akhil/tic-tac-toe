const gameboardObject = (() => {
    let gameboardArray = new Array(9);
    let nextTurn = 'X';
    let firstMove = true;
    let gameEnd = false;
    let notDraw = false;
    return {gameboardArray, firstMove,nextTurn, gameEnd, notDraw};
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
    if(!gameboardObject.gameEnd) {info.innerText = 'Next Move: ' + gameboardObject.nextTurn
    console.log('grrr')}
    let squares = Array.from(document.getElementsByClassName('square'))
    squares.forEach(item => {
        item.innerText = gameboardObject.gameboardArray[parseInt(item.id)]
    })
}

function mark(gameboardObject) {
    let squares = Array.from(document.getElementsByClassName('square'))
    
    squares.forEach(item => {
        item.addEventListener('click', () => {
            if (gameboardObject.firstMove) {
                squares.forEach(square => {
                    square.style.backgroundColor = '#efeeb4';
                    console.log('brr')
                })
            }
            if (gameboardObject.gameboardArray.includes('X') || gameboardObject.gameboardArray.includes('O'))
                {
                    gameboardObject.firstMove = false
                }
            if(gameboardObject.gameboardArray[parseInt(item.id)]==='') {
            gameboardObject.gameboardArray[parseInt(item.id)] = gameboardObject.nextTurn
            gameboardObject.nextTurn = gameboardObject.nextTurn==='X'?'O':'X'
            console.log(item.id)
            
            let winnerOutput = checkWinner(gameboardObject)
            updateDisplay(gameboardObject)
            console.log(gameboardObject.gameEnd)
            if(gameboardObject.gameEnd ===true) {console.log('Game Over!')
                gameboardObject.gameboardArray.fill('')
                gameboardObject.gameEnd = false
                gameboardObject.notDraw = false;
                }
            }
        })
    })
    
}

function checkWinner(gameboardObject) {
    let info = Array.from(document.getElementsByClassName('info'))[0]

    let binaryArray = []
    gameboardObject.gameboardArray.forEach(item => {
        if (item==='X') {binaryArray.push(1)}
        else if (item==='O') {binaryArray.push(0)}
        else if(item==='') {binaryArray.push(999)}
    })
    let squares = Array.from(document.getElementsByClassName('square'))

    let winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    winningCombinations.forEach(([i,j,k]) => {
        if  (binaryArray[i]+binaryArray[j]+binaryArray[k]===3)
    {   let winningSquares = squares.filter(square => square.id == String(i)||square.id == String(j)||square.id == String(k))
        
        winningSquares.forEach(square => {
            square.style.backgroundColor = '#58b368';
        })
        gameboardObject.gameEnd = true;
        gameboardObject.firstMove = true;
        info.innerText = 'X Wins!';
        gameboardObject.notDraw = true;
        return 'X Wins!';
    }
    })

    winningCombinations.forEach(([i,j,k]) => {
        if  (binaryArray[i]+binaryArray[j]+binaryArray[k]===0)
    {   let winningSquares = squares.filter(square => square.id == String(i)||square.id == String(j)||square.id == String(k))
        
        winningSquares.forEach(square => {
            square.style.backgroundColor = '#58b368';
        })
        gameboardObject.gameEnd = true;
        gameboardObject.firstMove = true;
        gameboardObject.notDraw = true;
        info.innerText = 'O Wins!';
        return 'O Wins!'
    }
    })
    if ((binaryArray.reduce((a,b)=>a+b,0)<=5) && !gameboardObject.notDraw) {
        gameboardObject.gameEnd = true;
        gameboardObject.firstMove = true;
        info.innerText =  'Its a Draw!'
        return 'Its a Draw!'
    }

    else {return ''}
}


mark(gameboardObject)
