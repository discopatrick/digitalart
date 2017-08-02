var THREE = require('three');
import { ThreeWrapper } from '../lib/wrapper'
import { getLineCube, getRandomVector3, getNextBezier } from '../lib/classes'

class CurvyWorm extends ThreeWrapper {

  // TODO: this class is too full of the 'this' keyword - any way to make it more readable?

  setup() {
    this.scene.add(getLineCube())

    this.curvePath = new THREE.CurvePath();
    this.curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0,0,0),
      getRandomVector3(-10, 10),
      getRandomVector3(-10, 10),
      getRandomVector3(-10, 10)
    )
    this.curvePath.add(this.curve);
    this.curve = getNextBezier(this.curve);
    this.curvePath.add(this.curve);

    this.curveRes = 100;
    this.curvePoints = this.curvePath.getPoints(this.curveRes);
    this.geometry = new THREE.Geometry();
    this.startPoint = 0;
    this.bodyLength = 20;
    this.geometry.vertices = this.curvePoints.slice(this.startPoint, this.startPoint + this.bodyLength);
    var material = new THREE.LineBasicMaterial({color: 0xffffff});
    var curveObject = new THREE.Line(this.geometry, material);
    this.scene.add(curveObject);

    this.cameraDistance = 30;
    this.cameraPos = 0;
    this.camera.position.y = 20;

  }

  render() {
    this.cameraPos += 0.003;
    this.camera.position.x = this.cameraDistance * Math.cos(this.cameraPos);
    this.camera.position.z = this.cameraDistance * Math.sin(this.cameraPos);
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    this.startPoint++;
    if (this.startPoint%100 > 80) {
      this.curve = getNextBezier(this.curve);
      this.curvePath.add(this.curve);
      this.curvePoints = this.curvePath.getPoints(this.curveRes);
    }
    this.geometry.vertices = this.curvePoints.slice(this.startPoint, this.startPoint + this.bodyLength);
    this.geometry.verticesNeedUpdate = true;
  }
}

export { CurvyWorm };
