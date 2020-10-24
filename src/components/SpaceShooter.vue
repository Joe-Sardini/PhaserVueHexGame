<template>
  <div>
    <ion-phaser
      v-bind:game.prop='game'
      v-bind:initialize.prop='initialize'
    />
  </div>
</template>

<script>

import Phaser from "phaser";
import SpaceShooterGameScene from '../scenes/SpaceShooterScene'

export default {
  data() {
    return {
      initialize: true,
      game: {
        width: "100%",
        height: "100%",
        type: Phaser.AUTO,
          physics: {
          default: 'arcade',
            arcade: {
              gravity: { y: 300 }
            }
          },
          scene: [SpaceShooterGameScene]
      }
          };
  }
}; 
</script>

<style scoped>
</style>