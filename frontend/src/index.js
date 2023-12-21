import React from "react";
import ReactDOM from "react-dom/client";

// We import bootstrap here, but you can remove if you want
import "bootstrap/dist/css/bootstrap.css";
import { Dapp } from "./components/Dapp";
import { ProductDapp } from "./components/ProductDapp";

// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ProductDapp />
  </React.StrictMode>
);
