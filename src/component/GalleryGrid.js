import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GalleryGrid(props) {
  const [Images, ImagesSet] = useState([]);
  const [Loding, LodingSet] = useState(true);
  const [pageTotal, pageTotalset] = useState(1);
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
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${props.api}&tags=${props.search}&per_page=20&page=${props.page}&format=json&nojsoncallback=1`;
    LodingSet(true);
    let res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let Data = await res.json();
    pageTotalset(Data.photos.pages);
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

  const HandlePrev = () => {
    props.pageset(props.page - 1);
    fetchImage();
  };

  const HandleNext = () => {
    props.pageset(props.page + 1);
    fetchImage();
  };

  useEffect(() => {
    fetchImage();
  }, [props.search]);

  return (
    <div className="vh-100 vw-100 container text-center justify-content-center my-3">
      {Loding ? (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
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
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center m-3">
          <li className={`page-item ${props.page == 1 ? 'disabled' : ''}`} >
            <button className="page-link" onClick={HandlePrev}>Previous</button>
          </li>
          <li className="page-item disabled">
            <a className="page-link">
              {props.page}-{pageTotal}
            </a>
          </li>
          <li className={`page-item ${props.page >= pageTotal ? 'disabled' : ''}`} >
            <button className="page-link" onClick={HandleNext}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
