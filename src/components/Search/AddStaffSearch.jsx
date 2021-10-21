import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import SelectSearch from "react-select-search";
import "../AdminView/StudentSearch.css";


function AddStaffSearch() {

    //UseDispatch hook
    const dispatch = useDispatch();

    //UseSelector hooks to access the teacher and staffToAdd from the Redux stores   
    const staffList = useSelector(store => store.teacher);
    const staffToAdd = useSelector(store => store.staffToAdd);

    //Local state for identifying selected staff from drop down
    const [selectedStaffId, setSelectedStaffId] = React.useState(staffToAdd.id);

    //Everything below this handles the functionality of the search bar
    const searchInput = useRef();

    useEffect(() => {
        staffList.map((staff) => {
            if (staff.id === selectedStaffId) {
                dispatch({
                    type: 'SET_STAFF_TO_ADD',
                    payload: staff
                })
            }
        })
    }, [selectedStaffId])

    let items = []; // create a list of students
    staffList.map((staff) => {
        items.push({ // push each student from the list in a formatted object
            name: `${staff.first_name} ${staff.last_name}`,
            value: staff.id
        })
    });

    const options = [ // To render menu
        {
            type: "group",
            name: "Staff Names",
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
                value={selectedStaffId}
                name="Staff-Search"
                placeholder="Choose staff"
                search
                onChange={setSelectedStaffId}
            />
        </div>
    )
}

export default AddStaffSearch;