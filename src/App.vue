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
  background-color: rgba(0, 0, 0, .7);
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255, .2); 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255, .3); 
  
}
</style>