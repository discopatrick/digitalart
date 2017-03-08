$(document).ready(function(){

  // show the artwork specified in the querystring
  script = getParameterByName('show');
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

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function getNextBezier(bezier) {

  var nextBezier = new THREE.CubicBezierCurve3(
    bezier.v3,
    new THREE.Vector3(
      getMirroredCoord(bezier.v3.x, bezier.v2.x),
      getMirroredCoord(bezier.v3.y, bezier.v2.y),
      getMirroredCoord(bezier.v3.z, bezier.v2.z)
    ),
    new THREE.Vector3(getRandomInt(-10,10),getRandomInt(-10,10),getRandomInt(-10,10)),
    new THREE.Vector3(getRandomInt(-10,10),getRandomInt(-10,10),getRandomInt(-10,10))
  )

  return nextBezier;
}

function getMirroredCoord(pivot, coord) {
  var delta = pivot - coord;
  var mirror = pivot + delta;
  return mirror;
}

function Worm() {

  this.BODYLENGTH = 10;
  this.body = new Array();
  this.speed = 1;

  // initialise body
  for (var i = 0; i < this.BODYLENGTH; i++) {
    this.body.push(new Array(0,0,0));
  }

  this.head = function() {
    return this.body[0];
  }

  this.move = function() {
    // get random new position, based on current position of "head"
    var nextPos = this.getNextPosition(this.head());

    // use new position as the new "head"
    this.body.unshift(nextPos);

    // chop off the end of the "tail"
    this.body.pop();
  }

  this.getNextPosition = function(fromThisPosition) {

    var x = fromThisPosition[0];
    var y = fromThisPosition[1];
    var z = fromThisPosition[2];

    var direction = getRandomInt(1,6);

    switch(direction) {
      case 1:
        x += this.speed;
        break;
      case 2:
        x -= this.speed;
        break;
      case 3:
        y += this.speed;
        break;
      case 4:
        y -= this.speed;
        break;
      case 5:
        z += this.speed;
        break;
      case 6:
        z -= this.speed;
        break;          
    }

    return new Array(x, y, z);
  }
}

function CurvyWorm() {

  this.body = new Array();

  // initialise body
  this.body.push(
    new Array(
      new Array(0,0,0), // start point
      new Array(0,0,0), // start control point
      new Array( // end control point
        getRandomInt(-10, 10),
        getRandomInt(-10, 10),
        getRandomInt(-10, 10)        
      ),
      new Array( // end point
        getRandomInt(-10, 10),
        getRandomInt(-10, 10),
        getRandomInt(-10, 10)
      )
    )
  );

  this.addSegment = function() {
    lastSegment = this.body[this.body.length - 1];
    this.body.push(
      new Array(
        new Array( // start point matches last end point
          lastSegment[3][0],
          lastSegment[3][1],
          lastSegment[3][2]
        ),
        new Array( // start control point mirrors last end control point
          getMirroredCoord(lastSegment[3][0], lastSegment[2][0]),
          getMirroredCoord(lastSegment[3][1], lastSegment[2][1]),
          getMirroredCoord(lastSegment[3][2], lastSegment[2][2])
        ),
        new Array( // end control point
          getRandomInt(-10, 10),
          getRandomInt(-10, 10),
          getRandomInt(-10, 10)        
        ),
        new Array( // end point
          getRandomInt(-10, 10),
          getRandomInt(-10, 10),
          getRandomInt(-10, 10)
        )
      )
    );
  }
}
