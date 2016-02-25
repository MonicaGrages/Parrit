var Axios = require('axios');

Axios.defaults.headers.post['Content-Type'] = 'application/json';

function postWorkspaceAndDo(workspace, callback) {
    Axios.post('/api/workspace', workspace)
        .then(function (response) {
            callback(response.data);
        });
}

function postNewWorkspaceAndDo(workspaceName, callback) {
    Axios.post('/api/workspace/new', workspaceName)
        .then(function (response) {
            callback(response.data);
        })
}

function postWorkspacePairingAndDo(workspacePairing, callback) {
    Axios.post('/api/workspace/pairing', workspacePairing)
        .then(function (response) {
            callback(response.data);
        })
}

module.exports = {
    postWorkspaceAndDo,
    postNewWorkspaceAndDo,
    postWorkspacePairingAndDo
};
