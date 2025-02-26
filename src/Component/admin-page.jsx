import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "./Silder";

import { FullCarousel } from "./slider1";
const imagesOne = [
  "/helmet1.png",
  "/helmet2.png",
  "/helmet3.png",
  "/helmet4.png",
  "/helmet5.png",
  "/helmet6.png",
  "/helmet7.png",
];
const imagesTwo = [
  "/Group1.png",
  "/Group2.png",
  "/Group3.png",
  "/Group4.png",
  "/Group5.png",
];
const imagesThree = ["/Rectangle.png", "Property1.png", "Property2.png"];
function App() {
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    const imagePreviews = files.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file), // Create a preview URL for the image
      };
    });
    setImages(imagePreviews); // Update state with image previews
  };
  const handleDelete = (index) => {
    setImages(
      (prevImages) => prevImages.filter((_, i) => i !== index) // Remove the image at the specified index
    );
  };
  return (
    <>
      <section className="hero-section">
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
          <div className="change-pic">
            <button>Change phots</button>
          </div>
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
          <Carousel images={imagesOne} />
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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="main-flex-box">
              <div className="d-form-box1">
                <label for="first-name">First Name</label>
              </div>
              <div className="d-form-box2">
                <input
                  type="text"
                  id="first-name"
                  name="first_name"
                  placeholder="Enter your first name"
                  required
                />
              </div>
            </div>

            <div className="main-flex-box">
              <div className="d-form-box1">
                <label for="last-name">Last Name</label>
              </div>
              <div className="d-form-box2">
                <input
                  type="text"
                  id="last-name"
                  name="last_name"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="main-flex-box">
              <div className="d-form-box1">
                <label for="postcode">Postcode</label>
              </div>
              <div className="d-form-box2">
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  placeholder="Enter your postcode"
                  required
                />
              </div>
            </div>
            <div className="main-flex-box">
              <div className="d-form-box1">
                <label for="email">Email</label>
              </div>
              <div className="d-form-box2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="main-flex-box">
              <div className="d-form-box1">
                <label for="phone">Phone</label>
              </div>
              <div className="d-form-box2">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <label for="details">More Details About Your Request</label>
            <textarea
              id="details"
              name="details"
              rows="5"
              placeholder="Provide more details about your request"
              required
            ></textarea>
            <label className="upload-label">
              Upload picture
              <input
                type="file"
                multiple
                id="picture"
                name="picture"
                accept="image/*"
                onChange={handleUpload}
              />
            </label>

            <div
              className="preview-container"
              style={{
                display: "flex",
                overflowY: "scroll",
                flexDirection: "row",
              }}
              id="preview-container"
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="image-preview"
                  style={{
                    position: "relative", // Add position relative to the parent container
                    display: "inline-block", // Ensure images are displayed inline
                    margin: "10px", // Add some spacing between images
                  }}
                >
                  <img
                    src={image.preview}
                    alt={`Preview ${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px", // Optional: Add rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Optional: Add a shadow for better visuals
                    }}
                  />
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px", // Ensure the "X" fits well
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <button type="submit">Send</button>
          </form>
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
        <div className="footer-box">
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

export default App;
