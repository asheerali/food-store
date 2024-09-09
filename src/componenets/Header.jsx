import logoImg from "../assets/logo.jpg";

const Header = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="a resturant" />
        <h1>Fooders</h1>
      </div>
      <nav>
        <button> Cart (0)</button>
      </nav>
    </header>
  );
};

export default Header;
