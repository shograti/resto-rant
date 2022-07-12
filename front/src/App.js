import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [city, setCity] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');

  const fetchData = async () => {
    await axios
      .get(`http://localhost:3315/api/${type}?city=${city}`)
      .then((res) => {
        setData(res.data);
      });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (city && city.length > 2) {
            setIsLoading(true);
            fetchData().then(() => setIsLoading(false));
          }
        }}
      >
        <input type="text" onChange={(e) => setCity(e.target.value)} />

        <label htmlFor="restaurants">Restaurants</label>
        <input
          type="radio"
          id="restaurants"
          name="type"
          value="restaurants"
          defaultChecked
          onClick={(e) => setType(e.target.value)}
        />

        <label htmlFor="restaurants-and-bars">Bars</label>
        <input
          type="radio"
          id="bars"
          name="type"
          value="bars"
          onClick={(e) => setType(e.target.value)}
        />

        <label htmlFor="restaurants-and-bars">Restaurants and bars</label>
        <input
          type="radio"
          id="restaurants-and-bars"
          name="type"
          value="restaurants-and-bars"
          onClick={(e) => setType(e.target.value)}
        />

        <input type="submit" value={isLoading ? 'Loading' : 'Submit'} />
      </form>

      {data.length > 0 && (
        <>
          <p>{data.length} results</p>
          {data.map((restaurant) => (
            <div key={restaurant.id_shop}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${restaurant.posY_shop}%2C${restaurant.posX_shop}`}
                taget="_blank"
              >
                <p>{restaurant.name}</p>
              </a>
              <p>{restaurant.note}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default App;
