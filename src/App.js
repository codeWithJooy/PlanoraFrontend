import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import './App.css';
import Authentication from './Pages/Authentication/Authentication';
import Loader from "./Components/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, [location]);
  return (
    <>
    {loading && <Loader/>}
    {!loading && (
      <Switch>
        <Route path="/" component={Authentication} exact/>
      </Switch>
    )}
    </>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
