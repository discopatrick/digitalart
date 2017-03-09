var tw = new ThreeWrapper();

tw.scene.add(getLineCube());

var curvePath = new THREE.CurvePath();
var curve = new THREE.CubicBezierCurve3(
  new THREE.Vector3(0,0,0),
  getRandomVector3(-10, 10),
  getRandomVector3(-10, 10),
  getRandomVector3(-10, 10)
)
curvePath.add(curve);
curve = getNextBezier(curve);
curvePath.add(curve);

var curveRes = 100;
var curvePoints = curvePath.getPoints(curveRes);
var geometry = new THREE.Geometry();
var startPoint = 0;
var bodyLength = 20;
geometry.vertices = curvePoints.slice(startPoint, startPoint+bodyLength);
var material = new THREE.LineBasicMaterial({color: 0xffffff});
var curveObject = new THREE.Line(geometry, material);
tw.scene.add(curveObject);

var cameraDistance = 30;
var cameraPos = 0;
tw.camera.position.y = 20;

tw.render = function() {
  cameraPos += 0.003;
  tw.camera.position.x = cameraDistance * Math.cos(cameraPos);
  tw.camera.position.z = cameraDistance * Math.sin(cameraPos);
  tw.camera.lookAt(new THREE.Vector3(0,0,0));

  startPoint++;
  if (startPoint%100 > 80) {
    curve = getNextBezier(curve);
    curvePath.add(curve);
    curvePoints = curvePath.getPoints(curveRes);
  }
  geometry.vertices = curvePoints.slice(startPoint, startPoint+bodyLength);
  geometry.verticesNeedUpdate = true;
}

tw.animate();
