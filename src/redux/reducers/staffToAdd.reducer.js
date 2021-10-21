// studentReducer holds the array of students that will display on the screen.
const staffToAddReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STAFF_TO_ADD':
            return action.payload;
        case 'UNSET_STAFF_TO_ADD':
            return {};
        default:
            return state;
    }
};

export default staffToAddReducer;