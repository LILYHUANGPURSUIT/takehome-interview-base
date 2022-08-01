import { data } from './data';
import './Menu.css';
import { useState } from 'react';
import MenuItem from './MenuItem';

const Menu = () => {
  const [openIds, setOpenIds] = useState([]);

  const handleOpenDescription = (id) => {
    if(openIds.includes(id)) {
      const afterRemovedIds = openIds.filter(openId => id !== openId)
      setOpenIds(afterRemovedIds)
    } else {
      setOpenIds([...openIds, id])
    }
  }

  const getAllIds = (data) => {
    return data.map(item => item.id);
  }

  console.log(openIds)
  return (
    <article className="menu">
      <h1>Our Menu</h1>
      <button onClick={() => setOpenIds(getAllIds(data))}>Expand All</button>
      <button onClick={() => setOpenIds([])}>Collapse All</button>
      {data.map((item) => (
        <MenuItem key={item.id} item={item} show={openIds.includes(item.id)} handleOpenDescription={handleOpenDescription}/>
      ))}
    </article>
  );
};

export default Menu;
