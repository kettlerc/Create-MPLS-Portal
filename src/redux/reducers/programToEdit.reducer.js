// studentReducer holds the array of students that will display on the screen.
const programToEditReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PROGRAM_TO_EDIT':
            return action.payload;
        case 'UNSET_PROGRAM_TO_EDIT':
            return {};
        default:
            return state;
    }
};

export default programToEditReducer;