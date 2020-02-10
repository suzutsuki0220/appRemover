const {exec} = require('child_process');
const japanese = require('./japanese.js');

function errorWork(code, stderr) {
    console.log(stderr);
    console.error(`process exited with code ${code}`);
}

module.exports.exec = function(command, onSuccess, onError = errorWork) {
    const process = exec(command);

    let stdout = "";
    let stderr = "";

    process.on('error', (err) => {
        console.error(`Failed to start process - ${err}`);
    });

    process.stdout.on('data', (data) => {
        //console.log('stdout >> ' + data);
        stdout = japanese.toUTF8(data);
    });

    process.stderr.on('data', (data) => {
        stderr = japanese.toUTF8(data);
    });

    process.on('close', (code) => {
        if (code === 0) {
            onSuccess(stdout);
        } else {
            onError(code, stderr);
        }
    });
};
