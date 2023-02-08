import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ImageFrame() {
  let url = "";
  const location = useLocation();
  const getImageUrl = async (id) => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=8224588fe10a6badd472a4c6304f14f9&photo_id=${id}&format=json&nojsoncallback=1`;
    let res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let Data = await res.json();
    return Data.sizes.size[3].source;
  };
  useEffect(() => {
    
    //console.log(location.state.id);
    url = getImageUrl(location.state.id);
  }, []);
  return (
    <div>
      <img src={url} className="img-thumbnail" alt="" />
    </div>
  );
}
