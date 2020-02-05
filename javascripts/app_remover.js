const command = require('./javascripts/command.js');
const dialog = require('./javascripts/dialog.js');

function openFileDialog() {
    dialog.openFileDialog(
        function(result) {
            console.log(result);
        }, function(err) {
            consoloe.log(err);
        }
    );
}

function runCommand() {
    command.exec(
        'ls -la ./',
        function(data) {
            document.getElementById('resultArea').innerHTML = data;
        }
    );
}
