import Button from "../Components/Button";
import "./Recommended.css";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button className="hello" onClickHandler={handleClick} value="" title="All Products" />
          <Button onClickHandler={handleClick} value="Nike" title="Nike"/>
          <Button onClickHandler={handleClick} value="Adidas" title="Adidas"/>
          <Button onClickHandler={handleClick} value="Puma" title="Puma"/>
          <Button onClickHandler={handleClick} value="Vans" title="Vans"/>
          <Button onClickHandler={handleClick} value="Campus" title="Campus"/>
          <Button onClickHandler={handleClick} value="RedTape" title="RedTape"/>
          <Button onClickHandler={handleClick} value="Sparx" title="Sparx"/>
        </div>
      </div>
    </>
  );
};

export default Recommended;