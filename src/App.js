import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage/ListPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import EditPage from "./pages/EditPage/EditPage";

function App() {
  return (
		<BrowserRouter>
			<Routes>
				<Route path='*' element={<ListPage />} />
				<Route path='/post/:id' element={<DetailPage />} />
				<Route path='/edit/:id' element={<EditPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
