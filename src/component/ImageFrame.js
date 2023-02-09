import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ImageFrame() {
  const location = useLocation();
  const [photo, photoSet] = useState(location.state.Image);

  const ChangeTitle = () => {
    const textbox = document.getElementById("title").value;
    let tempValue = location.state.Image;
    tempValue.title = textbox;
    localStorage.setItem(tempValue.id, JSON.stringify(tempValue));
    photoSet(tempValue);
  };

  const ChangeHandler = (event) => {
    let value = { ...photo };
    value.title = event.target.value;
    photoSet(value);
  };

  useEffect(() => {
    let value = JSON.parse(localStorage.getItem(photo.id));
    if (value !== null) {
      photoSet(value);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="d-flex flex-column mb-3">
      <div>
        <div
          class="modal fade position-relative"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Change it what you like to call this picture
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <input
                  id="title"
                  type="text"
                  value={photo.title}
                  onChange={ChangeHandler}
                />
              </div>
              <div class="modal-footer">
                <button className="btn btn-warning" onClick={ChangeTitle} data-dismiss="modal">
                  Add To Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
          type="button"
          class="btn btn-outline-success rounded-0"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <h3>{photo.title}</h3>
      </button>
      <img src={location.state.url} className="img-thumbnail" alt="" />
    </div>
  );
}
