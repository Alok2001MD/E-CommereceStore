import { useState,useMemo } from "react";

import Navigation from "./Navigation/nav";
import Products from "./Products/Products";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./Components/cards";
import "./index.css";

function App() {
//Use state hooks for form validation form vaildation
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errors, setErrors] = useState({});
const [isFormValid, setIsFormValid] = useState(false);
const [isFormVisible, setIsFormVisible] = useState(true);
  //--------category filter---------------
  const [selectedCategory, setSelectedCategory] = useState();
  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");
//functioning of cart button
  const[cart,setCart]=useState([])
  const cartButton=(ProductTitle,Productimg)=>{
    setCart((prevCart) => [...prevCart, { title: ProductTitle }]);
    console.log(ProductTitle);
    }

    //form validation
    const validateForm = () => {
      const errors = {};
  
      if (!email.trim()) {
        errors.email = 'Email is required';
      }
  
      if (!password.trim()) {
        errors.password = 'Password is required';
      }
  
      setErrors(errors);

      const isValid = Object.keys(errors).length === 0;
      setIsFormValid(isValid);

      if(isValid){
        setIsFormVisible(false);
      }
  
  
      return isValid
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (validateForm()) {
        // Redirect to the store or perform any other action
        console.log('Form is valid. Redirecting to the store...');
      } else {
        console.log('Form validation failed. Please check the errors.');
      }
    };
   const returning = useMemo(() => {
      return cart.map((item) => (
        <div key={Math.random() * 1000}>
          {item.title}
        </div>
      ));
    
    }, [cart]);

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
  function filteredData(products, selectedCategory, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }
    // Applying selected filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        ({ category,company, title ,newPrice}) =>
          category === selectedCategory ||
          company === selectedCategory ||
          title === selectedCategory ||
          newPrice===selectedCategory
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
          returning={returning}
        />
      )
    );
  }
  const result = filteredData(products, selectedCategory, query);
  return (
    <>
   {isFormVisible && (
     <div class="flex min-h-full flex-col justify-center px-4 py-10 lg:px-20">
        <form class="w-full max-w-md  mx-auto space-y-10 " onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" class="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <div className="text-red-500">{errors.email}</div>}
            </div>
          </div>

          <div>
            <label htmlFor="password" class="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <div className="text-red-500">{errors.password}</div>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
          </a>
        </p>
      </div>
   )}
      {isFormValid && !isFormVisible && (
        <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} returning={returning}/>
      <Recommended handleClick={handleClick} />
      <Products result={result} />
      </>
     
)}
    </>
  );
}

export default App;
