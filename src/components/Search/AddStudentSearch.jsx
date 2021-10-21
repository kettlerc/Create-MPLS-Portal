import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import SelectSearch from "react-select-search";
import "../AdminView/StudentSearch.css";


function AddStudentSearch() {

    //UseDispatch hook
    const dispatch = useDispatch();

    //UseSelector hook to access the student and studentToAdd from the Redux stores   
    const studentList = useSelector(store => store.student);
    const studentToAdd = useSelector(store => store.studentToAdd);

    //Local state for identifying selected student from drop down    
    const [selectedStudentId, setSelectedStudentId] = React.useState(studentToAdd.id);

    //Everything below this handles the functionality of the search bar
    const searchInput = useRef();

    useEffect(() => {
        studentList.map((student) => {
            if (student.id === selectedStudentId) {
                dispatch({
                    type: 'SET_STUDENT_TO_ADD',
                    payload: student
                })
            }
        })
    }, [selectedStudentId])

    let items = []; // create a list of students
    studentList.map((student) => {
        items.push({ // push each student from the list in a formatted object
            name: `${student.first_name} ${student.last_name}`,
            value: student.id
        })
    });

    const options = [ // To render menu
        {
            type: "group",
            name: "Student Names",
            items
        }
    ];

    const handleFilter = (items) => {
        return (searchValue) => {
            if (searchValue.length === 0) {
                return options;
            }
            const updatedItems = items.map((list) => {
                const newItems = list.items.filter((item) => {
                    return item.name.toLowerCase().includes(searchValue.toLowerCase());
                });
                return { ...list, items: newItems };
            });
            return updatedItems;
        };
    };

    return (
        <div className="App">
            <SelectSearch
                ref={searchInput}
                options={options}
                filterOptions={handleFilter}
                value={selectedStudentId}
                name="Student-Search"
                placeholder="Choose a student"
                search
                onChange={setSelectedStudentId}
            />
        </div>
    )
}

export default AddStudentSearch;