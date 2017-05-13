var game = {
  winner: "",
  compScore: 0,
  playerScore: 0,
  playing: true,
  
  rndNum: function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
  
  watchInput: function(e){
    if(game.playing === true && e.target.tagName == "LI"){
      var playerPick = "";
      if(e.target.id === "player-rock"){
        playerPick = "rock";
      } else if(e.target.id === "player-paper"){
        playerPick = "paper";
      } else if(e.target.id === "player-scissors"){
        playerPick = "scissors";
      }
      game.battle(playerPick);
    }
  },
  
  highlightChoices: function(player, highlight, hide1, hide2){
    document.querySelector("#" + player + "-" + highlight).classList.add("highlight");
    document.querySelector("#" + player + "-" + hide1).classList.add("hide");
    document.querySelector("#" + player + "-" + hide2).classList.add("hide");
    game.playing = false;
    setTimeout(function(){
      document.querySelector("#" + player + "-" + highlight).classList.remove("highlight");
      document.querySelector("#" + player + "-" + hide1).classList.remove("hide");
      document.querySelector("#" + player + "-" + hide2).classList.remove("hide");
      game.playing = true;
    }, 1000);
  },
  
  hightlightWinner: function(winner) {
    
    var playerWin = document.querySelector("#player-win");
    var compWin = document.querySelector("#comp-win");
    
    if(winner === "player") {
      playerWin.innerHTML = "Win!";
      playerWin.classList.add("highlight");
    } else if(winner === "computer") {
      compWin.innerHTML = "Win!";
      compWin.classList.add("highlight");
    } else {
      compWin.innerHTML = "Tie!";
      compWin.classList.add("highlight");
      
      playerWin.innerHTML = "Tie!";
      playerWin.classList.add("highlight");
    }
    setTimeout(function(){
      compWin.innerHTML = "";
      playerWin.innerHTML = "";
      
      if(playerWin.classList.contains("highlight")){
        playerWin.classList.remove("highlight");
      }
      
      if(compWin.classList.contains("highlight")){
        compWin.classList.remove("highlight");
      }
      
    }, 1000);
  },
  
  battle: function(playerPick){
    var choices = ["rock","paper","scissors"];
    var computerPick = choices[game.rndNum(0,2)];
    
    if(playerPick === "rock"){
      this.highlightChoices("player", "rock", "paper", "scissors");
      
      if(computerPick === "rock"){
        this.highlightChoices("comp", "rock", "paper", "scissors");
        game.winner = "tie";
      } else if(computerPick === "paper"){
        this.highlightChoices("comp", "paper", "rock", "scissors");
        game.winner = "computer";
        game.compScore++;
      } else {
        this.highlightChoices("comp", "scissors", "rock", "paper");
        game.winner = "player";
        game.playerScore++;
      }
    } else if(playerPick === "paper"){
      
      this.highlightChoices("player", "paper", "rock", "scissors");
      
      if(computerPick === "rock"){
        this.highlightChoices("comp", "rock", "paper", "scissors");
        game.winner = "player";
        game.playerScore++;
      } else if(computerPick === "paper"){
        this.highlightChoices("comp", "paper", "rock", "scissors");
        game.winner = "tie";
      } else if(computerPick === "scissors") {
        this.highlightChoices("comp", "scissors", "rock", "paper");
        game.winner = "computer";
        game.compScore++;
      }
    } else if(playerPick === "scissors"){
      this.highlightChoices("player", "scissors", "rock", "paper");
      
      if(computerPick === "rock"){
        this.highlightChoices("comp", "rock", "paper", "scissors");
        game.winner = "computer";
        game.compScore++;
      } else if(computerPick === "paper"){
        this.highlightChoices("comp", "paper", "rock", "scissors");
        game.winner = "player";
        game.playerScore++;
      } else if(computerPick === "scissors"){
        this.highlightChoices("comp", "scissors", "rock", "paper");
        game.winner = "tie";
      }
    }

    document.querySelector("#player-score").innerHTML = this.playerScore;
    document.querySelector("#comp-score").innerHTML = this.compScore;
    
    game.hightlightWinner(game.winner);
  },
  
  startGame: function(){

    document.querySelector('#main-btn').innerHTML = "Restart";

    game.winner = "";
    game.compScore = 0;
    game.playerScore = 0;
    game.playing = true;

    document.querySelector("#game-board").innerHTML = `
      <div class="col-2">
        <h2>Player</h2>
        <h3 id="player-win" class="winner"></h3>
        <h3>Score: <span id="player-score">0</span></h3>
        <ul id="player-choices" class="choices hover-large">
          <li id="player-rock">Rock</li>
          <li id="player-paper">Paper</li>
          <li id="player-scissors" >Scissors</li>
        </ul>
      </div>
      <div class="col-2">
        <h2>Computer</h2>
        <h3 id="comp-win" class="winner"></h3>
        <h3>Score: <span id="comp-score">0</span></h3>
        <ul id="comp-choices" class="choices">
          <li id="comp-rock">Rock</li>
          <li id="comp-paper">Paper</li>
          <li id="comp-scissors" >Scissors</li>
        </ul>
      </div>`;

    document.querySelector("#player-choices").addEventListener("click", game.watchInput, false);

  }
};

document.querySelector('#main-btn').addEventListener('click', game.startGame, false);
