class ThreeWrapper {
  constructor() {
    if (!Detector.webgl) {
      var warning = Detector.getWebGLErrorMessage();
      document.body.appendChild(warning);
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 25;
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  render() {
    // leave empty, can be defined later
  }

  animate() {
    requestAnimationFrame(() => { this.animate() } );
    this.render();
    this.renderer.render(this.scene, this.camera);
  }
}
