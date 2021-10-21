// studentReducer holds the array of teachers that will display on the screen.
const teacherReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_STAFF_COMPLETED':
            return action.payload;
        case 'GET_STAFF_FAILED':
            return 'Error receiving Teachers';
        default:
            return state;
    }
};

export default teacherReducer;