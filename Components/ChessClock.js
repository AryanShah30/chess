import { createNotificationModal } from "../Helper/notifications.js";

class ChessClock {
  constructor(
    player1Name = "Player 1",
    player2Name = "Player 2",
    time1,
    time2,
    increment1,
    increment2
  ) {
    this.player1 = {
      name: player1Name,
      timeLeft: time1,
      increment: increment1,
    };
    this.player2 = {
      name: player2Name,
      timeLeft: time2,
      increment: increment2,
    };
    this.activePlayer = "white";
    this.timer = null;
    this.isPaused = false;
    this.isGameOver = false;
  }

  formatTime(ms) {
    const totalSeconds = Math.ceil(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  updateDisplay() {
    const player1Time = document.getElementById("player1-time");
    const player2Time = document.getElementById("player2-time");

    player1Time.textContent = this.formatTime(this.player1.timeLeft);
    player2Time.textContent = this.formatTime(this.player2.timeLeft);

    player1Time.classList.toggle("low-time", this.player1.timeLeft <= 30000);
    player2Time.classList.toggle("low-time", this.player2.timeLeft <= 30000);
  }

  start() {
    if (this.timer || this.isGameOver) return;
    this.tick();
  }

  tick() {
    if (this.isPaused || this.isGameOver) return;

    this.timer = setInterval(() => {
      const activePlayerObj =
        this.activePlayer === "white" ? this.player1 : this.player2;
      activePlayerObj.timeLeft -= 1000;

      if (activePlayerObj.timeLeft <= 0) {
        activePlayerObj.timeLeft = 0;
        this.stop();
        this.isGameOver = true;
        const winner =
          this.activePlayer === "white" ? this.player2.name : this.player1.name;
        createNotificationModal(`Time's up! ${winner} wins!`, true);
        return;
      }

      this.updateDisplay();
    }, 1000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  switchTurn() {
    if (this.isGameOver) return;

    this.stop();
    const activePlayerObj =
      this.activePlayer === "white" ? this.player1 : this.player2;
    activePlayerObj.timeLeft += activePlayerObj.increment * 1000;
    this.activePlayer = this.activePlayer === "white" ? "black" : "white";

    document.getElementById("player1-clock").classList.toggle("active");
    document.getElementById("player2-clock").classList.toggle("active");

    this.updateDisplay();
    this.start();
  }

  pause() {
    this.isPaused = true;
    this.stop();
  }

  resume() {
    if (this.isGameOver) return;
    this.isPaused = false;
    this.start();
  }

  endGame() {
    this.isGameOver = true;
    this.stop();
  }
}

export { ChessClock };
