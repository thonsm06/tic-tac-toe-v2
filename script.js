//contain the entire game scripts
(function() { 
    //-----Board Module Pattern-----//////////////////////////////////////////////
    const gameBoard = (() => {
        let board = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];//main board
        
        const getBoard = () => {
            return board;
        }
        const resetBoard = () => {
            board = [['1', '2', '3'], ['4','5', '6'], ['7', '8', '9']];
        }
        const setValue = (i, j, val) => {
            board[i][j] = val;
        }
        return {getBoard, resetBoard, setValue};
    })();
    
    //-----Display Module Pattern-----//////////////////////////////////////////////
    const displayBoard = (() => {
        const board = gameBoard.getBoard();

        board.forEach(element => {
            element.forEach(element => {
                
            
        })});

        return {board};
    })();

    //-----Player Factory-----//////////////////////////////////////////////////////
    const playerFactory = (name) => {
        return {name};
    }
    
    const player1 = playerFactory('Dude');
    console.log(player1.name);

})();







const arrayBoard = [];
for (let i = 0; i < 3; i++){
    arrayBoard[i] = '';
    for (let j = 0; j < 3; j++) {
        //create div per array's element
        arrayBoard[i][j] = '';
        arrayBoard[i][j] = document.createElement('div');
    }
}



