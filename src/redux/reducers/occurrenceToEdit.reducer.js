// studentReducer holds the array of students that will display on the screen.
const occurrenceToEditReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_OCCURRENCE_TO_EDIT':
            return action.payload;
        case 'UNSET_OCCURRENCE_TO_EDIT':
            return {};
        default:
            return state;
    }
};

export default occurrenceToEditReducer;