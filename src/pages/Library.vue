<template>
  <div class="mainpage">
     <section class="mb-md-4">
        <v-btn @click.native="setChill()">chill.mp3</v-btn>
        <v-btn @click.native="setAlone()">finally alone.mp3</v-btn>
        <v-btn @click.native="togglePlayer()">Toggle Player</v-btn>
        <v-btn @click.native="selectDirs()">select dir</v-btn>
        <v-btn @click.native="setBackground()">setBackground</v-btn>
      </section>
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    setChill() {
      this.$store.commit('playing/SET_CURRENT_SONG', 'C:\\chill.mp3');
      this.playerVisibile = true
    },
    setAlone() {
      this.$store.commit('playing/SET_CURRENT_SONG', 'C:\\finally_alone.mp3');
      this.playerVisibile = true
    },
    minimizeApp() {
      this.$ipcRenderer.invoke('minimize').then((result) => {
        console.log(result)
      })
    },
    selectDirs(){
      this.$ipcRenderer.invoke('select-dirs').then((result) => {
        console.log(result)
      })
    },
    setBackground(){
      this.$ipcRenderer.invoke('select-background').then((result) => {
        this.$store.commit('playing/SET_BACKGROUND', result)
        console.log(result)
      })
    },
    closeApp() {
      this.$ipcRenderer.invoke('close').then((result) => {
        console.log(result)
      })
    },
    togglePlayer() {
      this.$store.commit('playing/TOGGLE_PLAYER_VISIBLE')
    }
  }
}
</script>