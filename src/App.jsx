import Header from "./componenets/Header";
import Meals from "./componenets/Meals";
import { CartContextProvider } from "./store/CartContext";

function App() {
  return (
    <>
      //{" "}
      <CartContextProvider> 
        <Header />
        <Meals />
        //{" "}
      </CartContextProvider>
    </>
  );
}

export default App;
