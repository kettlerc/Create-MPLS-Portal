// studentReducer holds the array of students that will display on the screen.
const occurrenceByTeacherReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OCCURRENCE_BY_TEACHER':
            return action.payload;
        case 'UNSET_OCCURRENCE_BY_TEACHER':
            return [];
        default:
            return state;
    }
};

export default occurrenceByTeacherReducer;