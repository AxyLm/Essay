<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './views/home/index.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
@import url('./style/media.css');
</style>
