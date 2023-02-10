import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Collection() {
  const [Loding, SetLoding] = useState(true);
  const [Images, SetImages] = useState([]);


  useEffect(() => {
    SetLoding(true);
    let data = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      if (localStorage.key(i) !== "delete")
      {
        data.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        // SetImages(previousImage => { console.log(i); return [...previousImage, JSON.parse(localStorage.getItem(localStorage.key(i)))];});
      }
        
    }
    SetImages(data);
    SetLoding(false);
  },[]);

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
          {console.log(Images)}
          {Images.map((Image) => {
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
                    data-id={Image.id}
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
