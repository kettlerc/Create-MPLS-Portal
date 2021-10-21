// studentReducer holds the array of students that will display on the screen.
const staffToEditReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STAFF_TO_EDIT':
            return action.payload;
        case 'UNSET_STAFF_TO_EDIT':
            return {};
        default:
            return state;
    }
};

export default staffToEditReducer;