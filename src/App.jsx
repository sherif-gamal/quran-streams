import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import ErrorPage from "./error-page";
import { Playlist, loader as playlistLoader } from "./routes/playlist";
import Root, { loader as rootLoader } from "./routes/root";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "play/:slug",
        element: <Playlist />,
        loader: playlistLoader,
      },
    ],
  },
]);

function App() {

  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
      {/* <PlaylistPlayer /> */}
    </div>
  )
}

export default App
