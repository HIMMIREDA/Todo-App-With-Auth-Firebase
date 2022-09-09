import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Todos from "./pages/Todos";
import { TodoProvider } from "./contexts/TodoContext/TodoContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col space-y-12" >
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            >
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <TodoProvider>
                      <Todos />
                    </TodoProvider>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<p>Not found 404</p>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
