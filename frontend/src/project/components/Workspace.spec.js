import React from 'react'
import { shallow } from 'enzyme'

import Workspace from './Workspace.js'
import TrashBin from './TrashBin.js'
import PairingBoardList from './PairingBoardList'
import PersonList from './PersonList'

describe('<Workspace/>', () => {
    let wrapper, props
    let newPersonModal, newPersonForm
    let newPairingBoardModal, newPairingBoardForm
    let newRoleModal, newRoleForm
    const InnerWorkspace = Workspace.WrappedComponent

    beforeEach(() => {
        props  = {
            people: [
                { name: 'Mike Wazowski' },
                { name: 'Sully' }
            ],
            settings: {
                modal: {
                    isNewPersonModalOpen: false,
                    isNewPairingBoardModalOpen: true,
                    isNewRoleModalOpen: false,
                    newPersonModalErrorMessage: 'some error message',
                    newPairingBoardModalErrorMessage: 'some error message',
                    newRoleModalErrorMessage: 'some error message',
                    newRolePairingBoardId: 56
                }
            },
            createPerson: jasmine.createSpy('createPersonSpy'),
            createPairingBoard: jasmine.createSpy('createPairingBoardSpy'),
            createRole: jasmine.createSpy('createRoleSpy'),
            setNewPersonModalOpen: jasmine.createSpy('setNewPersonModalOpenSpy'),
            setNewPairingBoardModalOpen: jasmine.createSpy('setNewPairingBoardModalOpenSpy'),
            setNewRoleModalOpen: jasmine.createSpy('setNewRoleModalOpenSpy'),
        }

        wrapper = shallow(<InnerWorkspace {...props} />)

        const Modals = wrapper.find('Modal')
        newPersonModal = Modals.at(0)
        newPairingBoardModal = Modals.at(1)
        newRoleModal = Modals.at(2)

        newPersonForm = newPersonModal.find('NameForm')
        newPairingBoardForm = newPairingBoardModal.find('NameForm')
        newRoleForm = newRoleModal.find('NameForm')
    })

    it('renders the list of people in the project', () => {
        const people = wrapper.find(PersonList)
        expect(people.exists()).toBe(true)
        expect(people.prop('people')).toBe(props.people)
    })

    it('render the trash bin', () => {
        const trashBin = wrapper.find(TrashBin)
        expect(trashBin.exists()).toBe(true)
    })

    it('renders the list of pairing boards in the project', () => {
        const pairingBoards = wrapper.find(PairingBoardList)
        expect(pairingBoards.exists()).toBe(true)
    })

    describe('newPersonModal', () => {
        it('has a configured newPersonModal component as a child', () => {
            expect(newPersonModal.prop('isOpen')).toBe(props.settings.modal.isNewPersonModalOpen)
        })

        it('has a configured new person form in a modal', () => {
            expect(newPersonForm.prop('formTitle')).toBe('Add Parrit Teammate')
        })

        it('passes in the error message', () => {
            expect(newPersonForm.prop('errorMessage')).toBe('some error message')
        })

        describe('#openNewPersonModal', () => {
            it('shows the modal', () => {
                wrapper.find('.add-parrit-button').simulate('click')
                expect(props.setNewPersonModalOpen).toHaveBeenCalledWith(true)
            })
        })

        describe('#createPersonWithName', () => {
            beforeEach(() => {
                newPersonForm.prop('confirmFunction')('Luke Skywalker')
            })

            it('should call the createPerson action with the projectId, the passed in name and a callback', () => {
                expect(props.createPerson).toHaveBeenCalledWith('Luke Skywalker', jasmine.anything())
            })

            it('the passed in callback should close the modal', () => {
                const callback = props.createPerson.calls.mostRecent().args[1]
                callback()

                expect(props.setNewPersonModalOpen).toHaveBeenCalledWith(false)
            })
        })
    })

    describe('newPairingBoardModal', () => {
        it('has a configured newPairingBoardModal component as a child', () => {
            expect(newPairingBoardModal.prop('isOpen')).toBe(props.settings.modal.isNewPairingBoardModalOpen)
        })

        it('has a configured new pairing boards form in a modal', () => {
            expect(newPairingBoardForm.prop('formTitle')).toBe('Add Pairing Board')
        })

        it('passes in the error message', () => {
            expect(newPairingBoardForm.prop('errorMessage')).toBe('some error message')
        })

        describe('#openNewPairingBoardModal', () => {
            it('shows the modal', () => {
                wrapper.find('.add-board-button').simulate('click')
                expect(props.setNewPairingBoardModalOpen).toHaveBeenCalledWith(true)
            })
        })

        describe('#createPairingBoardWithName', () => {
            beforeEach(() => {
                newPairingBoardForm.prop('confirmFunction')('Luke Skywalker')
            })

            it('should call the createPairingBoard action with the passed in name', () => {
                expect(props.createPairingBoard).toHaveBeenCalledWith('Luke Skywalker', jasmine.anything())
            })

            it('the passed in callback should close the modal', () => {
                const callback = props.createPairingBoard.calls.mostRecent().args[1]
                callback()

                expect(props.setNewPairingBoardModalOpen).toHaveBeenCalledWith(false)
            })
        })
    })

    describe('newRoleModal', () => {
        it('has a configured newRoleModal component as a child', () => {
            expect(newRoleModal.prop('isOpen')).toBe(props.settings.modal.isNewRoleModalOpen)
        })

        it('has a configured new role form in a modal', () => {
            expect(newRoleForm.prop('formTitle')).toBe('Add Pairing Board Role')
        })

        it('passes in the error message', () => {
            expect(newRoleForm.prop('errorMessage')).toBe('some error message')
        })

        describe('#createRoleWithName', () => {
            beforeEach(() => {
                newRoleForm.prop('confirmFunction')('Ballers')
            })

            it('should call the createRole action with the passed in name, the role modal pairingBoardId and a callback', () => {
                expect(props.createRole).toHaveBeenCalledWith(56, 'Ballers', jasmine.anything())
            })

            it('the passed in callback should close the modal', () => {
                const callback = props.createRole.calls.mostRecent().args[2]
                callback()

                expect(props.setNewRoleModalOpen).toHaveBeenCalledWith(false, undefined)
            })
        })
    })
})