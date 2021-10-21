//reducer to send list of teacher's programs
const programsByTeacher = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROGRAMS_BY_TEACHER':
            return action.payload;
        default:
            return state;
    }
};

export default programsByTeacher;