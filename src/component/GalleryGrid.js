import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GalleryGrid(props) {
  const [Images, ImagesSet] = useState([]);
  const [Loding, LodingSet] = useState(true);

  // see this later

  // const getImageUrl = async (id) => {
  //   const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=8224588fe10a6badd472a4c6304f14f9&photo_id=${id}&format=json&nojsoncallback=1`;
  //   let res = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //   });
  //   let Data = await res.json();
  //   // console.log(Data);
  //   return Data.sizes.size[0].source;
  // };

  const fetchImage = async () => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8224588fe10a6badd472a4c6304f14f9&tags=${props.search}&per_page=20&format=json&nojsoncallback=1`;
    LodingSet(true);
    let res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let Data = await res.json();
    Data = Data.photos.photo;
    // Data.map((element, i) =>
    //   getImageUrl(element.id).then((e) => {
    //     Data[i].url = e
    //     console.log(Data);
    //     ImagesSet(Data);
    //     // ImagesSet((prevState) => {
    //     //   console.log(prevState);
    //     //   prevState[i].url = e;
    //     // })
    //   })
    // );
    ImagesSet(Data);
    LodingSet(false);
  };

  useEffect(() => {
    fetchImage();
  }, [props.search]);

  return (
    <div className="vh-100 container text-center">
      {Loding ? (
        <div class="h-100 d-flex align-items-center justify-content-center" >
          <div
            class="spinner-border text-warning"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-5">
          {Images.map((Image, i) => {
            return (
              <div className="col" key={Image.id}>
                <Link
                  to={`/image/${Image.id}`}
                  state={{
                    url: `https://live.staticflickr.com/${Image.server}/${Image.id}_${Image.secret}_b.jpg`,
                    Image: Image,
                  }}
                >
                  <img
                    src={`https://live.staticflickr.com/${Image.server}/${Image.id}_${Image.secret}_q.jpg`}
                    className="img-thumbnail"
                    alt=""
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
