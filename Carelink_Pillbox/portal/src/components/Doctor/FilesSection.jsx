// src/components/FilesSection.jsx

export default function FilesSection() {
    return (
      <div className="files-section card">
        <div className="files-header-row">
          <h3>Files/Documents</h3>
          <button className="add-files">Add Files</button>
        </div>
        <ul className="files-list">
          <li className="file-item">
            <span className="file-icon">📄</span>
            <span className="file-name">Blood Pressure Check - April 2025.pdf</span>
            <span className="file-size">123kb</span>
          </li>
          <li className="file-item">
            <span className="file-icon">📄</span>
            <span className="file-name">Electrocardiogram - Mar 2025.pdf</span>
            <span className="file-size">123kb</span>
          </li>
          <li className="file-item">
            <span className="file-icon">📄</span>
            <span className="file-name">Cholesterol Tests - Mar 2025.pdf</span>
            <span className="file-size">123kb</span>
          </li>
          <li className="file-item">
            <span className="file-icon">📄</span>
            <span className="file-name">Blood Pressure Check - Mar 2025.pdf</span>
            <span className="file-size">123kb</span>
          </li>
        </ul>
      </div>
    );
  }