import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
  }
  //demos-window.png
  preload() {
    this.load.image("mainModal", "../assets/demos-window.png");
  }

  makeHexGrid() {
    let hexagon = new Phaser.Geom.rexHexagon(0, 0, 20, 0);
    for (let x = 1; x < 30; x++) {
      for (let y = 1; y < 20; y++) {
        let xPos = 100 + x * 35;
        let yPos = 100 + y * 40 + (x % 2 > 0 ? 20 : 0);
        HexagonShape(
          this,
          hexagon,
          0x94a8eb,
          0xffffff,
          1,
          `${xPos},${yPos}`
        ).setPosition(xPos, yPos);
      }
    }
  }

  create() {
    this.makeHexGrid();

    let mainModal = this.add.image(0, 0, "mainModal").setOrigin(0);
    this.add
      .text(32, 34, "10000", {
        fontSize: "10px",
      })
      .setInteractive().depth = 11;

    mainModal.depth = 10;

    let ModalMainContainer = this.add.container(32, 70, [mainModal]);

    ModalMainContainer.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, mainModal.width, mainModal.height),
      Phaser.Geom.Rectangle.Contains
    );

    this.input.setDraggable(ModalMainContainer);

    ModalMainContainer.depth = 8;
    ModalMainContainer.on("drag", function(pointer, dragX, dragY) {
      this.x = dragX;
      this.y = dragY;
    });
    ModalMainContainer.on("clicked", modalWindowClick, window);

    this.input.on(
      "gameobjectup",
      function(_, gameObject) {
        gameObject.emit("clicked", gameObject);
      },
      this
    );

    this.mouseStuff(ModalMainContainer);
  }

  createBase() {
    this.add.text(120, 155, "10000", { fontSize: "10px" }).depth = 1;
  }

  mouseStuff(window) {
    this.input.on(
      "pointerdown",
      (pointer) => {
        window.visible = true;
        console.log(pointer.x);
        console.log(pointer.y);
      },
      this
    );
  }

  update() {}
}

function modalWindowClick(window) {
  window.visible = false;
}

function clickHandlerHex(hex) {
  const hexagon = new Phaser.Geom.rexHexagon(0, 0, 20, 0);
  const [x, y] = hex.getData("loc").split(",");
  const hexColor = hex.getData("fillColor");
  let scene = hex.scene;
  hex.destroy();

  HexagonShape(
    scene,
    hexagon,
    hexColor === 0x94a8eb ? 0xff0000 : 0x94a8eb,
    0xffffff,
    1,
    `${x},${y}`
  ).setPosition(x, y);
}

var HexagonShape = function(
  scene,
  hexagon,
  fillColor,
  lineColor,
  lineWidth,
  text
) {
  var points = hexagon.points;
  // draw shape on a Graphics object
  var graphics = scene.add
    .graphics()
    .fillStyle(fillColor)
    .fillPoints(points, true)
    .lineStyle(lineWidth, lineColor)
    .strokePoints(points, true)
    .setData({ loc: text, fillColor: fillColor })
    .on("clicked", clickHandlerHex, this)
    // set hit area
    .setInteractive(hexagon, Phaser.Geom.Polygon.Contains);

  return graphics;
};
