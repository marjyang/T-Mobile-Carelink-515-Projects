// src/components/NotesSection.jsx

export default function NotesSection() {
    const notes = [
      { 
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", 
        author: "Dr. Phillips Carmen", 
        date: "May 01, 2025" 
      },
      { 
        text: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", 
        author: "Dr. Phillips Carmen", 
        date: "Apr 28, 2025" 
      },
      { 
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip", 
        author: "Dr. Phillips Carmen", 
        date: "Apr 25, 2025" 
      }
    ];
  
    return (
      <div className="notes-section">
        <div className="notes-header">
          <h3>Notes</h3>
          <button className="see-all">See all</button>
        </div>
        
        <div className="notes-list">
          {notes.map((note, index) => (
            <div key={index} className="note-item">
              <p className="note-text">{note.text}</p>
              <div className="note-meta">
                <span className="note-author">{note.author}</span>
                <span className="note-date">{note.date}</span>
              </div>
            </div>
          ))}
        </div>
        
        <button className="save-note">Save Note</button>
      </div>
    );
  }