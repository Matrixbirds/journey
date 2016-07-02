/* jshint devel:true */
(function(context){
  const audio = document.querySelector('audio');
  const processbar = document.querySelector('.t-player-processbar');
  document.addEventListener('DOMContentLoaded', (e) => {
    document.querySelector('.t-player-processbar').style.width = 0;
  }, false);
  audio.addEventListener('timeupdate', (e) => {
    processbar.style.width = `${audio.currentTime / audio.duration * 100}%`;
  }, false);
  context.addEventListener('click', (e) => {
    if (e.target && e.target.matches('#t-player-button')) {
      audio.play();
    }
    else if (e.target && e.target.matches('#t-stop-player-button')) {
      audio.paused();
    }
  }, false)
}).call(this, document.querySelector('body'));
