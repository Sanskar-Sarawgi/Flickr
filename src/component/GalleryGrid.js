import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GalleryGrid(props) {
  const [Images, ImagesSet] = useState([]);

  const getImageUrl = async (id) => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=8224588fe10a6badd472a4c6304f14f9&photo_id=${id}&format=json&nojsoncallback=1`;
    let res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let Data = await res.json();
    // console.log(Data);
    return Data.sizes.size[3].source;
  };

  let data1;
  const fetchImage = async () => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8224588fe10a6badd472a4c6304f14f9&tags=${props.search}&per_page=10&format=json&nojsoncallback=1`;
    let res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let Data = await res.json();
    Data = Data.photos.photo;
    Data.map((element, i) =>
      getImageUrl(element.id).then((e) => (Data[i].url = e))
    );
    data1 = Data;
    // ImagesSet(Data);
  };

  const setit = () => {
    ImagesSet(data1);
  }

  useEffect(() => {
    fetchImage();
  }, [props.search]);

  return (
    <div className="container text-center">
      <div className="row row-cols-3">
        {Images.map((Image, i) => {
          return (
            <div className="col" key={Image.id}>
              {Image.title}
              <Link to="/image" state={{id : Image.id}}><img src={Image.url} className="img-thumbnail" alt=""/></Link>
            </div>
          );
        })}
      </div>
      <button onClick={setit}>set</button>
    </div>
  );
}
