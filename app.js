'use strict'


//定时任务

var schedule = require('node-schedule');

function scheduleRecurrenceRule() {

    var rule = new schedule.RecurrenceRule();
    // rule.dayOfWeek = 2;
    // rule.month = 3;
    // rule.dayOfMonth = 1;
    // rule.hour = 1;
    // rule.minute = 42;
    rule.second = 0;

    schedule.scheduleJob(rule, function () {
        console.log('scheduleRecurrenceRule:' + new Date());
    });

}

// scheduleRecurrenceRule();
//转换

var convert = require('./lib/convert.js');

var a = '[3,3,4]';
console.log(convert.to('array', a));

//加密

var mycrypto = require('./lib/crypto.js');

var options = {
    key: 'blues',
    encoding: {
        input: 'utf8',
        output: 'hex'
    },
    algorithms: ['bf', 'blowfish', 'aes-128-cbc']
};

var en = mycrypto.encrypt(options.key, options.algorithms, '123456');

console.log('en:', en);

var de = mycrypto.decrypt(options.key, options.algorithms, en);

console.log('de:', de);

//


