// studentReducer holds the array of students that will display on the screen.
const studentToEditReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STUDENT_TO_EDIT':
            return action.payload;
        case 'UNSET_STUDENT_TO_EDIT':
            return {};
        default:
            return state;
    }
};

export default studentToEditReducer;