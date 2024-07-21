import { useEffect, useState } from "react"
import Shimmer from "./Shimmer";

const RestaurantCard = ({resList,loading}) => {
   
    const{name, cloudinaryImageId, locality,cuisines,avgRating,deliveryTime} = resList;
    const imageUrl =`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`
    return(
        <div className="res-card">
         {loading ? (
        <Shimmer /> // Display shimmer effect while loading
      ) : (
        <div className="rescard">
            <img src={imageUrl}></img>
            <div className="res-detail">
            <h2 className="restaurant-name">{name}</h2>
             <p className="rating-and-delivery-time">{avgRating}.<span>{deliveryTime}</span></p>
             <p className="cuisines">{cuisines.join(",")}</p>
             <p className="Area">{locality}</p>
            </div>
        </div> )} 
        </div>
       
    )
    }


  const Restaurants =()=>{
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const [searchText, setsearchText] = useState("");
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    
    useEffect(() => {
        fetchData();
      }, [])
    
       const fetchData = async ()=>{
        try {
            const response = await fetch(
              "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            );
            if (!response.ok) {
              throw new Error("Failed to fetch");
            }
            const json = await response.json();
            const cards = json?.data?.cards || [];
            let resInfo = [];
      
            cards.forEach((card) => {
              const restaurants = card?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants || [];
              resInfo = [...resInfo, ...restaurants];
            });
          
         
          setRestaurantData(resInfo || []);
          setFilteredRestaurant(resInfo || []);
          setLoading(false); // Update loading state once data is fetched
        } catch (error) {
          console.error("Error fetching data:", error);
          setError(error.message); // Set error message in state
          // Handle error state, show user a message, retry logic, etc.
         }  
    }
    if (error) {
        return <p>Error: {error}</p>; // Render error message if fetch fails
      }
    
      return (
        <div className="restaurant-container">
          <div className="search-container"><input
            type="text"
            placeholder="Search restaurants..."
            className="search" value={searchText} onChange={(e) =>{
              setsearchText(e.target.value)
            }}
          />
            <button className="search-btn" onClick={()=>{
             
               const filteredRestaurant = restaurantData.filter((res) => {
            return res.info.name.toLowerCase().includes(searchText.toLowerCase());
              });
        setFilteredRestaurant(filteredRestaurant)
            }} >Search</button>

            <button className="search-btn" onClick={()=>{
              const toprated=restaurantData.filter((res)=>{
                return res.info.avgRating > 4.5;
              })
              setFilteredRestaurant(toprated)
            }}>See Top rated Restaurants</button>

            <button className="search-btn" onClick={()=>{
              setFilteredRestaurant(restaurantData)
            }}>See All Restaurants</button>
          </div>
          
    
          <div className="rescard-container">
            {filteredRestaurant.map((res) => (
              <RestaurantCard key={res.info.id} resList={res.info} loading={loading} />
            ))}
          </div>
        </div>
      );
    };

    export default Restaurants;