const jschardet = require('jschardet');
const iconv = require('iconv-lite');

module.exports.convert = function(bytes, from, to) {
    const dec = iconv.decode(bytes, from);
    return iconv.encode(dec, to);
};

module.exports.toUTF8 = function(bytes, from = "") {
    const encoding = from || jschardet.detect(bytes).encoding;
    return this.convert(bytes, encoding, 'UTF-8');
};
