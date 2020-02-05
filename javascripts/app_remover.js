const dialog = require('./javascripts/dialog.js');
const batchlist = require('./javascripts/batchlist.js');

function openFileDialog() {
    dialog.openFileDialog(
        function(filepath) {
            batchlist.load(filepath);
        }, function(err) {
            console.log(err);
        }
    );
}

function runCommand() {
    batchlist.exec();
}
