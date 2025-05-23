import React, { useState, useEffect } from "react";

function TabSection({ title, tabKey }) {
  const [entries, setEntries] = useState(() => {
    return JSON.parse(localStorage.getItem(tabKey)) || [];
  });
  const [product, setProduct] = useState("");
  const [status, setStatus] = useState("pending");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    localStorage.setItem(tabKey, JSON.stringify(entries));
  }, [entries, tabKey]);

  const addEntry = () => {
    if (!product || !start || !end) return;
    const newEntry = { product, status, start, end };
    setEntries([...entries, newEntry]);
    setProduct("");
    setStatus("pending");
    setStart("");
    setEnd("");
  };

  const getAlertColor = (endDate) => {
    const finish = new Date(endDate);
    const now = new Date();
    const diffDays = (finish - now) / (1000 * 60 * 60 * 24);
    if (diffDays < 3) return "red";
    if (diffDays < 7) return "orange";
    return "green";
  };

  return (
    <div className="tab-section">
      <h2>{title}</h2>
      <input placeholder="Product Name" value={product} onChange={(e) => setProduct(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in process">In Process</option>
        <option value="complete">Complete</option>
      </select>
      <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
      <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
      <button onClick={addEntry}>Add</button>
      <ul>
        {entries.map((entry, idx) => (
          <li key={idx} style={{ color: getAlertColor(entry.end) }}>
            {entry.product} - {entry.status} (Start: {entry.start}, End: {entry.end})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Marcyrl Validation System</h1>
      <TabSection title="Process Validation Protocol" tabKey="process_protocol" />
      <TabSection title="Process Validation Report" tabKey="process_report" />
      <TabSection title="Cleaning Validation" tabKey="cleaning" />
      <TabSection title="Risk Assessment" tabKey="risk" />
    </div>
  );
}
