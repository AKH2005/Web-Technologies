import './App.css';
import StudentCard from './StudentCard';

function App() {
  return (
    <div className="container">
      <h1>Multiple Student Cards</h1>

      <div className="card-container">
        <StudentCard 
          name="Akhil Madanu" 
          department="Computer Science and Engineering" 
          marks="92" 
        />

        <StudentCard 
          name="Sai Kiran" 
          department="Electronics and Communication Engineering" 
          marks="88" 
        />

        <StudentCard 
          name="Keerthana" 
          department="Information Technology" 
          marks="95" 
        />

        <StudentCard 
          name="Rahul" 
          department="Mechanical Engineering" 
          marks="81" 
        />
      </div>
    </div>
  );
}

export default App;