import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GalleryGrid(props) {
  const [Images, SetImages] = useState([]);
  const [Loding, SetLoding] = useState(true);
  const [pageTotal, SetPageTotal] = useState(1);
  const [Delete, SetDelete] = useState(false);
  const [filter, Setfilter] = useState(
    localStorage.getItem("delete") || localStorage.setItem("delete", "")
      ? localStorage.getItem("delete").split(",")
      : []
  );
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
    SetLoding(true);
    let res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let Data = await res.json();
    SetPageTotal(Data.photos.pages);
    Data = Data.photos.photo;

    // Data.map((element, i) =>
    //   getImageUrl(element.id).then((e) => {
    //     Data[i].url = e
    //     console.log(Data);
    //     SetImages(Data);
    //     // SetImages((prevState) => {
    //     //   console.log(prevState);
    //     //   prevState[i].url = e;
    //     // })
    //   })
    // );
    SetImages(Data);
    SetLoding(false);
  };

  const HandlePrev = () => {
    props.pageset(props.page - 1);
    fetchImage();
  };

  const HandleNext = () => {
    props.pageset(props.page + 1);
    fetchImage();
  };

  const DragStartHandler = (e) => {
    e.dataTransfer.setData("id", e.target.getAttribute("data-id"));
    SetDelete(true);
  };

  const DragOverHandler = (e) => {
    e.preventDefault();
  };

  const DragStopHandler = () => {
    SetDelete(false);
  };

  const DropHandler = (e) => {
    e.preventDefault();
    let data = filter;
    data.push(e.dataTransfer.getData("id"));
    Setfilter(data);
    localStorage.setItem("delete", data.toString());
    SetDelete(false);
  };

  useEffect(() => {
    // console.log(filter);
    fetchImage();
    // eslint-disable-next-line
  }, [props.search]);

  return (
    <>
      <div className="vh-100 vw-100 container text-center justify-content-center my-3">
        {Delete && (
          <div
            type="button"
            class="btn btn-outline-danger w-100"
            onDrop={DropHandler}
            onDragOver={DragOverHandler}
            draggable="true"
          >
            Block Image
          </div>
        )}
        {Loding ? (
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-5">
            {Images.map((Image, i) => {
              if (filter.indexOf(Image.id) !== -1)
                return <div key={Image.id} style={{ display: "none" }}></div>;
              else
                return (
                  <div
                    className="col"
                    key={Image.id}
                    onDragStart={DragStartHandler}
                    onDragEnd={DragStopHandler}
                  >
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
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center m-3">
            <li className={`page-item ${props.page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={HandlePrev}>
                Previous
              </button>
            </li>
            <li className="page-item disabled">
              <a className="page-link" href="/">
                {props.page}-{pageTotal}
              </a>
            </li>
            <li
              className={`page-item ${
                props.page >= pageTotal ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={HandleNext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
