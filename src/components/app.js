import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import Restaurants from "./Restaurants";
import WhatsOnYourMind from "./WhatsOnYourMind";




const AppLayout = ( )=>{
    return (<div className="app-layout">
         <Header/>
         <WhatsOnYourMind/>
         <Restaurants />
        
    </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout/>)