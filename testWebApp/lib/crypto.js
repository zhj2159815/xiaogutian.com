/*
    混合加密
    @author <a href="ahl5esoft@gmail.com">ahl5esoft</a>
    @version 0.1.0
 */
'use strict';

var crypto = require('crypto');
var $ = require('underscore');

var INPUT_ENCODING = 'utf8';
var OUTPUT_ENCODING = 'hex';


/*
    @key		密钥
	@algorithms	算法数组
	@plaintext	明文
*/
exports.encrypt = function (key, algorithms, plaintext) {
    return $.reduce(algorithms, function (memo, a) {
        var cipher = crypto.createCipher(a, key);
        return cipher.update(memo, INPUT_ENCODING, OUTPUT_ENCODING)
            + cipher.final(OUTPUT_ENCODING)
    }, plaintext);
};

/*
    @key		密钥
	@algorithms	算法数组
	@plaintext	密文
*/
exports.decrypt = function (key, algorithms, crypted) {
    try {
        return $.reduceRight(algorithms, function (memo, a) {
            var decipher = crypto.createDecipher(a, key);
            return decipher.update(memo, OUTPUT_ENCODING, INPUT_ENCODING)
                + decipher.final(INPUT_ENCODING);
        }, crypted);
    } catch (e) {
        return;
    }
};