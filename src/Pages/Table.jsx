import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BiGridVertical } from 'react-icons/bi';
import { SlOptionsVertical } from 'react-icons/sl';
import image6 from '../../public/image 6.svg';
import image5 from '../../public/image 5.svg';
import image4 from '../../public/image 4.svg';
import image3 from '../../public/image 3.svg';
import image2 from '../../public/image 2.svg';
import logo from "../../public/chaicode.png"
const ITEM_TYPE = 'TABLE_ITEM';

const Table = () => {
  const [tableData, setTableData] = useState([
    { id: 1, img: image6, title: 'Interview Preparation with Javascript 2.0', price: '₹9000', category: 'course' },
    { id: 2, img: image5, title: 'Aptitude - Average, Mixation & Allegation', price: 'Free', category: 'mock' },
    { id: 3, img: image4, title: 'Aptitude- Simple & Compound Interest', price: 'Free', category: 'mock' },
    { id: 4, img: image3, title: 'Aptitude Partnership', price: 'Free', category: 'mock' },
    { id: 5, img: image2, title: 'Aptitude Time & Work', price: 'Free', category: 'mock' }
  ]);

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = tableData[dragIndex];
    if (!draggedItem) return;
    const newTableData = [...tableData];
    newTableData.splice(dragIndex, 1);
    newTableData.splice(hoverIndex, 0, draggedItem);
    setTableData(newTableData);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    moveItem(index, index - 1);
  };

  const moveDown = (index) => {
    if (index === tableData.length - 1) return;
    moveItem(index, index + 1);
  };

  const removeItem = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen relative w-screen flex flex-col gap-y-5 pt-10 bg-[#D2E3C8] overflow-hidden">
      <h1 className="text-5xl text-[#4F6F52] text-center font-semibold">Chai aur Code</h1>
      <div className="bg-white rounded-xl pt-5 pb-10 pl-5 ml-10 w-10/12 overflow-auto">
        <div className="heading mb-4">
          <h1 className="text-4xl font-bold">Manage Bundle</h1>
          <h4 className="font-light">Change orders of the products based on priority</h4>
        </div>
        <div className="flex flex-col gap-y-0.5">
          {tableData.map((item, index) => (
            <TableRow
              key={item.id}
              item={item}
              index={index}
              moveItem={moveItem}
              moveUp={moveUp}
              moveDown={moveDown}
              removeItem={removeItem}
            />
          ))}
        </div>
      </div>
      <a target="_blank" href="http://chaicode.com/"> <img  className="h-20 rounded-md absolute bottom-5 right-5 w-20" src={logo} alt="" /> </a>
    </div>
  );
};

const TableRow = ({ item, index, moveItem, moveUp, moveDown, removeItem }) => {
  const ref = React.useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(draggedItem) {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    }
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={`flex w-10/12 justify-between items-center p-2 shadow-md rounded-lg ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
      <div className="start items-center flex gap-3">
        <h4 className="text-4xl text-gray-300">
          <BiGridVertical />
        </h4>
        <img className="h-16" src={item.img} alt="" />
        <h3 className="font-bold ml-2">{item.title}</h3>
      </div>
      <div className="end flex items-center gap-10 relative">
        <h4>{item.price}</h4>
        <h4 className="bg-[#DBFFCE] py-1 px-2 rounded-sm text-sm">{item.category}</h4>
        <button onClick={() => setMenuVisible(!menuVisible)} className="focus:outline-none">
          <SlOptionsVertical />
        </button>
        {menuVisible && (
          <div className="absolute right-0 top-6 bg-white border shadow-md rounded-md z-10">
            <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={() => { moveUp(index); setMenuVisible(false); }}>Move Up</button>
            <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={() => { moveDown(index); setMenuVisible(false); }}>Move Down</button>
            <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={() => { removeItem(index); setMenuVisible(false); }}>Remove</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
