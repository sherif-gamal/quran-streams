// parse m3u8 audio playlist file
export function parseAudioPlaylist(m3u8) {
    const lines = m3u8.split('\n');
    const playlist = { title: '', tracks: [] }
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('#EXTINF:')) {
            const commaSeparatedTokens = line.split(',');
            const groupTitle = commaSeparatedTokens[0].split('group-title="')[1].split('"')[0];
            const name = commaSeparatedTokens[commaSeparatedTokens.length - 1];
            const url = lines[i + 1];
            playlist.tracks.push({ groupTitle, name, url });
        }
    }
    return playlist;
}

// fetch m3u8 file from a remote url
export async function getPlaylist(url) {
    const res = await fetch(url);
    const m3u8 = await res.text();
    return parseAudioPlaylist(m3u8);
}