import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/authentication/auth-context";
import Register from "./views/Authentication/Register";
import Login from "./views/Authentication/Login";
import NotFound from "./views/NotFound";
function App() {
  return (
    <div className="container mx-auto">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
