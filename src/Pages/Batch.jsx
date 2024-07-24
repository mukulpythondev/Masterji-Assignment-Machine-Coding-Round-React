import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import image7 from '../../public/image 7.svg';
import image8 from '../../public/image 8.svg';
import image9 from '../../public/image 9.svg';
import logo from "../../public/chaicode.png"

const Batch = () => {
  const batchData = [
    {
      id: 1,
      img: image7,
      title: "SQL Basics To Advanced Mastery Course",
      startDate: "20 Jul 2024",
      endDate: "28 Jul 2024",
      price: "₹0",
      validity: "180 days",
      status: "Published"
    },
    {
      id: 2,
      img: image8,
      title: "30 Days Of Javascript Challenge",
      startDate: "13 Jul 2024",
      endDate: "12 Aug 2024",
      price: "₹0",
      validity: "33 days",
      status: "Unpublished"
    },
    {
      id: 3,
      img: image9,
      title: "Interview Preparation With Javascript 2.0",
      startDate: "2 Aug 2024",
      endDate: "15 Sep 2024",
      price: "₹10,000",
      validity: "365 days",
      status: "Published"
    },
    {
        id: 4,
        img: image7,
        title: "SQL Basics To Advanced Mastery Course",
        startDate: "20 Jul 2024",
        endDate: "28 Jul 2024",
        price: "₹0",
        validity: "180 days",
        status: "Published"
      },
      {
        id: 5,
        img: image8,
        title: "30 Days Of Javascript Challenge",
        startDate: "13 Jul 2024",
        endDate: "12 Aug 2024",
        price: "₹0",
        validity: "33 days",
        status: "Unpublished"
      },
      {
        id: 6,
        img: image9,
        title: "Interview Preparation With Javascript 2.0",
        startDate: "2 Aug 2024",
        endDate: "15 Sep 2024",
        price: "₹10,000",
        validity: "365 days",
        status: "Published"
      },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredBatches = batchData.filter(batch =>
    batch.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastBatch = currentPage * rowsPerPage;
  const indexOfFirstBatch = indexOfLastBatch - rowsPerPage;
  const currentBatches = filteredBatches.slice(indexOfFirstBatch, indexOfLastBatch);
  const totalPages = Math.ceil(filteredBatches.length / rowsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleRowsPerPageChange = (e) => setRowsPerPage(Number(e.target.value));

  return (
    <div className="h-screen relative w-screen flex flex-col gap-y-5 pt-10 bg-[#E2BBE9] overflow-hidden">
      <h1 className="text-5xl text-[#444B7] text-center font-semibold">Chai aur Code</h1>
      <div className="bg-white rounded-xl pt-5 pr-5 pb-10 pl-5 ml-10 w-10/12 overflow-auto">
        <div className="heading mb-4">
          <h1 className="text-4xl font-bold">Batches</h1>
          <h4 className="font-light">Create learner’s batch and share information at the same time.</h4>
        </div>
        <div className="search flex items-center gap-3 mb-5">
          <input
            className="border border-zinc-200 px-2 py-1 w-3/12"
            type="text"
            placeholder="Search by Title (alt+k or cmd+k)"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="px-8 bg-[#6c6baf] text-white rounded-md py-2">Search</button>
        </div>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-r border-gray-300">Title</th>
              <th className="px-4 py-2 border-r border-gray-300">Start Date</th>
              <th className="px-4 py-2 border-r border-gray-300">End Date</th>
              <th className="px-4 py-2 border-r border-gray-300">Price</th>
              <th className="px-4 py-2 border-r border-gray-300">Validity</th>
              <th className="px-4 py-2 border-r border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentBatches.map((batch) => (
              <tr key={batch.id}>
                <td className="px-4 flex items-center gap-x-2 py-2 border-r border-gray-300">
                  <img src={batch.img} alt={batch.title} className="w-20 h-16" />
                  {batch.title}
                </td>
                <td className="px-4 py-2 border-r border-gray-300">{batch.startDate}</td>
                <td className="px-4 py-2 border-r border-gray-300">{batch.endDate}</td>
                <td className="px-4 py-2 border-r border-gray-300">{batch.price}</td>
                <td className="px-4 py-2 border-r border-gray-300">{batch.validity}</td>
                <td className="px-4 py-2 border-r border-gray-300">{batch.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="ml-2 border border-zinc-200 rounded-md px-2 py-1"
            >
              {[5, 10, 15, 20].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 cursor-pointer text-black font-bold text-xl rounded-md ${currentPage === 1? "opacity-20":"" }`}
            >
              <FaChevronLeft />
            </button>
            <span className="px-4">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 cursor-pointer text-black font-bold text-xl rounded-md ${currentPage === batchData.length-1? "opacity-20":"" }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
      <a target="_blank" href="http://chaicode.com/"> <img  className="h-20 rounded-md absolute bottom-5 right-5 w-20" src={logo} alt="" /> </a>

    </div>
  );
};

export default Batch;
