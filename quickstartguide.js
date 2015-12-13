http = require('http');
fs = require('fs');

port = 3000;
host = '127.0.0.1';

server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    var eventInfo = '';

    req.on('data', function (data) {
        eventInfo += processPayload(JSON.parse(data.toString()));
    });

    req.on('end', function () {
        if (eventInfo !== '') {
            console.log(eventInfo);
        }

        res.end('');
    });
});

/**
 * Processes payloads to parse game events
 *
 * @param object Payload as JSON object
 * @return string
 */
function processPayload(data) {
    var date = new Date(data.provider.timestamp * 1000),
        output = '';

    output += detectRoundAndMapEnd(data);

    if (output.length > 0) {
        output = '[' + date.getFullYear() + '-' +
            (date.getMonth() + 1) + '-' +
            date.getDate() + ' ' +
            date.getHours() + ':' +
            ('00' + date.getMinutes()).substr(-2) + '] ' +
            output;
    }

    return output;
}

/**
 * Parses round endings and map endings from payloads
 *
 * @param object Payload as JSON object
 * @return string
 */
function detectRoundAndMapEnd(data) {
    var output = '';

    if (readProperty(data, 'added.round.win_team')) {
        var winner = readProperty(data, 'round.win_team') === 'T' ? 'T' : 'CT',
            ctPoints = (0 + (winner === 'CT')) +
                readProperty(data, 'map.team_ct.score'),
            tPoints = (0 + (winner === 'T')) +
                readProperty(data, 'map.team_t.score'),
            bombStatus = readProperty(data, 'round.bomb');

        output += winner === 'T' ? 'Terrorists' : 'Counter-Terrorists';

        output += ' won by ';

        if (bombStatus === 'exploded') {
            output += 'bombing a bombsite';
        } else if (bombStatus === 'defused') {
            output += 'defusing the bomb';
        } else {
            output += 'killing the opposition';
        }

        output += ' (CT ' + ctPoints + '-' + tPoints + ' T)';

        if (readProperty(data, 'previously.map.phase') === 'live' &&
            readProperty(data, 'map.phase') === 'gameover'
        ) {
            output += "\n> " + readProperty(data, 'map.name') + ' over, ';

            if (ctPoints > tPoints) {
                output += 'Counter-Terrorists win!';
            } else if (tPoints > ctPoints) {
                output += 'Terrorists win!';
            } else {
                output += "It's a tie!";
            }
        }
    }

    return output;
}

/**
 * Helper function to read values under nested paths from objects
 *
 * @param object
 * @param string Dot separated path to the desired property in the object
 * @return mixed Null if the object has no requested property, property value otherwise
 */
function readProperty(object, property) {
    var value = null,
        properties = property.split('.');

    for (var i = 0; i < properties.length; i++) {
        if (!object.hasOwnProperty(properties[i])) {
            return null;
        }

        value = object[properties[i]];
        object = object[properties[i]];
    }

    return value;
}

server.listen(port, host);

console.log('Monitoring CS:GO rounds');
