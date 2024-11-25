import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/authentication/auth-context";
import {ProtectedRoute} from "./components/authentication/auth-protected";
import Register from "./views/Authentication/Register";
import Login from "./views/Authentication/Login";
import RecommendationCreate from "./views/Recommendation/Create";
import RecommendationUpdate from "./views/Recommendation/Update";
import CvCreate from "./views/Cv/Create";
import CvUpdate from "./views/Cv/Update";
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
              <Route path="/recommendation/create" element={<ProtectedRoute><RecommendationCreate></RecommendationCreate></ProtectedRoute>}/>
              <Route path="/recommendation/update" element={<ProtectedRoute><RecommendationUpdate></RecommendationUpdate></ProtectedRoute>}/>
              <Route path="/cv/create" element={<ProtectedRoute><CvCreate></CvCreate></ProtectedRoute>}/>
              <Route path="/cv/update" element={<ProtectedRoute><CvUpdate></CvUpdate></ProtectedRoute>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
