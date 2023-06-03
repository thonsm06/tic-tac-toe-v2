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

            board.forEach(element => {
                element.forEach(element => {
                    element = document.createElement('div');    
                    element.style.border = '1px solid black';
                    element.style.width = `${cellSize}px`;
                    element.style.height = `${cellSize}px`;
                    element.style.textAlign = 'center';
                    element.style.lineHeight = `${cellSize}px`;
                    element.dataset.cellX = posX;
                    element.dataset.cellY = posY;
                    element.textContent = element[0];

                    element.addEventListener('click', event => {                        
                        element.textContent = 'X'; //update cell content
                        console.log(event.target);
                    })
                    if (posX == 2) posX = 0;
                    else posX++;
                    
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
        const firstTurn = () => {

            return Math.floor(Math.random() * 2) ? 'X' : 'O';
        }

        const winner = (symbol) => { //run after every move is input to the board, before next player starts
            const currentPlayer = symbol;
            const board = gameBoard.getBoard();
            //check the entire board, but only one row, column, and diagonal direction at a time
            
            if((posX === 0 || posX === 2) && (posY === 0 || posY === 2)){//if corner cell
                //check side and cross
                
            } else if ((posX === 1 && posY === /[0-2]/) || (posY === 1 && posX === /[0-2]/)) { //if side cell
                //check T
            } else if (posX === 1 && posY === 1){ //if middle cell
                //check up/down and cross
            }

            row1 = [0, 0, 1, 0, 2, 0]; 
            row2 = [0, 1, 1, 1, 2, 1];
            row3 = [0, 2, 1, 2, 2, 2];

            column1 = [0, 0, 0, 1, 0, 2];
            column2 = [1, 0, 1, 1, 1, 2];
            column3 = [2, 0, 2, 1, 2, 2];

            cross1 = [0, 0, 1, 1, 2, 2]; //top left to bottom right
            cross2 = [2, 0, 1, 1, 0, 2]; //top right to bottom left

            topleft = [row1, column1, cross1];
            topright = [row1, column3, cross2];
            bottomleft = [row3, column1, cross2];
            bottomright = [row3, column3, cross1];

            topmid = [row1, column2];
            leftmid = [row2, column1];
            bottommid = [row3, column2];
            leftmid = [row2, column3];

            middle = [row2, column2, cross1, cross2];

            //Pick one after an input is made
            function choosentemplate() {
                const templateArray = []; //will equal to one of nine template
                return templateArray;
            }


            const len = templateArray.length;
            
            for(let i = 0; i < len; i++) {
                cell1 = board[templateArray[i][0]][templateArray[i][1]].textContent;
                cell2 = board[templateArray[i][2]][templateArray[i][3]].textContent;
                cell3 = board[templateArray[i][4]][templateArray[i][5]].textContent;

                if (cell1 === cell2 && cell1 === cell3) {
                    //all match
                    //winner found
                    break;
                }
            }
            //if no match after checking all lines template
            //next player
        
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
