var THREE = require('three');
import { ThreeWrapper } from './lib/wrapper'
import { SpinningBox } from './artworks/spinning-box.js'
import { CurvyWorm } from './artworks/curvy-worm.js'

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

var classMap = {
   SpinningBox: SpinningBox,
   CurvyWorm: CurvyWorm
};

var artwork = getParameterByName('show');

var className = artwork.replace(/(\-|^)([a-z])/gi, function (match, delimiter, hyphenated) {
    return hyphenated.toUpperCase();
});

var animation = new classMap[className]()
animation.start()
