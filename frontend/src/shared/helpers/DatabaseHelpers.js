import Axios from 'axios'

Axios.defaults.headers.post['Content-Type'] = 'application/json'

export function postLoginAndRedirect(name, password, errorCallback) {
    Axios.post('/api/login', {name, password})
        .then(function onSuccess(response) {
            window.location.href = response.data
        }, function onError(error) {
            errorCallback(error.response.data)
        })
}

export function postLogout() {
    Axios.post('/api/logout')
        .then(function onSuccess() {
            window.location.href = '/'
        })
}

export function postProjectAndDo(name, password, successCallback, errorCallback) {
    Axios.post('/api/project', {name, password})
        .then(function onSuccess(response) {
            successCallback(response.data)
        }, function onError(error) {
            errorCallback(error.response.data)
        })
}

export function resetProjectAndDo(projectId, successCallback, errorCallback) {
    Axios.put('/api/project/' + encodeURIComponent(projectId) + '/reset')
        .then(function onSuccess(response) {
            successCallback(response.data)
        }, function onError(error) {
            errorCallback(error.response.data)
        })
}

export function postPersonAndDo(projectId, name, successCallback, errorCallback) {
    Axios.post('/api/project/' + encodeURIComponent(projectId) + '/person', {name})
        .then(function onSuccess(response) {
            successCallback(response.data)
        }, function onError(error) {
            errorCallback(error.response.data)
        })
}

export function putPersonPositionAndDo(projectId, personId, newPosition, successCallback, errorCallback) {
     Axios.put('/api/project/' + encodeURIComponent(projectId) + '/person/' + encodeURIComponent(personId) + '/position', newPosition)
         .then(function onSuccess(response) {
             successCallback(response.data)
         }, function onError(error) {
             errorCallback(error.response.data)
         })
 }

export function deletePersonAndDo(projectId, pairingBoardId, successCallback, errorCallback) {
    Axios.delete('/api/project/' + encodeURIComponent(projectId) + '/person/' + encodeURIComponent(pairingBoardId))
        .then(function onSuccess(response) {
            successCallback(response.data)
        }, function onError(error) {
            errorCallback(error.response.data)
        })
}

export function postPairingBoardAndDo(projectId, name, successCallback, errorCallback) {
    Axios.post('/api/project/' + encodeURIComponent(projectId) + '/pairingBoard', {name})
        .then(function onSuccess(response) {
            successCallback(response.data)
        }, function onError(error) {
            errorCallback(error.response.data)
        })
}

export function putPairingBoardAndDo(projectId, pairingBoardId, name, successCallback, errorCallback) {
    Axios.put('/api/project/' + encodeURIComponent(projectId) + '/pairingBoard/' + encodeURIComponent(pairingBoardId), {name})
        .then(function onSuccess(response) {
            successCallback(response.data)
        }, function onError(error) {
            errorCallback(error.response.data)
        })
}

export function deletePairingBoardAndDo(projectId, pairingBoardId, successCallback, errorCallback) {
    Axios.delete('/api/project/' + encodeURIComponent(projectId) + '/pairingBoard/' + encodeURIComponent(pairingBoardId))
        .then(function onSuccess(response) {
            successCallback(response.data)
        }, function onError(error) {
            errorCallback(error.response.data)
        })
}

export function postRoleAndDo(projectId, pairingBoardId, name, successCallback, errorCallback) {
    Axios.post('/api/project/' + encodeURIComponent(projectId) + '/pairingBoard/' + encodeURIComponent(pairingBoardId) + '/role', {name})
        .then(function onSuccess(response) {
            successCallback(response.data)
        }, function onError(error) {
            errorCallback(error.response.data)
        })
}

export function putRolePositionAndDo(projectId, pairingBoardId, roleId, newPosition, successCallback, errorCallback) {
     Axios.put('/api/project/' + encodeURIComponent(projectId) + '/pairingBoard/' + encodeURIComponent(pairingBoardId) + '/role/' + encodeURIComponent(roleId) + '/position', newPosition)
         .then(function onSuccess(response) {
             successCallback(response.data)
         }, function onError(error) {
             errorCallback(error.response.data)
         })
 }

export function deleteRoleAndDo(projectId, pairingBoardId, roleId, successCallback, errorCallback) {
    Axios.delete('/api/project/' + encodeURIComponent(projectId) + '/pairingBoard/' + encodeURIComponent(pairingBoardId) + '/role/' + encodeURIComponent(roleId))
        .then(function onSuccess(response) {
            successCallback(response.data)
        }, function onError(error) {
            errorCallback(error.response.data)
        })
}

export function postProjectPairingAndDo(projectId, successCallback) {
    Axios.post('/api/project/' + encodeURIComponent(projectId) + '/pairing')
        .then(function onSuccess(response) {
            successCallback(response.data)
        })
}

export function getRecommendedPairingAndDo(projectId, successCallback) {
    Axios.get('/api/project/' + encodeURIComponent(projectId) + '/pairing/recommend')
        .then(function onSuccess(response) {
            successCallback(response.data)
        })
}

export function getPairingHistoryAndDo(projectId, successCallback) {
    Axios.get('/api/project/' + encodeURIComponent(projectId) + '/pairing/history')
        .then(function onSuccess(response) {
            successCallback(response.data)
        })
}
