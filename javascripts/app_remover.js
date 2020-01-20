const command = require('./javascripts/command.js');

function runCommand() {
    command.exec(
        'ls -la ./',
        function(data) {
            document.getElementById('resultArea').innerHTML = data;
        }
    );
}
