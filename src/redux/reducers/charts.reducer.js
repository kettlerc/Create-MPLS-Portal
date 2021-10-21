// studentReducer holds the array of students that will display on the screen.
const chartsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CHARTS':
            return action.payload;
        default:
            return state;
    }
};

export default chartsReducer;



