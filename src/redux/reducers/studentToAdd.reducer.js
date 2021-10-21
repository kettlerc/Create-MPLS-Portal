// studentReducer holds the array of students that will display on the screen.
const studentToAddReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STUDENT_TO_ADD':
            return action.payload;
        case 'UNSET_STUDENT_TO_ADD':
            return {};
        default:
            return state;
    }
};

export default studentToAddReducer;