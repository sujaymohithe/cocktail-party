import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import CocktailParty from "./pages/CocktailParty";

const App = () => {
  return (
    <>
      <Header />
      <CocktailParty />
    </>
  );
};

export default App;
