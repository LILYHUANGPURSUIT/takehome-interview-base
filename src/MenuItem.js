import './MenuItem.css';

const MenuItem = ({ item, show, handleOpenDescription}) => {
  const { id, name, price, shortDescription, longDescription } = item;
  // const [show, setShow] = useState(false);

  return (
    <section className="menuItem">
      <ul>
        <li>id: {id}</li>
        <li>name: {name} </li>
        <li>price: ${price} </li>
        <li>{shortDescription}</li>
      </ul>
      <button onClick={() => handleOpenDescription(id)}>{show ? "show less" : "show more"}</button>
      {show && 
        <div >
          {longDescription}
        </div>
      }
    </section>
  );
};

export default MenuItem;
