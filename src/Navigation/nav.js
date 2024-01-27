import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import "./nav.css";
import { useState } from "react";

const Nav = ({ handleInputChange, query,returning}) => {
  
  const [cartitem,setCartitem]=useState([])
  const Hello=()=>{
    const itemarr=[]
    returning.forEach((items)=>
    {
      setCartitem(items.props.children)
      itemarr.push(...items.props.children)
    })
    setCartitem(itemarr);
 return<>

{cartitem.map((items)=>{
  return<li key={Math.random()*100}>{itemarr}</li>
})}

 </>
}
  return (

    <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter For Products,Brands & More"
        />
      </div>

      <div className="profile-container">
        <a href="#">
          <FiHeart className="nav-icons" />
        </a>
        <a href="#">
          <AiOutlineShoppingCart className="nav-icons" onClick={Hello}/>
        </a>
        <a href="#">
          <AiOutlineUserAdd className="nav-icons"  />
        </a>
      </div>
    </nav>
  );
};

export default Nav;
