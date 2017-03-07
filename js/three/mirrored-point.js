var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(0.1, 32, 32);
var material = new THREE.MeshBasicMaterial({color: 0xffffff});
var pivot = new THREE.Mesh(geometry, material);
scene.add(pivot);

var geometry = new THREE.SphereGeometry(0.1, 32, 32);
var material = new THREE.MeshBasicMaterial({color: 0xff0000});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
sphere.position.set(-10,-10,-10);

var geometry = new THREE.SphereGeometry(0.1, 32, 32);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var mirror = new THREE.Mesh(geometry, material);
scene.add(mirror);
mirror.position.set(
  getMirroredCoord(pivot.position.x, sphere.position.x),
  getMirroredCoord(pivot.position.y, sphere.position.y),
  getMirroredCoord(pivot.position.z, sphere.position.z)
);

camera.position.z = 25;

function render() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

if (Detector.webgl) {
  render();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
