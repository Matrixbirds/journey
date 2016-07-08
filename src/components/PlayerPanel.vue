<template>
  <progress-bar v-el:bar></progress-bar>
  <div id="jounery-player-panel">
    <button @click='play'>player</button>
    <button @click='pause'>pause</button>
  </div>
  <audio-wrap v-el:audio @timeupdate="timeUpdate"></audio-wrap>
</template>

<script>
  import ProgressBar from './ProgressBar';
  import AudioWrap from './AudioWrap';
  
  export default {
    name: 'jouneryPlayerPanel',
    data() {
      return {
        state: false,
        url: '/static/song.lrc',
        text: null,
        textArray: null,
        tPlayerSongLrc: null
      }
    },
    components: {
      ProgressBar,
      AudioWrap
    },
    methods: {
      play() {
        this.$els.audio.play();
      },
      pause() {
        this.$els.audio.pause();
      },
      timeUpdate() {
        const time = this.$els.audio.currentTime;
        let percent_time =  (time / this.$els.audio.duration) * 100;
        this.$els.bar.style.width = percent_time.toFixed(2) + '%';
        const current = document.querySelector('.highlight');
        if (current)
          current.className = current.className.replace(/highlight/, '');
          const [songArray, length] = [this.textArray, this.textArray.length];
          for (let i = 0, j = 1; j < length; i++, j++) {
            if (songArray[i].time <= parseFloat(time.toFixed(3)) &&
              parseFloat(time.toFixed(3)) <= songArray[j].time) {
              document.querySelector(`#time_${i}`).className = 'highlight';
              this.tPlayerSongLrc.innerText = songArray[i].content;
            }
          }
      },
      textToArray() {
        return this.textArray || (this.textArray = this.text.split("\n")
        .filter((e) => /\[\d+:\d+(\.\d+)?\]/g.test(e))
        .map((e) => {
          const a = /\[\d+:\d+(\.\d+)?\]/g.exec(e)[0].replace(/\[|\]/g, "").split(/:/);
          const res = parseFloat(a[0])  * 60 + parseFloat(a[1]);
          return { time: parseFloat(res), content: e.split("]")[1]};
        }));
      }
    },
    ready: function() {
      this.$http.get(this.url)
              .then((successResponse) => {
                this.text = successResponse.data;
                const ul = document.createElement('ul');
                ul.className = 't-player-lrc-panel';
                this.textToArray().forEach((e, i) => {
                  ul.innerHTML += `<li id='time_${i}'>${e.content}</li>`;
                });
                document.querySelector('#lrc').appendChild(ul);
                this.tPlayerSongLrc = document.querySelector('.lrc-panel');
              }, (failureResponse) => {
                // TODO: handle Erorr;
                setLrcText(null);
              })
    }
  }
</script>

<style>
  #jounery-player-panel {
    float: left;
    width: 20%;
  }
</style>