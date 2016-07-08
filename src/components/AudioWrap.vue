<template>
  <audio v-el:audio preload="metadata" :src="getSrc()"></audio>
</template>

<script>
  export default {
    name: 'audioWrap',
    data() {
      return {
        source_url: 'http://o9pdl8on4.bkt.clouddn.com/%E3%83%A2%E3%82%AB-%E9%8E%96%E9%82%A3.mp3',
        playing: false
      }
    },
    methods: {
      setSrc: function(source_url) {
        this.source_url = source_url;
      },
      getSrc: function() {
        return this.source_url;
      }
    },
    watch: {
      playing(state) {
        if (state)
          this.$els.audio.play();
        else
          this.$els.audio.pause();
     }
    }
  }
</script>
