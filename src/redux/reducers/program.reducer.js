// programReducer holds the array of programs that will display on the screen.
const programReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_PROGRAM_COMPLETED':
            return action.payload;
        case 'GET_PROGRAM_FAILED':
            return 'Error receiving Programs';
        default:
            return state;
    }
};

export default programReducer;