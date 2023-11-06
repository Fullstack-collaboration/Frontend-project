import { useState, useEffect } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const urlApiCloudflare = "https://aws-sdk-test.vercel.app"

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Pilih file terlebih dahulu.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${urlApiCloudflare}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        setMessage(data.message);
        // setMessage("Data berhasil di upload");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file">Pilih file:</label>
          <input type="file" name="file" onChange={handleChange} />
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? "Mengunggah..." : "Upload"}
          </button>
        </div>
        {success && <a href={message} >Klik here</a>}
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
}

export default App;
