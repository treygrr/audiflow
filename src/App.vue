<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style>
p, a, h1, h2, h3, h4, h5 {
  color: white !important;
}
html {
  overflow: hidden !important;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
  padding: 50px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 132, 255, 0.7); 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255, .2); 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255, .5); 
}
</style>