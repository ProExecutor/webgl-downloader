function loadFile(url, data, callback, errorCallback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        callback(request.responseText, data);
      } else {
        errorCallback(url);
      }
    }
  };
  request.send(null);
}

function loadFiles(urls, callback, errorCallback) {
  var numUrls = urls.length;
  var numComplete = 0;
  var result = [];
  function partialCallback(text, urlIndex) {
    result[urlIndex] = text;
    numComplete++;
    if (numComplete == numUrls) {
      callback(result);
    }
  }
  for (var i = 0; i < numUrls; i++) {
    loadFile(urls[i], i, partialCallback, errorCallback);
  }
}

var gl; // ... set up WebGL ...

loadFiles(['vertex.shader', 'fragment.shader'], function(shaderText) {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, shaderText[0]);
  // ... compile shader, etc ...
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, shaderText[1]);
  // ... set up shader program and start render loop timer
}, function(url) {
  alert('Failed to download "' + url + '"');
});
