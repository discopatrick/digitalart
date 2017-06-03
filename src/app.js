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

$(document).ready(function(){

  // show the artwork specified in the querystring
  var script = getParameterByName('show');
  console.log(script);
  if (script == null) {
    script = 'curvy-worm-2';
    window.location.href = './?show=' + script;
  }
  $.getScript('./js/three/' + script + '.js');

  // populate the title tag
  $("title").text(script);

  // populate and update the dropdown
  $.ajax({
      url : "https://api.github.com/repos/discopatrick/digitalart/contents/js/three",
      success: function(artworks) {
        for (var i = 0; i < artworks.length; i++) {
          var option = artworks[i].name.substring(0, artworks[i].name.indexOf('.js'));
          $('#artworks').append($('<option>', {
            value: option,
            text: option
          }));
        }
        $('#artworks > option[value="' + script + '"]').prop('selected', true);
      },
      async: true
  });

  // load a new artwork upon dropdown change
  $('#artworks').change(function(){
      var artwork = $('#artworks option:selected').val();
      console.log(artwork);
      window.location.href = './?show=' + artwork;
  });

});
