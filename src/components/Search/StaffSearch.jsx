import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import SelectSearch from "react-select-search";
import "../AdminView/StudentSearch.css";


function StaffSearch() {

    //UseDispatch hook
    const dispatch = useDispatch();

    //UseSelector hook to access the teacher and staffToEdit from the Redux stores   
    const staffList = useSelector(store => store.teacher)
    const staffToEdit = useSelector(store => store.staffToEdit);

    //Local state for staff selection
    const [selectedStaffId, setSelectedStaffId] = React.useState(staffToEdit.id);

    //Everything below this handles the functionality of the search bar
    const searchInput = useRef();

    // Send Staff Data object to edit
    useEffect(() => {
        //Iterate through staff list to match id with selected id
        staffList.map((staff) => {
            if (staff.id === selectedStaffId) {
                //Once a match has been found send the staff object to be used.
                dispatch({
                    type: 'SET_STAFF_TO_EDIT',
                    payload: staff
                })
            }
        });
    }, [selectedStaffId]);

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
          placeholder="Select staff member"
          search
          onChange={setSelectedStaffId}
        />
      </div>
    );
  }

  export default StaffSearch;