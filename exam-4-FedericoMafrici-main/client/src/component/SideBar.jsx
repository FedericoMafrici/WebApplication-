import React from "react";

import { SidebarElement } from "./SideBarElement";
function Sidebar({tab,setTab}) {
  return (
    <>
     
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item" id="Shops" >
            <SidebarElement title={"Shops"} link={"/"} active={tab == 1} />
          </li>
          <li className="nav-item" id="Bags" >
            <SidebarElement title={" Bags"} link={"/bags"} active={tab == 2} />
          </li>
          <li className="nav-item" id="my Order" >
            <SidebarElement title={"my Order"} link={"/myOrder"} active={tab == 3} />
          </li>
        </ul>
     
    </>
  );
}
export { Sidebar };
