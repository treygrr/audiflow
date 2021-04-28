<template>
  <div class="home" :style="background? 'background-image: url(\'local-resource://'+background+'\');':''">
    <figure class="image-figure">
      <img class="logo" src="../assets/audiflow.png">
    </figure>
    <div class="navbar">
      <div class="system-drag"></div>
      <div class="system-controls">
        <v-btn x-small depressed tile color="transparent" @click="minimizeApp()">
          <v-icon color="white" height="10px" width="10px">mdi-minus</v-icon>
        </v-btn>
        <v-btn x-small depressed tile color="transparent" @click="closeApp()">
          <v-icon color="white" height="10px" width="10px">mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <div :class="`${this.playerVisible? 'page-wrapper-expanded':''} ${this.stopAnimations? 'no-transition':''} page-wrapper`">
      <h1 v-if="background">{{ background }}</h1>
      <nav class="App__nav">
        <router-link to="/">Library</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
      <router-view />
     
    </div>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated slideInUp"
      leave-active-class="animated bounceOutRight"
    >

    <player :class="`${this.playerVisible? 'audio-player-show':''} audio-player`" />
  </transition>
  </div>
</template>


<style scoped>
@media screen and (min-width: 0px) {
  .no-transition {
    transition: none !important;
  }
  .page-wrapper {
    transition: all .5s ease-in-out;
    height: calc(100vh - px);
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    position: relative;
    overflow-y: auto;
  }

  .page-wrapper-expanded {
    transition: all .5s ease-in-out;
    height: calc(100vh - 112px);
    
  }
  .audio-player {
    transition: all .5s ease-in-out;
    position: absolute;
    bottom: -120px;
    left: 0px;
  }

  .audio-player-show {
    transition: all .5s ease-in-out;
    bottom: 0px;
  }

  .system-drag {
    width: calc(100% - 85px);
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }

  .title-bar {
    width: 15%;
  }

  .image-figure {
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow: show;
    z-index: 100;
  }

  .logo {
    pointer-events: none;
    max-width: 100px;
  }

  .navbar {
    display: flex;
    flex-direction: row;
    width: 100%;
    backdrop-filter: blur(10px);
    background: linear-gradient(130deg, rgba(2,0,36,.1) 0%, rgba(7,6,92,.1) 25%, rgba(9,9,121,.1) 41%, rgba(4,112,189,.1) 53%, rgba(8,28,133,.1) 75%, rgba(0,212,255,.1) 100%);
  }

  .system-controls {
    width: 85px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;  
  }

  .home {

    background-color: lightseagreen;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
  }
}

@media screen and (min-width: 960px) {
  .page-wrapper {
    height: calc(100vh - 20px);
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    position: relative;
  }

  .page-wrapper-expanded {
    transition: all .5s ease-in-out;
    height: calc(100vh - 120px);
    
  }
}
</style>
<script>
import Player from '../components/Player';

export default {
  name: 'MainLayout',
  components: {
    Player
  },
  computed: {
    playerVisible: function () {
      return this.$store.state.playing.playerVisible;
    },
    stopAnimations: function() {
      return this.$store.state.playing.stopAnimations;
    },
    background: function() {
      const str = this.$store.state.playing.background.replace(/(\\)/g,"\\\\");
      return str
    }
  },
  created() {
    // This stop the UI from slowly readjusting to a new window frame. Makes the UI look cleaner
    window.onresize = (e) =>{
      if (e) {
        this.$store.commit('playing/SET_ANIMATIONS', true);
        return
      }
    };
  },
  methods: {
    minimizeApp() {
      this.$ipcRenderer.invoke('minimize').then((result) => {
        console.log(result)
      })
    },
    closeApp() {
      this.$ipcRenderer.invoke('close').then((result) => {
        console.log(result)
      })
    },
  }
}
</script>
