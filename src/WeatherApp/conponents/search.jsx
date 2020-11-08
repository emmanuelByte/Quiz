import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import countries from "../country.json";
import Dropdown from "./dropdown";
// import cities from "../city.list.json";
// const city = cities.map((e) => {
//   return { name: e.name, country: e.country };
// });
const Search = ({ setData, setBool, bool }) => {
  // function filtration(value) {
  //   setDropdown(value);

  //   console.log(dropdown);
  //   return value;
  // }
  // console.log(cit);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [dropdown, setDropdown] = useState([{}]);
  const [dbool, setDbool] = useState(false);

  const key = "910f148c38b5d0f018343257872adabf";
  // "84f0c05e16abc57b03ca8fa00b59f78e";
  useEffect(() => {
    // if (city) console.log(city);
  }, [city]);
  function v(e, arr = countries) {
    let v = e.target.value;
    v = v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase();
    return setDropdown(arr.filter((ele) => ele.name.includes(v)));
  }
  async function getWeather(c) {
    let c1 = c.slice(0, 1).toUpperCase();
    c = c1 + c.slice(1).toLowerCase();
    const cors = "https://cors-anywhere.herokuapp.com/";
    let url = `${cors}http://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${key}&units=metric`;

    // console.log(c, "city");
    if (country) {
      console.log(`getting weather from ${c},${country}`);
      url = `${cors}http://api.openweathermap.org/data/2.5/weather?q=${
        c + "," + country
      }&appid=${key}&units=metric`;
    }
    let x = setInterval(() => {
      setRoll((pr) => {
        return (pr += 45);
      });

      // console.log(roll);
    }, 200);
    fetch(url)
      .then((res) => {
        console.log(res.status);
        if (res.status >= 400) return null;
        else return res.json();
      })
      .then((d) => {
        // console.log(d);
        setData({ ...d });
        setRoll(0);
        clearInterval(x);
        setBool((pre) => true);
      })
      .catch((err) => {
        console.log(err);
        setRoll(270);
        clearInterval(x);
        setBool((pre) => false);
      });
  }
  function changeValue(e) {
    document.querySelector(".cout input").value = e;
    // console.log(country);
  }
  const [roll, setRoll] = useState(270);
  return (
    <div className="search_engine">
      <small>hint: country name first</small>

      <div className="engine">
        <div className="search">
          <FontAwesomeIcon icon={faSearch} />
          <input
            onChange={(e) => {
              let c = e.target.value;
              setCity(titleCase(c));
            }}
            type="text"
            placeholder="Enter City"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                // console.log(e.target.value);
                getWeather(e.target.value);
              }
            }}
          />{" "}
          <hr />
          <div className="cout">
            <div
              className="icon"
              onClick={() => {
                console.log(city);
                if (city) {
                  getWeather(city);
                  setBool((pre) => !pre);
                } else {
                }
              }}>
              {/* 270 */}
              <FontAwesomeIcon
                icon={faArrowDown}
                // bool
                size="lg"
                transform={{ rotate: roll }}
              />
            </div>

            <input
              type="text"
              placeholder="Enter Country"
              // value={() => v()}
              onChange={(e) => {
                ///////
                v(e);
                setDbool(true);
              }}
            />
          </div>
        </div>
        <Dropdown
          changeValue={changeValue}
          countries={countries}
          dropdown={dropdown}
          dBool={dbool}
          setDbool={setDbool}
          // cities={city}
          getWeather={getWeather}
          setCountry={setCountry}
        />
        {/* // */}
      </div>
    </div>
  );
};
function titleCase(str) {
  return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
}
export default Search;
