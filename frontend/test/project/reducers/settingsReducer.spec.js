import deepFreeze from 'deep-freeze';
import settingsReducer from 'project/reducers/settingsReducer.js';

describe("settingsReducer", () => {
	it("sets up the default state", () => {
		const stateBefore = undefined;
		const action = {};
		const stateAfter = {
		    modal: {
		        isNewPersonModalOpen: false,
                isNewPairingBoardModalOpen: false,
                newPersonModalErrorMessage: undefined,
                newPairingBoardModalErrorMessage: undefined
		    },
		    pairingBoardErrors: {},
		    pairingHistoryPanel: {
		        isOpen: false
		    }
		};

		expect(
			settingsReducer(stateBefore, action)
		).toEqual(stateAfter);
	});
});
