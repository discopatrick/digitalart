function getLineCube() {

  var material = new THREE.LineBasicMaterial({ color: 0xffffff });
  var geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(-10, 10, -10));
  geometry.vertices.push(new THREE.Vector3(10, 10, -10));
  geometry.vertices.push(new THREE.Vector3(10, -10, -10));
  geometry.vertices.push(new THREE.Vector3(-10, -10, -10));
  geometry.vertices.push(new THREE.Vector3(-10, 10, -10));
  geometry.vertices.push(new THREE.Vector3(-10, 10, 10));
  geometry.vertices.push(new THREE.Vector3(10, 10, 10));
  geometry.vertices.push(new THREE.Vector3(10, -10, 10));
  geometry.vertices.push(new THREE.Vector3(-10, -10, 10));
  geometry.vertices.push(new THREE.Vector3(-10, 10, 10));
  geometry.vertices.push(new THREE.Vector3(10, 10, 10));
  geometry.vertices.push(new THREE.Vector3(10, 10, -10));
  geometry.vertices.push(new THREE.Vector3(10, -10, -10));
  geometry.vertices.push(new THREE.Vector3(10, -10, 10));
  geometry.vertices.push(new THREE.Vector3(-10, -10, 10));
  geometry.vertices.push(new THREE.Vector3(-10, -10, -10));

  var line = new THREE.Line(geometry, material);

  return line;
}
