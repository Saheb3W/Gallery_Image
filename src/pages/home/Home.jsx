// eslint-disable-next-line no-unused-vars
import React from "react";
import "./home.css";

// import Gallery from '../../components/gallery/Gallary'
import Gallery from "../../components/gallery/Gallary";

const Home = () => {
  return (
    <div className="section">
      <div className="home">
        <div>
          <div className="notice-baner">
            <div className="notic-container">
              <h3>Gallary</h3>
            </div>
          </div>
          <div className="container">
            <div className="main-container">
              <Gallery />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
