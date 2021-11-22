const pattern = /[a-zA-Z0-9_\-\+\.]/;

const getRandomByte = () => {
  if (global.crypto && global.crypto.getRandomValues) {
    var result = new Uint8Array(1);
    global.crypto.getRandomValues(result);
    return result[0];
  } else if (global.msCrypto && global.msCrypto.getRandomValues) {
    var result = new Uint8Array(1);
    global.msCrypto.getRandomValues(result);
    return result[0];
  } else {
    return Math.floor(Math.random() * 256);
  }
};

const generate = (length = 12) => {
  return Array.apply(null, { length: length })
    .map(function () {
      var result;
      while (true) {
        result = String.fromCharCode(getRandomByte());
        if (pattern.test(result)) {
          return result;
        }
      }
    }, this)
    .join('');
};

module.exports = generate;
