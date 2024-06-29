import React, { useState, useEffect } from "react";
import { throttle } from "lodash";
import PropTypes from "prop-types";

const Header = (props) => {
  const [searchText, setSearchText] = useState("");
  const [toggleSearchIcon, setToggleSearchIcon] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", throttle(handleScroll, 200));
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const header = document.querySelector(".blog-header-container");
    if (header) {
      if (window.pageYOffset > 10) {
        header.classList.add("blog-active-header");
      } else {
        header.classList.remove("blog-active-header");
      }
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setToggleSearchIcon(e.target.value.length > 0);
  };

  const clearSearchText = () => {
    setSearchText("");
    setToggleSearchIcon(false);
  };

  return (
    <div className="blog-header-container" style={{ opacity : !props.showHeader ? "1" : "0" }}>
      <div className="header">
        <div style={{ marginRight: "2rem" }}>
          <img
            className="app-logo"
            src="/assets/blog/logo.svg"
            alt="card-img"
            onClick={() => window.open("/", "_self")}
          />
        </div>
        {props.showSearch && (
          <div className="header-search">
            <input
              onChange={handleInputChange}
              value={searchText}
              type="text"
              placeholder="Search"
            />
            {!toggleSearchIcon ? (
              <img src="/assets/blog/search.svg" alt="search-icon" />
            ) : (
              <img
                src="/assets/blog/close.svg"
                alt="search-icon"
                onClick={clearSearchText}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  showSearch: PropTypes.bool,
  showHeader: PropTypes.bool,
};

Header.defaultProps = {
  showSearch: true,
  showHeader: false,
};

export default Header;
