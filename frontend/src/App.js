import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  // load files
  const loadFiles = async () => {
    const res = await axios.get(`${API}/files`);
    setFiles(res.data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  // upload
  const uploadFile = async () => {
    if (!file) return alert("Select a file");

    const data = new FormData();
    data.append("file", file);

    await axios.post(`${API}/upload`, data);
    loadFiles();
  };

  // delete
  const deleteFile = async (name) => {
    await axios.delete(`${API}/files/${name}`);
    loadFiles();
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>MERN File Upload System</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>

      <h3>Uploaded Files</h3>

      {files.map((file, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <img
            src={`${API}/uploads/${file.filename}`}
            alt="uploaded"
            width="150"
          />
          <br />
          <button onClick={() => deleteFile(file.filename)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
