import React, { useState, useEffect } from "react";
import { throttle } from "lodash";
import PropTypes from "prop-types";

const MobileHeader = (props) => {
  const [searchText, setSearchText] = useState("");
  const [openSearchBar, setOpenSearchBar] = useState(false);

  useEffect(() => {
    window.addEventListener("mousedown", handleOutSideClick, false);
    window.addEventListener("scroll", throttle(handleScroll, 200));
    return () => {
      window.removeEventListener("click", handleOutSideClick, false);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const header = document.querySelector(".mobile-header-container");
    if (header) {
      if (window.pageYOffset > 10) {
        header.classList.add("active-header");
      } else {
        header.classList.remove("active-header");
      }
    }
  };

  const handleOutSideClick = (e) => {
    if (!e.target.classList.contains("search-bar")) {
      setOpenSearchBar(false);
      setSearchText("");
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchBar = () => {
    setOpenSearchBar(true);
  };

  const closeSearchBar = () => {
    setSearchText("");
    setOpenSearchBar(false);
  };

  return (
    <div className="mobile-header-container" style={{ opacity : !props.showHeader ? "1" : "0" }}>
      <div className="mobile-header">
        {!openSearchBar ? (
          <div className="header-content">
            <img
              src="/assets/blog/logo.svg"
              alt="card-img"
              className="mobile-app-logo"
              width={145}
              onClick={() => window.open("/", "_self")}
            />
            {props.showSearch && (
              <img
                src="/assets/blog/MobileSearchIcon.svg"
                alt="card-img"
                width={20}
                height={20}
                onClick={() => handleSearchBar()}
              />
            )}
          </div>
        ) : (
          <div className="header-search">
            <input
              onChange={handleInputChange}
              autoFocus
              value={searchText}
              type="text"
              className="search-bar"
              placeholder="Search"
            />
            <img
              src="/assets/blog/close.svg"
              alt="search-icon"
              width={24}
              height={24}
              onClick={() => closeSearchBar()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

MobileHeader.propTypes = {
  showSearch: PropTypes.bool,
  showHeader: PropTypes.bool,
};

MobileHeader.defaultProps = {
  showSearch: true,
  showHeader:false
};

export default MobileHeader;
