// studentReducer holds the array of students that will display on the screen.
const occurrenceAttendanceReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ATTENDANCE':
            if(action.payload === null){
                //If database returns null results, send an empty array
                return [];
            } else {
                return action.payload;
            }
            
        case 'UNSET_ATTENDANCE':
            return {};
        default:
            return state;
    }
};

export default occurrenceAttendanceReducer;