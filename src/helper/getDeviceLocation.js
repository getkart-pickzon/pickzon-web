const matchItem = (string, data) => {
  var i = 0, j = 0, regex, regexv, match, matches, version;
  for (i = 0; i < data.length; i += 1) {
    regex = new RegExp(data[i].value, 'i');
    match = regex.test(string);
    if (match) {
      regexv = new RegExp(data[i].version + '[- /:;]([\d._]+)', 'i');
      matches = string.match(regexv);
      version = '';
      if (matches) { if (matches[1]) { matches = matches[1]; } }
      if (matches) {
        matches = matches.split(/[._]+/);
        for (j = 0; j < matches.length; j += 1) {
          if (j === 0) {
            version += matches[j] + '.';
          } else {
            version += matches[j];
          }
        }
      } else {
        version = '0';
      }
      return {
        name: data[i].name,
        version: parseFloat(version)
      };
    }
  }
  return { name: 'unknown', version: 0 };
}

export const getBrowserLocation = async () => {
  /* Bowser Name and OS name Start */
  let os = [
    { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
    { name: 'Windows', value: 'Win', version: 'NT' },
    { name: 'iPhone', value: 'iPhone', version: 'OS' },
    { name: 'iPad', value: 'iPad', version: 'OS' },
    { name: 'Kindle', value: 'Silk', version: 'Silk' },
    { name: 'Android', value: 'Android', version: 'Android' },
    { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
    { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
    { name: 'Macintosh', value: 'Mac', version: 'OS X' },
    { name: 'Linux', value: 'Linux', version: 'rv' },
    { name: 'Palm', value: 'Palm', version: 'PalmOS' }
  ];

  let browser = [
    { name: 'Edge', value: 'Edge', version: 'Edge' },
    { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
    { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
    { name: 'Safari', value: 'Safari', version: 'Version' },
    { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
    { name: 'Opera', value: 'Opera', version: 'Opera' },
    { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
    { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
  ];

  let header = [
    navigator.platform,
    navigator.userAgent,
    navigator.appVersion,
    navigator.vendor,
    window.opera
  ];
  let agent = header.join(' ');
  let _OS = matchItem(agent, os);
  let browsers = matchItem(agent, browser);
  /* Bowser Name and OS name End */

  /* Device Id Start */
  var navigator_info = window.navigator;
  var screen_info = window.screen;
  var uid = navigator_info.mimeTypes.length;
  uid += navigator_info.userAgent.replace(/\D+/g, '');
  uid += navigator_info.plugins.length;
  uid += screen_info.height || '';
  uid += screen_info.width || '';
  uid += screen_info.pixelDepth || '';
  let deviceId = uid
  /* Device Id End */
  return { deviceName: _OS.name + " " + browsers.name, deviceId: deviceId, OS: _OS.name, browser: browsers.name }
}