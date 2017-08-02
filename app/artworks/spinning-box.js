var THREE = require('three');
import { ThreeWrapper } from '../lib/wrapper'
import { getLineCube } from '../lib/classes'

class SpinningBox extends ThreeWrapper {

  setup() {
    this.scene.add(getLineCube())
    this.cameraPos = 0;
    this.cameraDistance = 30;
  }

  render() {
    this.cameraPos += 0.003;

    this.camera.position.x = this.cameraDistance * Math.cos(this.cameraPos);
    this.camera.position.z = this.cameraDistance * Math.sin(this.cameraPos);
    this.camera.lookAt(new THREE.Vector3(0,0,0));
  }

}

export { SpinningBox };
