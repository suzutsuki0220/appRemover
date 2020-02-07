const fs = require('fs');
const bulmaRender = require('html-render')('bulma');
const command = require('./command.js');

let commands = new Array();
let results  = new Array();

function initialize() {
    commands = [];
    results  = [];
}

function makeColumn(html, width) {
    const td = document.createElement('td');
    td.innerHTML = html;

    if (width) {
        td.style.width = width;
    }

    return td;
}

function outputResult(seq) {
    document.getElementById('resultArea').innerHTML = results[seq].output;
}

function setClickable(elem, onClick) {
    elem.onclick = onClick;
    elem.style.cursor = 'pointer';
    elem.onmouseover = function() {
        elem.classList.add('hover');
    };
    elem.onmouseout = function() {
        elem.classList.remove('hover');
    };
}

function setCommandList() {
    const commandList = document.getElementById('command_list');
    const tbody = document.createElement('tbody');

    commandList.innerHTML = '';
    for (let i=0; i<commands.length; i++) {
        const tr = document.createElement('tr');
        tr.appendChild(makeColumn(i + 1, "1.8em"));
        tr.appendChild(makeColumn(commands[i]));
        setClickable(tr, function() {
            for (let j=0; j<commandList.rows.length; j++) {
                commandList.rows[j].classList.remove('selected');
            }
            tr.classList.add('selected');
            outputResult(i);
        });

        const ret = {
            icon: makeColumn("&nbsp;&nbsp;", "3em"),
            output: ""
        }
        results.push(ret);

        tr.appendChild(ret.icon);

        tbody.appendChild(tr);
    }
    commandList.appendChild(tbody);
}

function setResult(seq, icon, message) {
    results[seq].icon.innerHTML = icon;
    results[seq].output = message;
    outputResult(seq);
}

function execCommand(seq) {
    if (seq >= commands.length) {
        return;
    }

    results[seq].icon.innerHTML = bulmaRender.statusIcon.loading;
    command.exec(
        commands[seq],
        function(data) {
            setResult(seq, bulmaRender.statusIcon.done, data);
            execCommand(seq + 1);
        }, function(code, stderr) {
            setResult(seq, bulmaRender.statusIcon.error, `code: ${code}\n` + stderr);
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
