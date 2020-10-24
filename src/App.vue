<template>
  <div id="app">
    <Main />
    <SpaceShooter />
  </div>
</template>

<script>
import Main from './components/Main.vue'
import SpaceShooter from './components/SpaceShooter.vue'

export default {
  name: 'App',
  components: {
    Main,
    SpaceShooter
  }
}
</script>

<style>

</style>
