const {dialog} = require('electron').remote;

function openFileDialog(onSuccess, onError) {
    dialog.showOpenDialog(null, {
        title: 'select a batch list file',
        defaultPath: './batchlists',
        properties: ['openFile', 'dontAddToRecent'],
        filters: [
            {name: 'batch', extensions: ['list'] }
        ]
    }).then(result => {
        onSuccess(result);
    }).catch(err => {
        onError(err);
    })
}

module.exports.openFileDialog = openFileDialog;
