/* jshint devel:true */
console.log('Look at app/js/main.js');
(function(context, events){
  document.addEventListener('DOMContentLoaded', events['init'], false);
  context.addEventListener('click', (e) => {
    if (e.target && e.target.matches('#t-player-button')) {
      events['playerEvent'].call(context.querySelector('.t-player-processbar'));
    }
    else if (e.target && e.target.matches('#t-stop-player-button')) {
      events['stopEvent'].call(null);
    }
  }, false)
}).call(this, document.querySelector('body'), {
  init: function () {
    document.querySelector(".t-player-processbar").style.width = 0;
  },
  playerEvent: function () {
    console.log(this);
    window.playerId = setInterval(() => {
      this.style.width = `${parseInt(this.style.width) + 1}%`;
      console.log('width', this.style.width);
    }, 3000);
  },
  stopEvent: function() {
    clearInterval(window.playerId);
  }
});