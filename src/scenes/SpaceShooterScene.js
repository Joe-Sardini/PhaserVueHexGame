import Phaser from "phaser";

export default class SpaceShooterGameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
  }
  //demos-window.png
  preload() {
    this.load.image("mainModal", "../assets/demos-window.png");
  }

  create() {
    this.mouseScenePointerDown();
  }

  mouseScenePointerOn() {
    this.input.on(
      "pointerdown",
      (pointer) => {
        console.log(pointer.x);
        console.log(pointer.y);
      },
      this
    );
  }

  update() {}
}
