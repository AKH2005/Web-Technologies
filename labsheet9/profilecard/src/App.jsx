import './App.css';

function App() {
  const studentName = "Akhil Madanu";
  const department = "Computer Science and Engineering";
  const year = "3rd Year";
  const section = "A";

  return (
    <div className="container">
      <div className="profile-card">
        <h1>Student Profile</h1>
        <p><strong>Name:</strong> {studentName}</p>
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Year:</strong> {year}</p>
        <p><strong>Section:</strong> {section}</p>
      </div>
    </div>
  );
}

export default App;