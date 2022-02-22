class Game {
    constructor(document) {
        this.document = document;
        this.turn = "X";
        this.score = {
            X: 0,
            O: 0
        }
        this.winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        this.board = new Array(9).fill(null);

        this.document.querySelectorAll('.tile').forEach(tile => {
            tile.addEventListener('click', () => {
                this.move(tile);
            })
        });
        this.drawTurnToScreen();
        console.info("Game Loaded!");
    }

    nextTurn() {
        this.turn = this.turn === "X" ? 'O' : 'X';
        this.drawTurnToScreen();
    }

    move(tile) {
        if (this.board[tile.dataset.i] === null) {
            this.board[tile.dataset.i] = this.turn;
            this.drawBoard();
            this.checkWinner();
        }
    }

    drawBoard() {
        this.board.forEach((value, i) => {
            this.document.querySelector(`.tile[data-i="${i}"]`).innerText = value;
        })
    };

    drawTurnToScreen() {
        document.getElementById('turn').innerText = this.turn;
    }

    drawScoreToScreen() {
        document.querySelector('.score').innerText =`${this.score.X}-${this.score.O}`;
    }

checkWinner()
{  let winner = null;
    this.winCombinations.forEach((combination) => {
        const [c1, c2, c3] = combination;

        if (this.board[c1] === 'X' && this.board[c2] === 'X' &&this.board[c3] === 'X') {
            winner = "X";
        } else if (this.board[c1] === 'O' && this.board[c2] === 'O' && this.board[c3] === 'O') {
            winner = "O";
        }
    })
    if(winner){
        this.score[winner]++;
        this.drawScoreToScreen();
        alert(`Winner: ${winner} PLay Again!`)
        this.restartGame();
    }else{
        this.checkDraw();

    }
}
checkDraw(){
        if(!this.board.includes(null)){
            alert(`Draw!`)
            this.restartGame();
        }else{
            this.nextTurn();
        }
}
    restartGame() {
        this.board = new Array(9).fill(null)
        this.turn = "X"
        this.drawTurnToScreen()
        this.drawBoard()
    }
}