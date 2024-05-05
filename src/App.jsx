import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import Loader from "./components/reuseables/Loader";
import { useSelector } from "react-redux";
import AlertMessage from "./components/reuseables/AlertMessage";

function App() {
  const storedToken = useSelector(
    (state) => state?.authSlice?.userToken
  );
  const snackbarState = useSelector((state) => state?.snackbarSlice);

  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          {storedToken?.token ? <PrivateRoutes /> : <PublicRoutes />}
        </Suspense>
      </Router>
      {snackbarState.showAlert ? (
        <AlertMessage
          open={snackbarState.showAlert}
          autoHideDuration={2000}
          severity={snackbarState.severity}
          message={snackbarState.message}
        />
      ) : null}
    </>
  );
}

export default App;
