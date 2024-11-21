import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = JSON.parse(input);
      const res = await axios.post("https://your-backend-url/bfhl", payload);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("Invalid JSON or API Error");
      setResponse(null);
    }
  };

  const handleFilterChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFilter(value);
  };

  const getFilteredResponse = () => {
    if (!response) return null;
    const filtered = {};
    filter.forEach((key) => {
      if (response[key]) {
        filtered[key] = response[key];
      }
    });
    return filtered;
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          placeholder="Enter JSON here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h3>Filter Options:</h3>
          <select multiple onChange={handleFilterChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_lowercase_alphabet">
              Highest Lowercase Alphabet
            </option>
          </select>
          <h3>Filtered Response:</h3>
          <pre>{JSON.stringify(getFilteredResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
