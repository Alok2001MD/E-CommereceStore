// import { BsFillBagFill } from "react-icons/bs";

const Card = ({ img, title, star, reviews, prevPrice, newPrice,heart,cartButton,cart }) => {

  
  return (
    <>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            {star} {star} {star} {star}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>{prevPrice}</del> &thinsp;&#x20B9;{newPrice}
            </div>
       <span onClick={() =>cartButton(title)}>{cart}</span>
            <span >{heart}</span>
          </section>
        </div>
      </section>
    </>
  );
};
export default Card;