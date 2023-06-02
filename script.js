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

            let posX = 0;
            let posY = 0;

            board.forEach(element => {
                element.forEach(element => {
                    element[1] = document.createElement('div');    
                    element[1].style.border = '1px solid black';
                    element[1].style.width = `${cellSize}px`;
                    element[1].style.height = `${cellSize}px`;
                    element[1].style.textAlign = 'center';
                    element[1].style.lineHeight = `${cellSize}px`;
                    element[1].dataset.cellX = posX;
                    element[1].dataset.cellY = posY;
                    element[1].textContent = element[0];

                    element[1].addEventListener('click', event => {
                        element[0] = 'x';//change the value to current player
                        element[1].textContent = element[0]; //update cell content
                        console.log(event.target);
                    })
                    if (posX == 2) posX = 0;
                    else posX++;
                    
                    boardContainer.appendChild(element[1]);
            })
            if (posY == 2) posY = 0;
            else posY++;
        });
        }

        return {createDom};
    })();

    //-----Controller-----///////////////////////////////////////////////////////////
    const controller = (() => {
        const firstTurn = () => {

            return Math.floor(Math.random() * 2) ? 'X' : 'O';
        }

        const winner = (symbol) => { //run after every move is input to the board, before next player starts
            const currentPlayer = symbol;
            const board = gameBoard.getBoard();
            //check the entire board, but only one row, column, and diagonal direction at a time
            //if corner cell

            //if side cell

            //if middle cell
            if(element[i]) {

            }
        }

        return {firstTurn, winner}; //decide first turn, turn tracker, track winner/loser, 
    })()

    //-----Player Factory-----//////////////////////////////////////////////////////
    const playerFactory = (name, symbol) => {
        return {name, symbol};
    }

    function initilize() {
        displayBoard.createDom(); //initilize the page
        const firstTurn = controller.firstTurn();
        const player1 = playerFactory('Dude', 'X');
        const player2 = playerFactory('Computer', 'O');
    }

    initilize();

})();
