(function(win, doc) {

  function supports(feature) {
    var supported = false, m;
    if (feature == 'placeholder') {
      var el = doc.createElement('input');
      supported = ('placeholder' in el);
    } else
    if (feature && (m = feature.match(/flash\s*(v\d+)?(\.\d+)?/i))) {
      var major = m[1] && m[1].replace('v', ''), minor = m[2] && m[2].replace('.', '');
      supported = hasFlashVersion(major || 1, minor);
    }
    return supported;
  }

  //Helper Functions
  function hasFlashVersion(major, minor) {
    minor = minor || 0;
    var ver = getFlashVersion();
    return (ver) ? ver[0] > major || ver[0] == major && ver[1] >= minor : false;
  }

  function getFlashVersion() {
    var ver, nothing;
    if (navigator.plugins && navigator.plugins.length > 0) {
      var types = navigator.mimeTypes, type = 'application/x-shockwave-flash';
      if (types && (type = types[type]) && type.enabledPlugin && type.enabledPlugin.description) {
        ver = type.enabledPlugin.description.replace(/.*?([0-9]+)\.([0-9]+).*/, '$1,$2').split(',');
      }
    } else {
      try {
        var fv = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').getVariable('$version');
      } catch(e) { return nothing; }
      ver = fv.replace(/.*?([0-9]+,[0-9]+).*/, '$1').split(',');
    }
    return (ver) ? [parseInt(ver[0], 10), parseInt(ver[1], 10)] : nothing;
  }

  //Exports
  supports.hasFlashVersion = hasFlashVersion;
  supports.getFlashVersion = getFlashVersion;
  win.supports = supports;

})(window, document);
