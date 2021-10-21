const staffAssignments = (state = [], action) => {
    switch (action.type) {
        case 'SET_STAFF_ASSIGNMENTS':
            return action.payload;
        default:
            return state;
    }
};

export default staffAssignments;