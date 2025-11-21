import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Authentication from "./Pages/Authentication/Authentication";
import Loader from "./Components/Loader/Loader";
import Onboarding from "./Pages/Onboarding/Onboarding";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Events from "./Pages/Events/Events";
import EventMain from "./Pages/Events/EventMain";
import Tasks from "./Pages/Tasks/Tasks";
import Vendors from "./Pages/Vendors/Vendors";
import Teams from "./Pages/Team/Teams";

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 100); // Simulate loading time
    return () => clearTimeout(timer);
  }, [location]);
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Switch>
          <Route path="/" component={Authentication} exact />
          <Route path="/onboard" component={Onboarding} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/events" component={Events}/>
          <Route path="/eventMain" component={EventMain}/>
          <Route path="/tasks" component={Tasks}/>
          <Route path="/vendors" component={Vendors} />
          <Route path="/teams" component={Teams}/>
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
