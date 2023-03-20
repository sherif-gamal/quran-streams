import { useLoaderData } from "react-router-dom";
import playlists from "../common/playlists.json";
import { PlaylistPlayer } from '../components/Player';
import { getPlaylist } from "../utils/m3u8Utils";


export async function loader() {
    const url = playlists.find((playlist) => playlist.slug === 'radio').url;
    const playlist = await getPlaylist(url);
    return { playlist, isRadio: true };
}

export default function RadioPlaylist() {
    const data = useLoaderData();
    const playlist = data && data.playlist

    return (
        <PlaylistPlayer playlist={playlist} />
    );
}