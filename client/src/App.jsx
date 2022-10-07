import "./App.css";
import { useState } from "react";
import axios from "axios"

export default function App() {
  const [pic, setPic] = useState("");
  const [file, setFile] = useState(null);

  const picUpload = (e) => {
    const [file] = e.target.files;
    setPic(URL.createObjectURL(file));
    setFile(file);
  };

  const getImgUrl = async() => {
    const formData = new FormData();
    formData.append("pic", file);
    const res = await axios.post("http://localhost:3000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const {msg,imgUrl} = res.data;
    alert(imgUrl);
  };

  return (
    <>
      <div className="input_wrapper">
        <div className="img_wrapper">
          <div className="img_upload">
            <input type="file" name="img" onChange={picUpload} />
            {pic ? <img src={pic} className="pic" /> : <p>Upload Image</p>}
          </div>
          <button onClick={() => getImgUrl()}>Send Image to server</button>
        </div>
      </div>
    </>
  );
}
