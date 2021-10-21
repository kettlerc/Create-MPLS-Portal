// studentReducer holds the array of students that will display on the screen.
const occurrenceStudentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OCCURRENCE_STUDENTS':
            return action.payload;
        case 'UNSET_OCCURRENCE_STUDENTS':
            return {};
        default:
            return state;
    }
};

export default occurrenceStudentsReducer;