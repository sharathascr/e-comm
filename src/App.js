import AppNavbar from "./components/AppNavbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <AppNavbar />
      <AppRoutes />
      <Sidebar />
    </>
  );
}

export default App;
