import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import RadioPlaylist, { loader as radioPlaylistLoader } from "./RadioPlaylist";
import { About } from "./about";
import { Playlist, loader as playlistLoader } from "./playlist";
import Root from "./root";

export const router = createBrowserRouter([
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <RadioPlaylist />,
                loader: radioPlaylistLoader,
            },
            {
                path: "/:slug",
                element: <Playlist />,
                loader: playlistLoader,
            },
        ],
    },

]);