var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(getLineCube());

var cameraDistance = 30;
var cameraPos = 0;
camera.position.y = 20;

var currentPosition = new THREE.Vector3(0,0,0);

var x, y, z;
var speed = 1;

function getNextVector(currentVector) {

  var direction = getRandomInt(1,6);
  var x = currentVector.x;
  var y = currentVector.y;
  var z = currentVector.z;

  switch(direction) {
    case 1:
      x += speed;
      break;
    case 2:
      x -= speed;
      break;
    case 3:
      y += speed;
      break;
    case 4:
      y -= speed;
      break;
    case 5:
      z += speed;
      break;
    case 6:
      z -= speed;
      break;          
  }

  return new THREE.Vector3(x,y,z);

}

function render() {
  requestAnimationFrame(render);

  cameraPos += 0.003;

  nextPosition = getNextVector(currentPosition);

  var material = new THREE.LineBasicMaterial({ color: 0xffffff });
  var geometry = new THREE.Geometry();

  geometry.vertices.push(currentPosition);
  geometry.vertices.push(nextPosition);

  var line = new THREE.Line(geometry, material);
  scene.add(line)

  currentPosition = nextPosition;

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
