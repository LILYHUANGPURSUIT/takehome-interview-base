import { data } from './data';
import './Menu.css';
import { useState, useEffect } from 'react';
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
  
    const handleFilterTags = (tag) => {
      if(!filteredTags.includes(tag)){
        setFilteredTags([...filteredTags, tag]);
      } else {
        setFilteredTags(filteredTags.filter(t=> t !== tag));
      }
    }

    useEffect(()=>{
      let filteredItems = data.filter(item => filteredTags.every(filteredTag => item.tags.includes(filteredTag)))
      setItems(filteredItems);
    },[filteredTags])

const handleSubmit = (e) => {
    setSearchTerm(e.target.value)
  }
    
  useEffect(()=> {
    setItems(data.filter(item => item.longDescription.toLowerCase().includes(searchTerm.toLowerCase())))
  },[searchTerm])
    
    

  // console.log("Render")
  return (
    <article className="menu">
      {tags.map((tag,index) => (
        //  <button key={index} onClick={() => setItems(data.filter(item => item.tags.includes(tag)))}></button>
        <button key={index} onClick={() => handleFilterTags(tag)}>
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
