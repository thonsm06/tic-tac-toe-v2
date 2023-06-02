//contain the entire game scripts
(function() { 
    //-----Board Module Pattern-----//////////////////////////////////////////////
    const gameBoard = (() => {
        let board = [[['', ''], ['', ''], ['', '']], [['', ''], ['', ''], ['', '']], [['', ''], ['', ''], ['', '']]];//main board
        
        const getBoard = () => {
            return board;
        }
        const resetBoard = () => {
            board = [[['', ''], ['', ''], ['', '']], [['', ''], ['', ''], ['', '']], [['', ''], ['', ''], ['', '']]];
        }
        const setValue = (i, j, val) => {
            board[i][j] = val;
        }
        return {getBoard, resetBoard, setValue};
    })();
    
    //-----Display Module Pattern-----//////////////////////////////////////////////
    const displayBoard = (() => {
        const createDom = () => {
            const cellSize = 64;
            const body = document.querySelector('body');
            const board = gameBoard.getBoard();
            const boardContainer = document.createElement('div');
            boardContainer.style.width = `${cellSize * 3}`;
            boardContainer.style.height = `${cellSize * 3}`;
            boardContainer.style.display = 'grid';
            boardContainer.style.gridTemplate = '1fr 1fr 1fr / 1fr 1fr 1fr'
            boardContainer.style.position = 'absolute';
            body.appendChild(boardContainer);

            board.forEach(element => {
                element.forEach(element => {
                    element[1] = document.createElement('div');    
                    element[1].style.border = '1px solid black';
                    element[1].style.width = `${cellSize}px`;
                    element[1].style.height = `${cellSize}px`;
                    element[1].style.textAlign = 'center';
                    element[1].style.lineHeight = `${cellSize}px`;
                    element[1].textContent = element[0];

                    element[1].addEventListener('click', event => {
                        element[0] = 'x';//change the value to current player
                        element[1].textContent = element[0]; //update cell content
                        
                    })
                    boardContainer.appendChild(element[1]);
            })});
        }

        return {createDom};
    })();

    //-----Player Factory-----//////////////////////////////////////////////////////
    const playerFactory = (name) => {
        return {name};
    }
    
    const player1 = playerFactory('Dude');
    console.log(player1.name);https://www.apple.com/iphone-14-pro/
    console.log(gameBoard.getBoard());

    displayBoard.createDom();
})();
