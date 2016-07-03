/* jshint devel:true */
(function(context){
  const audio = document.querySelector('audio');
  const processbar = document.querySelector('.t-player-processbar');
  const controlButton = document.querySelector('#t-player-button');
  const ajax = new XMLHttpRequest();
  const tPlayerSongLrc = document.querySelector('.t-player-song-lrc');
  const lrc = { 
    text: null,
    text_array: null,
    setText: function(e) {this.text = e},
    getText: function() {return this.text},
    to_a: function() {
      if (!this.getText()) {
        return null;
      }
      return this.text_array || (this.text_array = this.getText().split("\n")
        .filter((e) => /\[\d+:\d+(\.\d+)?\]/g.test(e))
        .map((e) => {
          const a = /\[\d+:\d+(\.\d+)?\]/g.exec(e)[0].replace(/\[|\]/g, "").split(/:/);
          const res = parseFloat(a[0])  * 60 + parseFloat(a[1]);
          return { time: parseFloat(res), content: e.split("]")[1]};
        }));
    }
  };
  const lrcPanel = {
    lrc: null,
    setLrc: function(e) {this.lrc= e},
    getLrc: function() { return this.lrc;},
    drawTextTo: function(domObj) {
      const ul = document.createElement('ul');
      ul.className = 't-player-lrc-panel';
      lrc.to_a().forEach((e, i) => {
        ul.innerHTML += `<li id='time_${i}'>${e.content}</li>`;
      })
      domObj.appendChild(ul);
    }
  };
  ajax.onreadystatechange = function() {
    if(this.readyState === ajax.DONE) {
      lrc.setText(this.responseText);
      lrcPanel.setLrc(lrc);
      lrcPanel.drawTextTo(context);
    }
  }
  ajax.open('GET', 'media/song.lrc', true);
  ajax.setRequestHeader('Content-Type', 'text/lrc');
  ajax.send(null);
  document.addEventListener('DOMContentLoaded', (e) => {
    document.querySelector('.t-player-processbar').style.width = 0;
  }, false);
  audio.addEventListener('timeupdate', (e) => {
    const time = audio.currentTime;
    processbar.style.width = `${time / audio.duration * 100}%`;
    const current = document.querySelector('.highlight');
    if (current)
      current.className = current.className.replace(/highlight/, '');
    (function(textString) {
      if(textString) {
        const [songArray, length] = [lrc.to_a(), lrc.to_a().length];
        for (let i = 0, j = 1; j < length; i++, j++) {
          if (songArray[i].time <= parseFloat(time.toFixed(3)) &&
            parseFloat(time.toFixed(3)) <= songArray[j].time) {
            document.querySelector(`#time_${i}`).className = 'highlight';
            tPlayerSongLrc.innerText = songArray[i].content;
          }
        }
      }
    }).call(null, lrc.getText());
  }, false);
  audio.addEventListener('play', (e) => {
    document.querySelector('#t-player-button').className = 't-player-pause';
  }, false);
  audio.addEventListener('pause', (e) => {
    document.querySelector('#t-player-button').className = 't-player-start';
  }, false);
  context.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.t-player-start')) {
      audio.play();
    }
    else if (e.target && e.target.matches('.t-player-pause')) {
      audio.pause();
    }
    else {
      document.dispatchEvent(new Event('OpsWarning'));
    }
  }, false);
  document.addEventListener('OpsWarning', (e) => {
    const p = document.querySelector('.OpsWarning');
    p.innerText = "Ops....功能尚未实现哦";
    setTimeout((e) => (p.innerText=''), 800);
  });
}).call(this, document.querySelector('body'));
