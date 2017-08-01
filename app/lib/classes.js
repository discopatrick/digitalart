var THREE = require('three');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getLineCube() {

  var material = new THREE.LineBasicMaterial({ color: 0xffffff });
  var geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(-10, 10, -10));
  geometry.vertices.push(new THREE.Vector3(10, 10, -10));
  geometry.vertices.push(new THREE.Vector3(10, -10, -10));
  geometry.vertices.push(new THREE.Vector3(-10, -10, -10));
  geometry.vertices.push(new THREE.Vector3(-10, 10, -10));
  geometry.vertices.push(new THREE.Vector3(-10, 10, 10));
  geometry.vertices.push(new THREE.Vector3(10, 10, 10));
  geometry.vertices.push(new THREE.Vector3(10, -10, 10));
  geometry.vertices.push(new THREE.Vector3(-10, -10, 10));
  geometry.vertices.push(new THREE.Vector3(-10, 10, 10));
  geometry.vertices.push(new THREE.Vector3(10, 10, 10));
  geometry.vertices.push(new THREE.Vector3(10, 10, -10));
  geometry.vertices.push(new THREE.Vector3(10, -10, -10));
  geometry.vertices.push(new THREE.Vector3(10, -10, 10));
  geometry.vertices.push(new THREE.Vector3(-10, -10, 10));
  geometry.vertices.push(new THREE.Vector3(-10, -10, -10));

  var line = new THREE.Line(geometry, material);

  return line;
}

function getRandomVector3(min, max) {
  return new THREE.Vector3(
    getRandomInt(min, max),
    getRandomInt(min, max),
    getRandomInt(min, max)
  )
}

function getNextBezier(bezier) {

  var nextBezier = new THREE.CubicBezierCurve3(
    bezier.v3,
    new THREE.Vector3(
      getMirroredCoord(bezier.v3.x, bezier.v2.x),
      getMirroredCoord(bezier.v3.y, bezier.v2.y),
      getMirroredCoord(bezier.v3.z, bezier.v2.z)
    ),
    new THREE.Vector3(getRandomInt(-10,10),getRandomInt(-10,10),getRandomInt(-10,10)),
    new THREE.Vector3(getRandomInt(-10,10),getRandomInt(-10,10),getRandomInt(-10,10))
  )

  return nextBezier;
}

function getMirroredCoord(pivot, coord) {
  var delta = pivot - coord;
  var mirror = pivot + delta;
  return mirror;
}

class Worm {
  constructor() {
    this.BODYLENGTH = 10;
    this.body = new Array();
    this.speed = 1;

    for (var i = 0; i < this.BODYLENGTH; i++) {
      this.body.push(new Array(0,0,0));
    }
  }

  get head() {
    return this.body[0]
  }

  move() {
    // get random new position, based on current position of "head"
    var nextPos = this.getNextPosition(this.head);

    // use new position as the new "head"
    this.body.unshift(nextPos);

    // chop off the end of the "tail"
    this.body.pop();
  }

  getNextPosition(fromThisPosition) {
    var x = fromThisPosition[0];
    var y = fromThisPosition[1];
    var z = fromThisPosition[2];

    var direction = getRandomInt(1,6);

    switch(direction) {
      case 1:
        x += this.speed;
        break;
      case 2:
        x -= this.speed;
        break;
      case 3:
        y += this.speed;
        break;
      case 4:
        y -= this.speed;
        break;
      case 5:
        z += this.speed;
        break;
      case 6:
        z -= this.speed;
        break;
    }

    return new Array(x, y, z);
  }
}

export { Worm, getLineCube, getRandomVector3, getNextBezier, getMirroredCoord };
