import image1 from '../public/bg-header-desktop.svg';
import JoblistContainer from './components/JoblistContainer';
import jobDatas from './data/data.json';
import { useState, useEffect } from 'react';


const App = () => {
  const [filteredList, setFilteredList] = useState(jobDatas);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredList.length/itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const selectedList = filteredList.slice(startIndex, endIndex);

  const pageButtonStyle = (page) => {
    return currentPage == page ? 
      "mx-1 px-6 py-4 rounded shadow text-white bg-cyan-dark font-bold" :
      "mx-1 px-6 py-4 rounded shadow text-blue-500 bg-white"
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilter = (filter) => {
    if (!selectedFilter.includes(filter)) {
      setSelectedFilter([...selectedFilter, filter]);
    }
    setCurrentPage(1);
  }

  // console.log(selectedFilter);

  const clearFilterItem = (filterItem) => {
    if (selectedFilter.includes(filterItem)) {
      setSelectedFilter(selectedFilter.filter(filteredItem => filteredItem !== filterItem))
    }
  }

  const resetFilter = () => {
    setSelectedFilter([]);
  }

  useEffect(() => {
    const filtered = jobDatas.filter(job =>
      selectedFilter.every(
        (filter) =>
          job.role === filter || 
          job.level === filter || 
          job.languages.includes(filter)
        )
    );
    setFilteredList(filtered);
  }, [selectedFilter])

  return (
    <>
      <header className="bg-cyan-dark bg-no-repeat bg-cover h-44 bg-header-desktop" style={{backgroundImage: `url(${image1})`}}></header>
      <main className="bg-cyan-light min-h-[80vh] pb-8 px-6">
        <div className="max-w-5xl m-auto relative -top-8 ">
          {/* filter start here */}
          <div className="w-full max-w-5xl min-h-[4rem] mb-10">
            {selectedFilter.length > 0 && <div className="bg-white rounded-md px-7 py-4 w-full shadow-lg flex justify-between">
              <ul className="flex flex-wrap gap-4">
                {
                  selectedFilter.map((filterItem, index) => (
                    <li key={index} className="flex">
                      <label style={{alignSelf: 'center'}} className="bg-cyan-light-2 px-2 py-1.5 text-sm text-cyan-dark font-bold rounded-l-md    cursor-default">
                        {filterItem}
                      </label>
                      <div>
                      <button className="bg-cyan-dark h-full flex items-center p-2 rounded-r-md hover:bg-cyan-very-dark" onClick={() => clearFilterItem(filterItem)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fillRule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"></path></svg>
                      </button>            
                      </div>
                    </li>
                  ))
                }
              </ul>
              <button className="text-sm text-cyan-dark font-bold underline" onClick={() => resetFilter()}>
                Clear
              </button>
            </div>}
          </div>
          <div>
            <ul>
              {
                selectedList.map((jobData, index) => (
                  <JoblistContainer key={index} jobData={jobData} onClick={handleFilter} />
                ))
              }
            </ul>
          </div>
          <nav className="mt-4">
            <ul className="flex justify-center">
              {
                Array.from({ length: totalPages }).map((_, index) => (
                  <li key={index}>
                    <button
                      className={pageButtonStyle(index + 1)} onClick={() =>paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))
              }
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
};

export default App;
