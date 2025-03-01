import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "./Component/Silder";
import axios from 'axios'
import "./App.css";
import { FullCarousel } from "./Component/slider1";

function App() {

  const [imagesOne,setImagesOne] =useState([])
  const [imagesTwo,setImagesTwo] = useState([])
  const [imagesThree,setImagesThree] = useState([])
  const [imageMain,setImageMain] = useState()
  const fetchImages = async () => {
    try {
      const { data } = await axios.get(url+'/api/banner1-photos');
       setImagesOne(data.images)
      const {data:image2} = await axios.get(url+'/api/banner2-photos')
      setImagesTwo(image2.images)
      const {data:image3} = await axios.get(url+'/api/banner3-photos')
      setImagesThree(image3.images)
      const {data:mainImage} = await axios.get(url+'/api/banner4-photos')
     
      setImageMain(mainImage?.images[0])
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    console.log(url)
    console.log(imageMain)
    fetchImages()
  },[imageMain]);
  
 
  return (
    <>
      <section className="hero-section"
       style={{
        backgroundImage: `url(${url+"/"+imageMain})`,
      }}>
        <div className="logo-image">
          <a href="">
            <img src="/main-image.png" alt="" />
          </a>
        </div>

        <div className="herosection-box">
          <div className="hero-image">
            <img src="/main-image.png" alt="" />
          </div>
          <div className="hero-icon">
            <a
              target="_blank"
              href="https://www.instagram.com/eacustoms2?igsh=ZTViMnlzajcwcW5u&utm_source=qr"
            >
              <img src="/insta.png" alt="" />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/share/1E6AwVTHtk/?mibextid=wwXIfr"
            >
              <img src="/facebook.png" alt="" />
            </a>
            <a
              target="_blank"
              href="https://www.tiktok.com/@eacustoms2?_t=ZN-8u8I3G4YL7W&_r=1"
            >
              <img src="/tiktok.png" alt="" />
            </a>
          </div>
        </div>
      </section>

      <section className="nav-section">
        <div className="request-btn">
          <a href="#quote">
            <button>REQUEST QUOTE</button>
          </a>
        </div>
        <div className="home-icon">
          <a href="#">
            <img src="/Vector.png" alt="" />
          </a>
        </div>
        <div className="contact-btn">
          <a href="#contact-us">
            <button>CONTACT US</button>
          </a>
        </div>
      </section>

      <section className="nav-section2">
        <div className="request-btn2">
          <a href="#quote">
            <img src="/doller.png" alt="" />
          </a>
        </div>
        <div className="home-icon2">
          <a href="#">
            <img src="/Vector.png" alt="" />
          </a>
        </div>
        <div className="contact-btn2">
          <a href="#contact-us">
            <img src="/phone.png" alt="" />
          </a>
        </div>
      </section>

      <section className="silder-box">
        <div className="silder-text">
          <h1>CUSTOM EVERYTHING DARE TO BE DIFFERENT </h1>
          <p>Motorbikes, helmets & more </p>
        </div>
        <div>
          <Carousel images={imagesOne} />
        </div>
      </section>

      <section className="silder-box">
        <div className="silder-text">
          <h1>SMART REPAIRS WE FIX IT FOR YOU </h1>
          <p>Wheels, bumpers, & more </p>
        </div>
        <div>
          <Carousel  images={imagesTwo} />
        </div>
      </section>

      <section className="helmet-box">
        <FullCarousel images={imagesThree} />
      </section>

      <section className="Conta-form-box">
        <div className="contact-text">
          <h1>PRICES </h1>
          <h2>We have prices for everyone </h2>
          <p>
            At EAC we do any type of spray painting form custom to repairs,
            there is no job too small or too big.{" "}
          </p>
          <p>
            You dreamed of a fully custom helmet matching your bike or just
            simply dreaming of having something different? We will make your
            dreams come true!{" "}
          </p>
          <p>Your car paint needs repairing? we will take care of it!</p>
          <h3>Helmets paint jobs from £180 </h3>
          <h3>
            Note: The pricing starts from 180£ for one colour, the price will be
            affected by the complexity of the design.
          </h3>
          <h3>Add ons : +£30 anti scratch clear coat </h3>
          <h3>+£30 helmet care kit </h3>
          <h3>
            Front & rear bumper repair form £100 <br />
            Paint work repairs form £150 <br />
            Dent removal from £200 <br />
            Machine polish from £30 <br />
            Touch up repairs from £30 <br />
            Alloy wheels repairs matching colour <br />
            1st wheel £95 then each additional wheel £70 <br />
            Set of 4 wheels £270
          </h3>
        </div>
        <div className="contact-form" id="quote">
          <h1>REQUEST QUOTE</h1>
          <p>Fixing or customizing we will take care of it!</p>
         <FormComponent/>
        </div>
      </section>

      <section className="reviews-box">
        <div className="reviews">
          <h1> What Customers Says</h1>
        </div>
        <div>
          <script
            src="https://static.elfsight.com/platform/platform.js"
            async
          ></script>
          <div
            className="elfsight-app-a403eccd-b63d-40a6-8659-5c40c7627a0c"
            data-elfsight-app-lazy
          ></div>
        </div>
      </section>
      <section className="helmet-box">
        <FullCarousel images={imagesThree} />
      </section>

      <search className="Footer" id="contact-us">
        <div className="footer-contact">
          <h1>Contact Us</h1>
        </div>
        <div className=" footer-box ">
          <div className="footer-text">
            <h1>Email: contact@eacustoms.co.uk</h1>
            <h1>Phone: 07415112293</h1>
            <div className="footer-icon">
              <a
                target="_blank"
                href="https://www.instagram.com/eacustoms2?igsh=ZTViMnlzajcwcW5u&utm_source=qr"
              >
                <img src="/insta.png" alt="" />
              </a>
              <a
                target="_blank"
                href="https://www.facebook.com/share/1E6AwVTHtk/?mibextid=wwXIfr"
              >
                <img src="/facebook.png" alt="" />
              </a>
              <a
                target="_blank"
                href="https://www.tiktok.com/@eacustoms2?_t=ZN-8u8I3G4YL7W&_r=1"
              >
                <img src="/tiktok.png" alt="" />
              </a>
            </div>
          </div>
          <div className="footer-img">
            <img src="/main-image.png" />
          </div>
        </div>
      </search>
    </>
  );
}
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRoute from "./Component/admin-page";
import { url } from "./Component/uploader";
import Loginpage from "./Component/Loginpage";
import FormComponent from "./Component/form";
// Make sure to import the App component

const NewApp = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/login" element={<Loginpage />}  />
        </Routes>
      </Router>
    </div>
  );
};

export default NewApp;
