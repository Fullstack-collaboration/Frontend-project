import { useState, useEffect } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      const response = await fetch("https://backend-cloud.vercel.app/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage("Gagal mengunggah file.");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan saat mengunggah file.");
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
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
}

export default App;
