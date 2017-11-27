import { setNewProjectErrorCreator, setLoginErrorCreator } from 'dashboard/actions/creators/dashboardCreators.js';
import { postNewProjectAndDo, postLoginAndRedirect } from 'shared/helpers/databaseHelpers.js';

export function createProjectThunk(name, password) {
    return function(dispatch, getState) {
        postNewProjectAndDo(name, password,
            function successCallback() {
                postLoginAndRedirect(name, password);
            },
            function errorCallback(errorResponse) {
                dispatch(setNewProjectErrorCreator(errorResponse));
            }
        );
    }
}

export function loginThunk(name, password) {
    return function(dispatch, getState) {
        postLoginAndRedirect(name, password,
            function errorCallback(errorResponse) {
                dispatch(setLoginErrorCreator(errorResponse));
            }
        );
    }
}


