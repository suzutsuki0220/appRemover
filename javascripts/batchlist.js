const fs = require('fs');
const command = require('./command.js');

let commands = new Array();

function initialize() {
    commands = [];
}

function makeColumn(html) {
    const td = document.createElement('td');
    td.innerHTML = html;

    return td;
}

function statusIcon() {
    return '<span class="icon is-medium has-text-success"><i class="fas fa-check"></i></span>';
}

function setCommandList() {
    const commandList = document.getElementById('command_list');
    const tbody = document.createElement('tbody');

    commandList.innerHTML = '';
    for (let i=0; i<commands.length; i++) {
        const tr = document.createElement('tr');
        tr.appendChild(makeColumn(i + 1));
        tr.appendChild(makeColumn(commands[i]));
        tr.appendChild(makeColumn(statusIcon()));

        tbody.appendChild(tr);
    }
    commandList.appendChild(tbody);
}

function execCommand(seq) {
    if (seq >= commands.length) {
        return;
    }

    command.exec(
        commands[seq],
        function(data) {
            document.getElementById('resultArea').innerHTML = data;
            execCommand(seq + 1);
        }
    );
}

module.exports.load = function(filepath) {
    const data = fs.readFileSync(filepath, 'utf8');

    initialize();

    let sp = 0;
    while(data && sp < data.length) {
        let ep = data.indexOf('\n', sp);
        if (ep < 0) {
            ep = data.length;
        }

        const line = data.substring(sp, ep).trim();
        if (line) {
            commands.push(line);
        }

        sp = ep + 1;
    }

    setCommandList();
};

module.exports.exec = function() {
    execCommand(0);
};
