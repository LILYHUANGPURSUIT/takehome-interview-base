import { data } from './data';
import './Menu.css';
import { useState } from 'react';
import MenuItem from './MenuItem';

const Menu = () => {
  const [openIds, setOpenIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState(data);
  const [tags, setTags] = useState([...new Set([].concat(...data.map(item => item.tags)))]);
  const [filteredTags, setFilteredTags] = useState([]);
 
  const handleOpenDescription = (id) => {
    if(openIds.includes(id)) {
      const afterRemovedIds = openIds.filter(openId => id !== openId)
      setOpenIds(afterRemovedIds)
    } else {
      setOpenIds([...openIds, id])
    }
  }

  // const handleFilterTags = (tag) => {
  //   setFilteredTags([...filteredTags, tag]);

  //   for(let item of data) {
  //     for (let filteredTag of filteredTags) {
  //       if(item.tags.includes(filteredTag)) {

  //         // how to update items list which depends on the above condition
  //         setItems([...item])
  //       }
  //     }
  //   }
  // }
const handleSubmit = (e) => {
    setSearchTerm(e.target.value)
    setItems(data.filter(item => item.longDescription.toLowerCase().includes(searchTerm.toLowerCase())))
  }
  
 
console.log(items)
  return (
    <article className="menu">
      {tags.map((tag,index) => (
        // <button key={index} onClick={() => handleFilterTags(tag)}>
        <button key={index} onClick={() => setItems(data.filter(item => item.tags.includes(tag)))}>
          {tag}
        </button>
      ))}
      <h1>Our Menu</h1>
      <input 
        onChange={(e) => handleSubmit(e)}
        value={searchTerm}
        placeholder="Search"
      />
      <button onClick={() => setOpenIds(data.map(item => item.id))}>Expand All</button>
      <button onClick={() => setOpenIds([])}>Collapse All</button>
      {items.length ? items.map((item) => (
        <MenuItem key={item.id} item={item} show={openIds.includes(item.id)} handleOpenDescription={handleOpenDescription}/>
      )) : <div>No result for {searchTerm}</div>}
    </article>
  );
};

export default Menu;
