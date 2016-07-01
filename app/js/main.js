/* jshint devel:true */
console.log('Look at app/js/main.js');

function initEvents() {
  document.querySelector(".t-player-processbar").style.width = 0;
  let playerButton = document.querySelector('#t-player-button');
  playerButton.addEventListener('click', () => {
    console.log('click');
    window.playerId = setInterval(() => {
      var processbar = document.querySelector(".t-player-processbar");
      processbar.style.width = [new String(parseInt(processbar.style.width) + 1), ''].join("%");
      console.log('width', processbar.style.width);
    }, 3000);
  }, false);

  let stopPlayerButton = document.querySelector('#t-stop-player-button');
  stopPlayerButton.addEventListener('click', () => {
    console.log('stop');
    clearInterval(window.playerId);
  }, false);

}

const body = document.querySelector("body");

body.addEventListener("load", initEvents(), false);
