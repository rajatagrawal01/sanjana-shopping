import UserForm from "./components/UserForm"
import UserTable from "./components/UserTable"

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>MERN Form Example</h1>
      <UserForm />
      <UserTable />
    </div>
  );
}

export default App;
