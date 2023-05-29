import React from 'react';
import { useState } from "react";
import Category from "./Categories";
import Menu from "./Menu";
import items from "../data.json";


const Home = () => {
    const allCategories = ["all", ...new Set(items.map((item) => item.category))];
  const [menuItems, setMenuItems] = useState(items);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };
 
  return (
    <div className="App">
      <h2>
        <u>Our Menu</u>
      </h2>
      <Category categories={allCategories} filterItems={filterItems} />
      <Menu items={menuItems} />
    </div>
   
  )
}

export default Home