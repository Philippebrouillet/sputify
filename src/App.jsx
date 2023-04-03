import { BrowserRouter } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <AppRoutes />
    </BrowserRouter>
  );
}
