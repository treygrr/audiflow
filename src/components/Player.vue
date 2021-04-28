<template>
  <v-container class="player-wrapper">
    <div class="text-center">
      <audio @loadeddata="loaded()" :src="`local-resource://` + src" ref="audio">
      </audio>
      <div class="player-list">
          <div class="player-info">
            <p>{{ src }}</p>
          </div>
          <div class="player-timer">
            <v-slider
              v-model="currentTime"
              :min="0"
              :max="songDuration||100"
              :readonly="src? false: true"
              @mousedown="pause(); seek()"
              @mouseup="seek(); play()"
              thumb-color="#40c6ff"
              color="white"
              track-color="gray"
              persistent-hint
            >
              <template v-slot:prepend>
                <v-icon
                  :disabled="src? false: true"
                  color="white"
                  @click="rewind"
                >
                  mdi-minus
                </v-icon>
              </template>

              <template v-slot:append>
                <v-icon
                  :disabled="src? false: true"
                  color="white"
                  @click="fastforward"
                >
                  mdi-plus
                </v-icon>
              </template>            
            </v-slider>
            <div v-if="this.currentTime" class="timestamp-tracker">{{ convertToTimeStamp(this.currentTime) }} - {{ convertToTimeStamp(this.songDuration) }}</div>
          </div>
          <div class="player-controls">
              <v-btn color="white" class="button" icon>
                <v-icon>mdi-rewind</v-icon>
              </v-btn>
              <v-btn color="white" class="button" v-if="songState" icon @click.native="pause()">
                <v-icon>mdi-pause</v-icon>
              </v-btn>
              <v-btn color="white" class="button" v-else icon @click.native="play()">
                <v-icon>mdi-play</v-icon>
              </v-btn>
              <v-btn color="white" class="button" icon @click.native="playNext()">
                <v-icon>mdi-fast-forward</v-icon>
              </v-btn>
          </div>
      </div>
    </div>
  </v-container>
</template>

<style>
.player-timer >  div > .v-input__control {
  margin-bottom: 0px;
}
.player-timer >  div > .v-input__control > .v-input__slot {
  margin-bottom: 0px;
}
.player-timer >  div > .v-input__control > .v-messages {
  display: none
}
</style>

<style scoped>
.player-wrapper {
  background-color: transparent;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: unset;
  color: white;

}

@media screen and (min-width: 0px) {
  .button {
    width: 25px;
    height: 25px;
  }
  .player-list {
    backdrop-filter: blur(10px);
    background: linear-gradient(130deg, rgba(2,0,36,.1) 0%, rgba(7,6,92,.1) 25%, rgba(9,9,121,.1) 41%, rgba(4,112,189,.1) 53%, rgba(8,28,133,.1) 75%, rgba(0,212,255,.1) 100%);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
  }

  .timestamp-tracker {
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    pointer-events: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.4);
    font-weight: 500;
    top: 0px;
    left: 0;
    right: 0;
  }
  .player-controls {
    background-color: transparent;
    order: 1;
    width: 50%;
    height: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  }
  .player-timer {
    padding-top: 10px;
    background-color: transparent;
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-right: 10px;
    box-sizing: border-box;
    display: flex;
    order: -1;
    align-items: center;
    align-content: center;
    justify-content: center;
  }
  .player-info {
    background-color: transparent;
    order: 2;
    width: 50%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  }
  .player-info > p {
    height: 24px;
    width: 100%;
    margin: 0;
    padding: 0;
  }
}


@media screen and (min-width: 960px) {
  .player-list {
    height: 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .player-controls {
    order: 1;
    height: unset;
    width: calc(25% - 20px);
  }
  .player-timer {
    width: 50%;
    order: 1;
  }
  .player-info {
    order: 1;
    width: 25%;
  }
  .timestamp-tracker {
    top: 10px;
  }
  .button {
    width: 50px !important;
    height: 50px !important;
  }
}

</style>

<script>
const md = require("music-metadata")
import { ipcRenderer } from 'electron'
window.ipcRenderer = ipcRenderer
// eslint-disable-next-line no-undef

export default {
  name: 'AudioPlayer',
  computed: {
    src: function () {
      return this.$store.state.playing.currentSong
    }
  },
  watch: {
    audio: function(newVal, oldVal) {
     console.log('audio changed: ', newVal, ' | was: ', oldVal)
    }
  },
  data: () => ({
    songState: false,
    playing: null,
    currentTime: null,
    songDuration: 0,
  }),
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    seek(){
      console.log('seeking')
      this.playing.currentTime = this.currentTime
      this.songState = true;

    },
    setMetaData() {
      async() => {
        const metadata = await md.parseStream(`local-resource://${this.src}`, {mimeType: 'audio/mpeg', size: 26838});
        console.log(metadata);
      }
  },
    whatMode() {
      console.log(process.env.VUE_APP_HELPER)
    },
    updateTime() {
      this.currentTime = this.playing.currentTime
      // console.log(this.playing)
      // console.log(this.playing.duration)
      this.songDuration = this.playing.duration
      this.currentTimeSeconds = parseInt(this.playing.currentTime % 60) < 10? `0${parseInt(this.playing.currentTime % 60)}` : parseInt(this.playing.currentTime % 60);
      this.currentTimeMinutes = parseInt((this.playing.currentTime / 60) % 60);

    },
    convertToTimeStamp(seconds) {
      const uiSeconds = parseInt(seconds % 60) < 10? `0${parseInt(seconds % 60)}` : parseInt(seconds % 60);
      const uiMinutes = parseInt((seconds / 60) % 60);

      return `${uiMinutes}:${uiSeconds}`;

    },
    loaded() {
      this.currentTime = 0
      this.songState = false
      console.log('mounted')
      this.playing = this.$refs.audio
      console.log(this.playing)
      this.songDuration = this.playing.duration
      this.playing.addEventListener('timeupdate', this.updateTime);
      this.setMetaData(this.src)

    },
    playNext() {

    },
    playPrevious() {

    },
    rewind() {
      this.playing.pause()
      this.playing.currentTime = this.playing.currentTime - 10;
      this.play()
    },
    fastforward() {
      this.playing.pause()
      this.playing.currentTime = this.playing.currentTime + 10;
      this.play()
    },
    play() {
      console.log('play')
      this.songState = true;
      this.playing.play();
    },
    pause() {
      console.log('pause')
      this.songState = false;
      this.playing.pause();
    },
    playPause() {
      if (this.songState){
        // play the audio that is selected
        this.playing.play();
        return
      }
      // pause the audio
      this.playing.pause();
    }
  }
}
</script>
