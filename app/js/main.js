/* jshint devel:true */
(function(context){
  const audio = document.querySelector('audio');
  const processbar = document.querySelector('.t-player-processbar');
  const controlButton = document.querySelector('#t-player-button');
  document.addEventListener('DOMContentLoaded', (e) => {
    document.querySelector('.t-player-processbar').style.width = 0;
  }, false);
  audio.addEventListener('timeupdate', (e) => {
    processbar.style.width = `${audio.currentTime / audio.duration * 100}%`;
  }, false);
  audio.addEventListener('play', (e) => {
    document.querySelector('#t-player-button').className = 't-player-pause';
  })
  audio.addEventListener('pause', (e) => {
    document.querySelector('#t-player-button').className = 't-player-start';
  })
  context.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.t-player-start')) {
      audio.play();
      controlButton.dispatchEvent(new MouseEvent('ChangePlayerButtonState', {
        'bubbles': true,
        'cancelable': true
      }));
    }
    else if (e.target && e.target.matches('.t-player-pause')) {
      audio.paused();
    }
  }, false)
}).call(this, document.querySelector('body'));
