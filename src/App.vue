<template>
  <div id="app">
    <Painikepeli/>
  </div>
</template>

<script>

import Painikepeli from './components/Painikepeli.vue'

export default {
  name: 'App',
  components: {
    Painikepeli
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
