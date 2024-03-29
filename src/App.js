import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";

import Login from "./components/account/Login";
import Home from "./components/home/Home";
import DataProvider from "./context/DataProvider";
import Header from "./components/header/Header";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/details/DetailView";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <DataProvider>
        <BrowserRouter>
          <div style={{ marginTop: 64 }}>
            <Routes>
              {
                <Route
                  path="/"
                  element={<Login setIsAuthenticated={setIsAuthenticated} />}
                />
              }
              {
                <Route
                  path="/home"
                  element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route path="/home" element={<Home />} />
                </Route>
              }
              {
                <Route
                  path="/create"
                  element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route path="/create" element={<CreatePost />} />
                </Route>
              }
              {
                <Route
                  path="/home/details/:id"
                  element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route path="/home/details/:id" element={<DetailView />} />
                </Route>
              }
              {
                <Route
                  path="/about"
                  element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route path="/about" element={<About />} />
                </Route>
              }
              {
                <Route
                  path="/contact"
                  element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route path="/contact" element={<Contact />} />
                </Route>
              }
            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
