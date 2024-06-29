import React from "react";

const Footer = () => {
  return (
    <div className="blog-footer-container">
      <div className="footer">
        <div>
          <img
            className="footer-app-logo"
            src="/assets/blog/LightComposition.svg"
            alt="logo"
          />
        </div>
        <div className="social-links">
          <div className="social-header">
            <span className="follow-us"> Follow us on</span>
          </div>
          <div className="social-app-icons">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/ainurcast/?modal=admin_todo_tour"
            >
              <img
                onMouseOver={(e) => {
                  if (!window.matchMedia("(max-width: 1023px)").matches) {
                    e.target.src = "/assets/blog/Facebook_Onhover.svg";
                  }
                }}
                onMouseOut={(e) => {
                  if (!window.matchMedia("(max-width: 1023px)").matches) {
                    e.target.src = "/assets/blog/facebook.svg";
                  }
                }}
                src="/assets/blog/facebook.svg"
                alt="facebook"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/ainurcast/?hl=en"
            >
              <img
                onMouseOver={(e) => {
                  if (!window.matchMedia("(max-width: 1023px)").matches) {
                    e.target.src = "/assets/blog/Instagram_Onhover.svg";
                  }
                }}
                onMouseOut={(e) => {
                  if (!window.matchMedia("(max-width: 1023px)").matches) {
                    e.target.src = "/assets/blog/instagram-sketched.svg";
                  }
                }}
                src="/assets/blog/instagram-sketched.svg"
                alt="instagram"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/66309223/admin/"
            >
              <img
                onMouseOver={(e) => {
                  if (!window.matchMedia("(max-width: 1023px)").matches) {
                    e.target.src = "/assets/blog/Linkedin_Onhover.svg";
                  }
                }}
                onMouseOut={(e) => {
                  if (!window.matchMedia("(max-width: 1023px)").matches) {
                    e.target.src = "/assets/blog/linkedin.svg";
                  }
                }}
                src="/assets/blog/linkedin.svg"
                alt="linkedin"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/ainurcast"
            >
              <img
                onMouseOver={(e) => {
                  if (!window.matchMedia("(max-width: 1023px)").matches) {
                    e.target.src = "/assets/blog/Twitter_Onhover.svg";
                  }
                }}
                onMouseOut={(e) => {
                  if (!window.matchMedia("(max-width: 1023px)").matches) {
                    e.target.src = "/assets/blog/twitter.svg";
                  }
                }}
                src="/assets/blog/twitter.svg"
                alt="twitter"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.pinterest.com/Ainurcast"
            >
              <img
                src="/assets/blog/pinterest.svg"
                alt="pinterest"
                onMouseOver={(e) => {
                  if (!window.matchMedia("(max-width: 1023px)").matches) {
                    e.target.src = "/assets/blog/Pintrest_Onhover.svg";
                  }
                }}
                onMouseOut={(e) => {
                  if (!window.matchMedia("(max-width: 1023px)").matches) {
                    e.target.src = "/assets/blog/pinterest.svg";
                  }
                }}
              />
            </a>
            <img src="/assets/blog/whatsapp.svg" alt="whatsapp" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;

// https://twitter.com/ainurcast
// https://www.facebook.com/ainurcast/?modal=admin_todo_tour
// https://www.instagram.com/ainurcast/?hl=en
// https://www.linkedin.com/company/66309223/admin/
