var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

clock = new THREE.Clock();

camera.position.z = 25;

var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
var geometry = new THREE.Geometry();

for (var i = 0; i < 5; i++) {
  geometry.vertices.push(new THREE.Vector3(
    getRandomInt(-10, 10),
    getRandomInt(-10, 10),
    getRandomInt(-10, 10)
  ));
}

var line = new THREE.Line(geometry, material);
scene.add(line);

var lastUpdate = 0.0;

function updateLine() {
  geometry.vertices.shift();
  geometry.vertices.push(new THREE.Vector3(
    getRandomInt(-10, 10),
    getRandomInt(-10, 10),
    getRandomInt(-10, 10)
  ));
  geometry.verticesNeedUpdate = true;
}

function render() {
  requestAnimationFrame(render);

  if ((clock.getElapsedTime() - lastUpdate) > 1.0) {
    updateLine();
    lastUpdate = clock.getElapsedTime();
  }

  renderer.render(scene, camera);
}

if (Detector.webgl) {
  render();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
