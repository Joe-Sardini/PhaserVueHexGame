import Phaser from "phaser";

let starGraphics;
let starsGraphics = [];

export default class SpaceShooterGameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
  }
  
  preload() {
    this.load.atlas('gems', '../assets/animations/diamond.png', '../assets/animations/diamond.json');
    this.load.text('bevelledcube', '../assets/text/bevelledcube.obj');
    this.load.text('chaosphere', '../assets/text/chaosphere.obj');
    this.load.text('computer', '../assets/text/computer.obj');
    this.load.text('geosphere', '../assets/text/geosphere.obj');
    this.load.text('implodedcube', '../assets/text/implodedcube.obj');
    this.load.text('monobird', '../assets/text/monobird.obj');
    this.load.text('spike', '../assets/text/spike.obj');
    this.load.text('teapot', '../assets/text/teapot.obj');
    this.load.text('torus', '../assets/text/torus.obj');
    this.load.image('background', '../assets/images/BG_Space3.jpg');
  }

  create() {
    this.mouseScenePointerOn();
    this.drawObject(600,635,200);
    this.drawObject(300,300,200);
    this.drawObject(900,300,200);
    this.drawObject(600,300,50);
    this.createDiamond();
    this.createStar();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background').depth = -2;
  }

  createStar() {
    starGraphics = this.add.graphics({x: 200, y: 200});
    starsGraphics.push(starGraphics);
    starGraphics = this.add.graphics({x: 600, y: 600});
    starsGraphics.push(starGraphics);
    starGraphics = this.add.graphics({x: 800, y: 800});
    starsGraphics.push(starGraphics);
    starGraphics = this.add.graphics({x: 1000, y: 400});
    starsGraphics.push(starGraphics);

    for (const star of starsGraphics){
      this.drawStar(star, 50, 25,  5, 50, 12.5, 0xFFFF00, 0xFF0000);
    }
  }

  createDiamond(){
    this.anims.create({
      key: 'diamond',
      frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
      frameRate: 16,
      yoyo: true,
      repeat: -1,
      repeatDelay: 300
    });
    this.add.sprite(300, 420, 'gems').play('diamond').setScale(4);
  }

  drawStar (graphics, cx, cy, spikes, outerRadius, innerRadius, color, lineColor) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;
    graphics.lineStyle(10, lineColor, 1.0);
    graphics.fillStyle(color, 1.0);
    graphics.beginPath();
    graphics.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        graphics.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        graphics.lineTo(x, y);
        rot += step;
    }
    graphics.lineTo(cx, cy - outerRadius);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();
  }

  drawObject(x, y, radius) {
    let graphics = this.add.graphics(100, 100);
    // set a fill and line style
    graphics.lineStyle(50, 0xffffff);
    graphics.beginPath();
    graphics.arc(x, y, radius, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), false, 0.02);
    graphics.strokePath();
    graphics.closePath();

    graphics.beginPath();
    graphics.lineStyle(20, 0xff00ff);
    graphics.arc(x, y, radius, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true, 0.02);
    graphics.strokePath();
    graphics.closePath();
    return graphics;
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

  update() {
    let idx = 1;
    for (const star of starsGraphics){
      star.rotation += 0.02*idx;
      star.scaleX = generateRandomNumber() + Math.abs(Math.sin(star.rotation));
      star.scaleY = generateRandomNumber() + Math.abs(Math.sin(star.rotation));  
      idx++;
    }
  }
}

function generateRandomNumber() {
    const min = 0.0200;
    const max = 0.120;
    return Math.random() * (max - min) + min;
}
