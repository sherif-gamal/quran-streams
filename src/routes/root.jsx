import { Link, Outlet, useLoaderData } from "react-router-dom";
import playlists from "../common/playlists.json";


export function loader() {
    return { playlists };
}

export default function Root() {
    const { playlists } = useLoaderData();

    return (
        <>
            <div id="sidebar">
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search playlists"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                </div>
                <nav>
                    {playlists.length ? (
                        <ul>
                            {playlists.map((playlist) => (
                                <li key={playlist.name}>
                                    <Link to={`/name`}>
                                        {playlist.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No playlists</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}