var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var curve = new THREE.CubicBezierCurve3(
  new THREE.Vector3(0,0,0),
  new THREE.Vector3(10,0,0),
  new THREE.Vector3(10,0,10),
  new THREE.Vector3(10,10,10)
)
var geometry = new THREE.Geometry();
geometry.vertices = curve.getPoints(20);
var material = new THREE.LineBasicMaterial({color: 0xffffff});
var curveObject = new THREE.Line(geometry, material);
scene.add(curveObject);

var cameraDistance = 30;
var cameraPos = 0;
camera.position.y = 20;

function render() {
  requestAnimationFrame(render);

  cameraPos += 0.003;
  camera.position.x = cameraDistance * Math.cos(cameraPos);
  camera.position.z = cameraDistance * Math.sin(cameraPos);
  camera.lookAt(new THREE.Vector3(0,0,0));

  renderer.render(scene, camera);
}

if (Detector.webgl) {
  render();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
