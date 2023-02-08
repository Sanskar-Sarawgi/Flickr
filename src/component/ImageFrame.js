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
  }

  const ChangeHandler = (event) => {
      let value = { ...photo};
      value.title = event.target.value;
      photoSet(value);
  }
  
  useEffect(()=> {
    let value = JSON.parse(localStorage.getItem(photo.id));
    if(value !== null){
       photoSet(value);
    }
  },[])
  return (
      <div className="d-flex flex-column mb-3">
        <h2 style={{ textAlign: "center" }}>{photo.title}</h2>
        <img src={location.state.url} className="img-thumbnail" alt="" />
        <div>
          <h4>Change it what you like to call this picture</h4>
          <input id = "title" type='text' value={photo.title} onChange={ChangeHandler}/>
          <button className="btn btn-warning" onClick={ChangeTitle}>Change Title</button>
        </div>
        
      </div>
  );
}
