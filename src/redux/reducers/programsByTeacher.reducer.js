//reducer to send the registration code to the front end
const programsByTeacher = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROGRAMS_BY_TEACHER':
            return action.payload;
        default:
            return state;
    }
};

export default programsByTeacher;