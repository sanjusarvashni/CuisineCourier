
const Header =()=>{

    return(
      <div className="header-container">
            <div className="logo">
             <img src="https://cdn.dribbble.com/users/1635051/screenshots/4291569/media/37f248faab6fa8df62c797c590385fbf.png"></img>
            <h2 >Cuisine Courier</h2>
            </div>
               <div className="nav-list">
                <div className="nav-contents" id="search">
                  
                  <h2>About</h2>
              
                </div>

                <div className="nav-contents" id="sign-in">
                    <img className="nav-image"></img>
                    <h2>Sign In</h2>
                </div>
             

                <div className="nav-contents" id="cart">
                    <img className="nav-image"></img>
                    <h2 id="cart">Cart</h2>
                </div>
            </div>
      </div>
    )
}

export default Header;