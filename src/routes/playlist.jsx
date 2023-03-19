import React from 'react';
import { useLoaderData } from 'react-router-dom';
import playlists from '../common/playlists.json';
import { getPlaylist } from '../utils/m3u8Utils';

export async function loader({ params }) {
    const url = playlists.find((playlist) => playlist.slug === params.slug).url;
    const playlist = await getPlaylist(url);
    console.log(playlist)
    return { playlist };
}

export const Playlist = () => {
    const { playlist } = useLoaderData();
    console.log(playlist)
    return (
        <div>{playlist.tracks.map(t =>
            <div>
                <span>{t.name}</span>
                <span>{t.url}</span>
            </div>
        )}</div>
    )
}
