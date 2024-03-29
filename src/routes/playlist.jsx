import React from 'react';
import { useLoaderData } from 'react-router-dom';
import playlists from '../common/playlists.json';
import { PlaylistPlayer } from '../components/Player';
import { getPlaylist } from '../utils/m3u8Utils';

export async function loader({ params }) {
    const url = playlists.find((playlist) => playlist.slug === params.slug).url;
    const playlist = await getPlaylist(url);
    return { playlist, isRadio: params.slug === 'radio' };
}

export const Playlist = () => {
    const { playlist, isRadio } = useLoaderData();
    return (
        <div>
            <PlaylistPlayer playlist={playlist} isRadio={isRadio} />
        </div>
    )
}
