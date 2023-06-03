//contain the entire game scripts
(function() { 
    //-----Board Module Pattern-----//////////////////////////////////////////////
    const gameBoard = (() => {
        let board = [['', '', ''], ['', '', ''], ['', '', '']];//main board
        
        const getBoard = () => {
            return board;
        }
        const resetBoard = () => {
            board = [['', '', ''], ['', '', ''], ['', '', '']];
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

            let i = 1;
            board.forEach(element => {
                element.forEach(element => {
                    element = document.createElement('div');
                    board[posX][posY] = element; 
                    console.log(board[posX][posY]);
                    element.style.border = '1px solid black';
                    element.style.width = `${cellSize}px`;
                    element.style.height = `${cellSize}px`;
                    element.style.textAlign = 'center';
                    element.style.lineHeight = `${cellSize}px`;
                    element.dataset.cellX = posX;
                    element.dataset.cellY = posY;
                    element.dataset.pos = i;
                    element.textContent = '';
                    element.addEventListener('click', () => {   
                        if (element.textContent === '') {
                            
                            element.textContent = controller.currentPlayer; //update cell content
                            controller.winner(controller.currentPlayer, element);
                        }                   
                    })
                    if (posX == 2) posX = 0;
                    else posX++;
                    i++;
                    boardContainer.appendChild(element);
            })
            if (posY == 2) posY = 0;
            else posY++;
        });
        }

        return {createDom};
    })();

    //-----Controller-----///////////////////////////////////////////////////////////
    const controller = (() => {
        
        let currentPlayer = 'X';
        const row1 = [0, 0, 1, 0, 2, 0]; 
        const row2 = [0, 1, 1, 1, 2, 1];
        const row3 = [0, 2, 1, 2, 2, 2];
        const column1 = [0, 0, 0, 1, 0, 2];
        const column2 = [1, 0, 1, 1, 1, 2];
        const column3 = [2, 0, 2, 1, 2, 2];
        const cross1 = [0, 0, 1, 1, 2, 2]; //top left to bottom right
        const cross2 = [2, 0, 1, 1, 0, 2]; //top right to bottom left
        const topleft = [row1, column1, cross1];
        const topright = [row1, column3, cross2];
        const bottomleft = [row3, column1, cross2];
        const bottomright = [row3, column3, cross1];
        const topmid = [row1, column2];
        const leftmid = [row2, column1];
        const bottommid = [row3, column2];
        const rightmid = [row2, column3];
        const middle = [row2, column2, cross1, cross2];
    
        const firstTurn = () => {
            return Math.floor(Math.random() * 2) ? 'X' : 'O';
        }

        const winner = (symbol, element) => { //run after every move is input to the board, before next player starts
            const board = gameBoard.getBoard();
            //check the entire board, but only one row, column, and diagonal direction at a time

            //Pick one after an input is made
            const pos = element.dataset.pos;
            function getTemplate() {
                switch(pos){
                    case '1': return topleft;
                    case '2': return topmid;
                    case '3': return topright;
                    case '4': return leftmid;
                    case '5': return middle;
                    case '6': return rightmid;
                    case '7': return bottomleft;
                    case '8': return bottommid;
                    case '9': return bottomright;
                }
            }            
            const templateArray = getTemplate();
            const len = templateArray.length;
            for(let i = 0; i < len; i++) {
                cell1 = board[templateArray[i][0]][templateArray[i][1]].textContent;
                cell2 = board[templateArray[i][2]][templateArray[i][3]].textContent;
                cell3 = board[templateArray[i][4]][templateArray[i][5]].textContent;

                if (cell1 === cell2 && cell1 === cell3) {
                    //all match
                    //winner found
                    console.log(symbol);
                    break;
                }
            }
            //if no match after checking all lines template
            //next player
        
        }

        return {firstTurn, winner, currentPlayer}; //decide first turn, turn tracker, track winner/loser, 
    })()

    //-----Player Factory-----//////////////////////////////////////////////////////
    const playerFactory = (name, symbol) => {
        return {name, symbol};
    }

    function initilize() {
        displayBoard.createDom(); //initilize the page
        const board = gameBoard.getBoard();
        const firstTurn = controller.firstTurn();
        const player1 = playerFactory('Dude', 'X');
        const player2 = playerFactory('Computer', 'O');
        return {
            player1, player2
        }
        
    }

    initilize();

})();
