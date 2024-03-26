"use client";

import { useState } from "react";

const Sidebar = () => {
  const [newDocumentName, setNewDocumentName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newDocumentName) return;
    await Document.create(newDocumentName);
    setNewDocumentName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a document name"
        value={newDocumentName}
        onChange={(event) => setNewDocumentName(event.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default Sidebar;
