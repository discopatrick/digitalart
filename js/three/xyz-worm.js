var line;

function draw(worm) {

  scene.remove(line);

  var material = new THREE.LineBasicMaterial({ color: 0xffffff });
  var geometry = new THREE.Geometry();

  for (var i = 0; i < worm.body.length; i++) {
    geometry.vertices.push(
      new THREE.Vector3(
        worm.body[i][0],
        worm.body[i][1],
        worm.body[i][2]
      )
    );
  }

  line = new THREE.Line(geometry, material);

  scene.add(line)
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

var worm = new Worm();

function render() {
  requestAnimationFrame(render);

  cameraPos += 0.003;

  camera.position.x = cameraDistance * Math.cos(cameraPos);
  camera.position.z = cameraDistance * Math.sin(cameraPos);
  camera.lookAt(new THREE.Vector3(0,0,0));

  worm.move();
  draw(worm);

  renderer.render(scene, camera);
}

if (Detector.webgl) {
  render();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
