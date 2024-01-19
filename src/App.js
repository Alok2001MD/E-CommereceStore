import { useState,useMemo } from "react";

import Navigation from "./Navigation/nav";
import Products from "./Products/Products";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./Components/cards";
import "./index.css";
function App() {

  //--------category filter---------------
  const [selectedCategory, setSelectedCategory] = useState();


  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const[cart,setCart]=useState([])
  const cartButton=(ProductTitle)=>{
    setCart((prevCart) => [...prevCart, { title: ProductTitle }]);
    console.log(ProductTitle);
    }
    const returning = useMemo(() => {
      return cart.map((item) => (
        <div key={Math.random() * 1000}>
          {item.title}
        </div>
      ));
    }, [cart]);
    returning.forEach((item) => {
      console.log("array is ",item.props.children);
    });


  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const filteredItems = products.filter(
    ((items)=>(query.toLowerCase()===''? items:items.title.toLowerCase().includes(query))||
    (query.toLowerCase()===''? items:items.category.toLowerCase().includes(query)))
  
  )
  // ----------- Radio Filtering -----------
  const handleChange = (event) =>{
    setSelectedCategory(event.target.value);

  };
  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };
  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category,company, title }) =>
          category === selected ||
          company === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice,heart ,cart}) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
          heart={heart}
          cart={cart}
          cartButton={cartButton}
        />
      )
    );
  }
  const result = filteredData(products, selectedCategory, query);
  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </>
  );
}

export default App;
