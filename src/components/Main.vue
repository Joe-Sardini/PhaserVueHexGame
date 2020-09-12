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
import GameScene from '../scenes/GameScene'
import HexagonPlugin from "../plugins/hexagon-plugin";

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
          scene: [GameScene]
      },
      plugins: {
        scene: [{
            key: 'rexHexagon',
            plugin: HexagonPlugin,
            start: true,
        },
        ]
      }
    };
  }
}; 
</script>

<style scoped>
</style>
