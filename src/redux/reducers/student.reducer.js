// studentReducer holds the array of students that will display on the screen.
const studentReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_STUDENT_COMPLETED':
            return action.payload;
        case 'GET_STUDENT_FAILED':
            return 'Error receiving Students';
        default:
            return state;
    }
};

export default studentReducer;



