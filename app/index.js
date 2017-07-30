var THREE = require('three');
import { Worm, getLineCube } from './lib';

function draw(worm) {

  var wormObj = worm[0];
  var line = worm[1];

  if (line != null) {
    scene.remove(line);
  }

  var material = new THREE.LineBasicMaterial({ color: 0xffffff });
  var geometry = new THREE.Geometry();

  for (var i = 0; i < wormObj.body.length; i++) {
    geometry.vertices.push(
      new THREE.Vector3(
        wormObj.body[i][0],
        wormObj.body[i][1],
        wormObj.body[i][2]
      )
    );
  }

  line = new THREE.Line(geometry, material);
  worm[1] = line;

  scene.add(line)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(getLineCube());

var cameraDistance = 30;
var cameraPos = 0;
camera.position.y = 20;

var wormCount = 10;
var worms = new Array();

for (var i = 0; i < wormCount; i++) {
  worms.push(
    new Array(
      new Worm(),
      null
    )
  );
}

function render() {
  requestAnimationFrame(render);

  cameraPos += 0.003;

  camera.position.x = cameraDistance * Math.cos(cameraPos);
  camera.position.z = cameraDistance * Math.sin(cameraPos);
  camera.lookAt(new THREE.Vector3(0,0,0));

  for (var i = 0; i < worms.length; i++) {
    worms[i][0].move();
    draw(worms[i]);
  }

  renderer.render(scene, camera);
}

// TODO: fix Detector
// if (Detector.webgl) {
  render();
// } else {
//     var warning = Detector.getWebGLErrorMessage();
//     document.getElementById('container').appendChild(warning);
// }
