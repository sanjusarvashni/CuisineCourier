import { useState, useEffect } from "react";
const WhatsOnYourMindCard = ({resdet}) => {
    const {imageId } = resdet;
    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${imageId}`;
     return(
      <div className="whats-on-your-mind-card">
      <img src={imageUrl} ></img>
    </div>
     );
};



const WhatsOnYourMind = () => {
    const [resData, setResData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
          const json = await response.json();
          const imageGridCards = json?.data?.cards || [];
          const info = imageGridCards.flatMap(
            (card) => card?.card?.card?.imageGridCards?.info || []
          );
          setResData(info);
          setLoading(false); // Update loading state once data is fetched
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle error state, show user a message, retry logic, etc.
          setLoading(false); // Update loading state on error as well
        }
      };
    
      return (
        <div className="whats-on-your-mind-container">
          <h1>Whats on your mind?</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="waym-cards">
              {resData.map((restaurant) => (
                <WhatsOnYourMindCard key={restaurant.id} resdet={restaurant} />
              ))}
            </div>
          )}
        </div>
      );


}

export default WhatsOnYourMind;