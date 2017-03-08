var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(getLineCube());

var worm = new Array(
  new CurvyWorm(),
  null
);
worm[0].addSegment();
worm[0].addSegment();

function draw(worm) {

  var wormObj = worm[0];
  var curveObject = worm[1];

  if (curveObject != null) {
    scene.remove(curveObject);
    curveObject.material.dispose();
    curveObject.geometry.dispose();
    curveObject.dispose();
  }

  var curvePath = new THREE.CurvePath();

  for (var i = 0; i < wormObj.body.length; i++) {

    var start = wormObj.body[i][0];
    var startControl = wormObj.body[i][1];
    var endControl = wormObj.body[i][2];
    var end = wormObj.body[i][3];

    var curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(start[0], start[1], start[2]),
      new THREE.Vector3(startControl[0], startControl[1], startControl[2]),
      new THREE.Vector3(endControl[0], endControl[1], endControl[2]),
      new THREE.Vector3(end[0], end[1], end[2])
    );
    curvePath.add(curve);
    console.log(curve);
  }

  var geometry = new THREE.Geometry();
  geometry.vertices = curvePath.getPoints(20);
  var material = new THREE.LineBasicMaterial({color: 0xffffff});
  curveObject = new THREE.Line(geometry, material);
  scene.add(curveObject);

}

draw(worm);

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
