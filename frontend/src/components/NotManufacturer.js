import React from "react";

export function NotManufacturer({ selectedAddress }) {
  return (
    <>
      <p>You are not a Manufacturer and cannot use this service</p>
      <p>
        To turn into a Manufacturer, open a terminal in the root of the repository and run: 
        <br />
        <br />
        <code>npx hardhat --network localhost makeManufacturer {selectedAddress}</code>
      </p>
    </>
  );
}
