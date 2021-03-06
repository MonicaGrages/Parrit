import { resetProjectAndDo, postPersonAndDo, putPersonPositionAndDo, deletePersonAndDo, postPairingBoardAndDo, putPairingBoardAndDo, deletePairingBoardAndDo, postRoleAndDo, putRolePositionAndDo, deleteRoleAndDo, postProjectPairingAndDo, getRecommendedPairingAndDo, getPairingHistoryAndDo, postLogout } from '../../../shared/helpers/DatabaseHelpers.js'
import { loadProjectCreator, loadPairingHistoryCreator, updatePairingHistoriesCreator } from '../creators/DataCreators.js'
import { setNewPersonModalErrorMessageCreator, setNewPairingBoardModalErrorMessageCreator, setNewRoleModalErrorMessageCreator, setPairingBoardEditErrorMessageCreator, clearPairingBoardEditErrorMessageCreator, setSystemAlertMessage, clearSystemAlertMessage } from '../creators/SettingsCreators.js'
import { setTimeout } from '../../../shared/misc/SystemAdapter.js'

export function addNewPersonThunk(name, callback) {
    return function(dispatch, getState) {
        postPersonAndDo(getState().data.project.id, name,
            function successCallback(project) {
                callback()
                dispatch(loadProjectCreator(project))
            },
            function errorCallback(errorResponse) {
                dispatch(setNewPersonModalErrorMessageCreator(errorResponse))
            }
        )
    }
}

export function movePersonThunk(personId, newPosition) {
    return function(dispatch, getState) {
        putPersonPositionAndDo(getState().data.project.id, personId, newPosition,
            function successCallback(project) {
                dispatch(loadProjectCreator(project))
            },
            function errorCallback() {
                //TODO: Huh?
            }
        )
    }
}

export function deletePersonThunk(personId) {
    return function(dispatch, getState) {
        deletePersonAndDo(getState().data.project.id, personId,
            function successCallback(project) {
                dispatch(loadProjectCreator(project))
            },
            function errorCallback() {
                //TODO: Huh?
            }
        )
    }
}

export function addNewPairingBoardThunk(name, callback) {
    return function(dispatch, getState) {
        postPairingBoardAndDo(getState().data.project.id, name,
            function successCallback(project) {
                callback()
                dispatch(loadProjectCreator(project))
            },
            function errorCallback(errorResponse) {
                dispatch(setNewPairingBoardModalErrorMessageCreator(errorResponse))
            }
        )
    }
}

export function renamePairingBoardThunk(pairingBoardId, name, callback) {
    return function(dispatch, getState) {
        dispatch(clearPairingBoardEditErrorMessageCreator(pairingBoardId))
        putPairingBoardAndDo(getState().data.project.id, pairingBoardId, name,
            function successCallback(project) {
                callback()
                dispatch(loadProjectCreator(project))
            },
            function errorCallback(errorResponse) {
                dispatch(setPairingBoardEditErrorMessageCreator(pairingBoardId, errorResponse))
            }
        )
    }
}

export function deletePairingBoardThunk(pairingBoardId) {
    return function(dispatch, getState) {
        deletePairingBoardAndDo(getState().data.project.id, pairingBoardId,
            function successCallback(project) {
                dispatch(loadProjectCreator(project))
            },
            function errorCallback() {
                //TODO: Huh?
            }
        )
    }
}

export function addNewRoleThunk(pairingBoardId, name, callback) {
    return function(dispatch, getState) {
        postRoleAndDo(getState().data.project.id, pairingBoardId, name,
            function successCallback(project) {
                callback()
                dispatch(loadProjectCreator(project))
            },
            function errorCallback(errorResponse) {
                dispatch(setNewRoleModalErrorMessageCreator(errorResponse))
            }
        )
    }
}

export function moveRoleThunk(pairingBoardId, roleId, newPosition) {
    return function(dispatch, getState) {
        putRolePositionAndDo(getState().data.project.id, pairingBoardId, roleId, newPosition,
            function successCallback(project) {
                dispatch(loadProjectCreator(project))
            },
            function errorCallback() {
                //TODO: Huh?
            }
        )
    }
}

export function deleteRoleThunk(pairingBoardId, roleId) {
    return function(dispatch, getState) {
        deleteRoleAndDo(getState().data.project.id, pairingBoardId, roleId,
            function successCallback(project) {
                dispatch(loadProjectCreator(project))
            },
            function errorCallback() {
                //TODO: Huh?
            }
        )
    }
}

export function resetProjectThunk() {
    return function (dispatch, getState) {
        resetProjectAndDo(getState().data.project.id,
            function successCallback(project) {
                dispatch(loadProjectCreator(project))
            },
            function errorCallback() {
                //TODO: Huh?
            }
        )
    }
}

export function getRecommendedPairsThunk() {
    return function(dispatch, getState) {
        getRecommendedPairingAndDo(getState().data.project.id,
            function successCallback(project) {
                dispatch(loadProjectCreator(project))
            })
    }
}

export function savePairingThunk() {
    return function (dispatch, getState) {
        postProjectPairingAndDo(getState().data.project.id,
            function successCallback(newPairingHistories) {
                dispatch(updatePairingHistoriesCreator(newPairingHistories))
                dispatch(setSystemAlertMessage('Hello. We just recorded your pairs.'))
                setTimeout(() => {
                    dispatch(clearSystemAlertMessage())
                }, 10 * 1000)
            })
    }
}

export function getPairingHistoryThunk() {
    return function(dispatch, getState) {
        getPairingHistoryAndDo(getState().data.project.id,
            function successCallback(pairingHistories) {
                dispatch(loadPairingHistoryCreator(pairingHistories))
            })
    }
}

export function postLogoutThunk() {
    return function() {
        postLogout()
    }
}
