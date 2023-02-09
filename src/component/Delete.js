import React, { useState, useEffect } from "react";

export default function Delete() {
  const [filter, Setfilter] = useState(
    localStorage.getItem("delete") || localStorage.setItem("delete", "")
      ? localStorage.getItem("delete").split(",")
      : []
  );
  const [url, Seturl] = useState([]);
  const [Loding, SetLoding] = useState(true);

  const FetchData = () => {
    SetLoding(true);
    Seturl([]);
    let count = 0;
    filter.map(async (id) => {
      const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=8224588fe10a6badd472a4c6304f14f9&photo_id=${id}&format=json&nojsoncallback=1`;
      let res = await fetch(URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      let Data = await res.json();
      Seturl((prevState) => [...prevState, Data.sizes.size[0].source]);
      count++;
      if(count === filter.length) SetLoding(false);
    });
    
  };

  const OnAddImage = (e) => {
    let data = filter;
    const index = data.indexOf(e.target.getAttribute("data-value"));
    if (index > -1) {
      data.splice(index, 1);
    }
    localStorage.setItem("delete", data.toString());
    Setfilter(data);
    FetchData();
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="vh-100 vw-100 container text-center justify-content-center my-3">
      <blockquote class="blockquote text-center">
        <p class="mb-0">Click on the Image to Unblock Image</p>
      </blockquote>
      {Loding ? (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-5">
          {url.map((image, i) => {
            return (
              <img
                src={image}
                className="img-thumbnail"
                alt=""
                key={filter[i]}
                data-value={filter[i]}
                onClick={OnAddImage}
              />
            );
          })}
        </div>
      )}
      <button onClick={FetchData}>Set Data</button>
    </div>
  );
}
