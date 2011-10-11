(function(win) {

  function supports(feature) {
    var supported = false, m;
    if (feature == 'placeholder') {
      var el = document.createElement('input');
      supported = ('placeholder' in el);
    } else
    if (feature && (m = feature.match(/flash\s*(v\d+)?(\.\d+)?/i))) {
      var major = m[1] && m[1].replace('v', ''), minor = m[2] && m[2].replace('.', '');
      supported = flashVersion(major || 1, minor);
    }
    return supported;
  }

  //Helper Functions
  function flashVersion(major, minor) {
    minor = minor || 0;
    var ver;
    if (navigator.plugins && navigator.plugins.length > 0) {
      var types = navigator.mimeTypes, type = 'application/x-shockwave-flash';
      if (types && (type = types[type]) && type.enabledPlugin && type.enabledPlugin.description) {
        ver = type.enabledPlugin.description.replace(/.*?([0-9]+)\.([0-9]+).*/, '$1,$2').split(',');
      }
    } else {
      try {
        var fv = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').getVariable('$version');
      } catch(e) { return false; }
      ver = fv.replace(/.*?([0-9]+,[0-9]+).*/, '$1').split(',');
    }
    if (ver) {
      ver[0] = parseInt(ver[0], 10);
      return ver[0] > major || ver[0] == major && parseInt(ver[1], 10) >= minor;
    }
    return false;
  }

  //Exports
  supports.flashVersion = flashVersion;
  win.supports = supports;

})(window);
