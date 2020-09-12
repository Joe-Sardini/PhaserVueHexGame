import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
  }

  preload() {}

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

    this.input.on(
      "gameobjectup",
      function(_, gameObject) {
        gameObject.emit("clicked", gameObject);
      },
      this
    );
  }

  update() {}
}

function clickHandler(hex) {
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
    .on("clicked", clickHandler, this)
    // set hit area
    .setInteractive(hexagon, Phaser.Geom.Polygon.Contains);

  return graphics;
};
