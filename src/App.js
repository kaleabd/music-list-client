import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Home page</h1>
      <button
        style={{ width: "90%" }}
        onClick={() => navigate("create")}
      >
        NEXT
      </button>
    </div>
  );
}

export default App;
