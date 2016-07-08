<template>
  <div id="lrc">
  </div>
  <div id="player">
    <player-panel></player-panel>
    <span class='lrc-panel'></span>
  </div>
</template>

<script>
  import ProgressBar from './ProgressBar';
  import PlayerPanel from './PlayerPanel';
  export default {
    name: 'Player',
    components: {
      ProgressBar, 
      PlayerPanel
    },
    data() {
      return {
        messages: 'Hello Player'
      }
    }
  }
</script>

<style>
  #player {
    position: absolute;
    height: 80px;
    line-height: 80px;
    background: navajowhite;
    bottom: 0;
    width: 100%;
  }
  body {
    margin: 0;
  }

  .t-player-lrc-panel {
    padding-left: 0px;
  }

  .lrc-panel {
    width: 70%;
  }

  .highlight {
    color: red;
  }
</style>