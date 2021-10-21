import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectSearch from 'react-select-search';


const ProgramSearch = () => {

    //UseDispatch hook
    const dispatch = useDispatch();

    //UseSelector hook to access the teacher and staffToAdd from the Redux stores   
    const programToEdit = useSelector(store => store.programToEdit);
    const programList = useSelector(store => store.program);

    //Local state for identifying selected staff from drop down
    const [selectedProgramId, setSelectedProgramId] = React.useState(programToEdit.id);

    //Everything below this handles the functionality of the search bar
    const searchInput = React.useRef();
    
    let items = []; //create a list of programs

    programList.map((program) => {
        items.push({
            name: `${program.name} - ${program.location}`,
            value: program.id
        })
    });

    const options = [
      {
        type: "group",
        name: "Program: name - location",
        items
      },
    ];

    useEffect(()=>{
        programList.map((program) => {
            if(program.id === selectedProgramId){
                dispatch({
                    type: 'SET_PROGRAM_TO_EDIT',
                    payload: program
                })
            }
        })
    }, [selectedProgramId])
  
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
          name="Student-Search"
          placeholder="Select a program"
          search
          value={selectedProgramId}
          onChange={setSelectedProgramId}
        />
      </div>
    );
}

export default ProgramSearch;
