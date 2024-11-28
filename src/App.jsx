import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/authentication/auth-context";
import ProtectedRoute from "./components/authentication/auth-protected";
import Register from "./views/Authentication/Register";
import Login from "./views/Authentication/Login";
import RecommendationListMyAuthView from "./views/Recommendation/ListMyAuth";
import RecommendationCreate from "./views/Recommendation/Create";
import RecommendationUpdate from "./views/Recommendation/Update";
import CvCreate from "./views/Cv/Create";
import CvUpdate from "./views/Cv/Update";
import CVListView from "./views/Cv/List";
import CVListAuthView from "./views/Cv/ListAuth";
import CVListMyAuthView from "./views/Cv/ListMyAuth";
import CVDetailView from "./views/Cv/Detail";
import Profile from "./views/Profile/profile";
import Nav from "./components/nav/nav";
import NotFound from "./views/NotFound";
import RecommendationListView from "./views/Recommendation/List";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="container mx-auto">
          {/* Render Nav only for authenticated routes */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="*"
              element={
                <>
                  <Nav />
                  <Routes>
                    <Route path="/" element={<CVListView />} />
                    <Route path="/cvs" element={<CVListAuthView />} />
                    <Route path="/cvs/:cvId" element={<CVDetailView />} />
                    <Route
                      path="/recommendation/create/:cvId"
                      element={
                        <ProtectedRoute>
                          <RecommendationCreate />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/profile" element={<ProtectedRoute><Profile></Profile></ProtectedRoute>}/>
                    <Route
                      path="/recommendation/update/:recommendationId"
                      element={
                        <ProtectedRoute>
                          <RecommendationUpdate />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/myCVs" element={<ProtectedRoute><CVListMyAuthView></CVListMyAuthView></ProtectedRoute>}/>
                    <Route path="/recommendations/:cvId" element={<ProtectedRoute><RecommendationListView></RecommendationListView></ProtectedRoute>}/>
                    <Route path="/myRecommendations" element={<ProtectedRoute><RecommendationListMyAuthView></RecommendationListMyAuthView></ProtectedRoute>}/>
                    <Route
                      path="/cv/create"
                      element={
                        <ProtectedRoute>
                          <CvCreate />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/cv/update/:cvId"
                      element={
                        <ProtectedRoute>
                          <CvUpdate />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
