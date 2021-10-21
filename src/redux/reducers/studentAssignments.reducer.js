const studentAssignments = (state = [], action) => {
    switch (action.type) {
        case 'SET_STUDENT_ASSIGNMENTS':
            return action.payload;
        default:
            return state;
    }
};

export default studentAssignments;