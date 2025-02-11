import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage/ListPage";
import DetailPage from "./pages/DetailPage/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage/>} />
        <Route path="/item/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
