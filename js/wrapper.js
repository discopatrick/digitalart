function ThreeWrapper() {

  var self = this;

  if (!Detector.webgl) {
    var warning = Detector.getWebGLErrorMessage();
    document.body.appendChild(warning);
  }

  self.scene = new THREE.Scene();
  self.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  self.camera.position.z = 25;
  self.renderer = new THREE.WebGLRenderer();

  self.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(self.renderer.domElement);

  self.render = function() {
    // leave empty, can be defined later
  }

  self.animate = function() {
    requestAnimationFrame(self.animate);
    self.render();
    self.renderer.render(self.scene, self.camera);
  }
}
