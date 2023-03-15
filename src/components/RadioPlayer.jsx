import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'react-use';
import streams from '../common/stations.json';
import Button from './Button';
import { StationChooser } from './StationChooser';
import { LoadingIcon } from './icons/Loading';
import { NextIcon } from './icons/Next';
import { PauseIcon } from './icons/Pause';
import { PrevIcon } from './icons/Prev';
import { MutedVolumeIcon, VolumeIcon } from './icons/Volume';
import { PlayIcon } from './icons/play';

const Player = styled.div`
    display: flex;
    flex-direction: column;
    place-items: center;
    min-width: 300px;
    max-width: 800px;
    width: 100%;
    padding: 1rem;
`
const Controls = styled.div`
    background: #f1f3f4;
    border-radius: 30px;
    display: flex;
    place-items: center;
    padding: 1rem;
    width: 100%;
    height: 54px;
    justify-content: space-between;
    > * {
        min-width: 30px;
        margin: .5rem;
    }
`

const Slider = styled.input`
    transition: width 0.5s ease-in-out;
`

const PlaybackControls = styled.div`
    display: flex;
    width: 60%;
    justify-content: space-around;
`

// define playback enum
const PLAYBACK_STATES = {
    PLAYING: 'playing',
    PAUSED: 'paused',
    LOADING: 'loading',
};

function getPlayIcon(state) {
    switch (state) {
        case PLAYBACK_STATES.PLAYING:
            return PauseIcon;
        case PLAYBACK_STATES.PAUSED:
            return PlayIcon;
        case PLAYBACK_STATES.LOADING:
            return LoadingIcon;
        default:
            return PlayIcon;
    }
}

export const RadioPlayer = () => {
    const audioRef = useRef(null);

    const [currentStream, setCurrentStream] = useLocalStorage('currentStream', 0);
    const [volume, setVolume] = useLocalStorage('volume', 1);
    const [muted, setMuted] = useState(false)
    const [showVolumeControl, setShowVolumeControl] = useState(false)
    const [playbackState, setPlaybackState] = useState(PLAYBACK_STATES.PAUSED);
    const stream = streams[currentStream];
    const ThevolumeIcon = muted ? MutedVolumeIcon : VolumeIcon;

    useEffect(() => {
        if (!audioRef.current) return
        const audio = audioRef.current;
        audio.addEventListener('playing', () => {
            console.log('playing');
        });
        audio.oncanplay = () => {
            console.log('can play');
        };
        audio.onpause = () => {
            console.log('paused');
            setPlaybackState(PLAYBACK_STATES.PAUSED);
        }
        audio.onplay = () => {
            console.log('playing');
            setPlaybackState(PLAYBACK_STATES.PLAYING);
        }
        audio.onvolumechange = (e) => {
            console.log('volume changed', e.target.volume);
        }
        navigator.mediaSession.setActionHandler("previoustrack", () => {
            prev();
        });
        navigator.mediaSession.setActionHandler("nexttrack", () => {
            next();
        });
        navigator.mediaSession.setActionHandler("play", () => {
            togglePlay();
        });
        navigator.mediaSession.setActionHandler("pause", () => {
            togglePlay();
        });
        navigator.mediaSession.setActionHandler("stop", () => {
            audioRef.current.pause();
        });
    }, [audioRef]);


    function updateCurrentStream(streamIdx) {
        setCurrentStream(streamIdx);
        setPlaybackState(PLAYBACK_STATES.LOADING)
        audioRef.current.src = streams[streamIdx].url;
    }

    function playCurrentStream() {
        audioRef.current.play();
    }

    function pausePlayback() {
        audioRef.current.pause();
    }

    function togglePlay() {
        if (playbackState === PLAYBACK_STATES.PLAYING) {
            pausePlayback();
        } else {
            setPlaybackState(PLAYBACK_STATES.LOADING);
            playCurrentStream();
        }
    }

    function next() {
        if (currentStream < streams.length - 1) {
            updateCurrentStream(currentStream + 1);
        } else {
            updateCurrentStream(0);
        }
    }

    function prev() {
        if (stream > 0) {
            updateCurrentStream(currentStream - 1);
        } else {
            updateCurrentStream(streams.length - 1);
        }
    }

    function toggleMute() {
        const muted = audioRef.current.muted;
        setMuted(!muted)
        audioRef.current.muted = !muted;
    }

    function changeVolume(e) {
        audioRef.current.volume = e.target.value;
        setVolume(e.target.value);
    }

    return (
        <Player>
            <StationChooser stations={streams} currentStream={stream} onUpdateSelection={stream => {
                updateCurrentStream(stream)
            }
            } />
            <Controls>
                <PlaybackControls>
                    <Button round icon={PrevIcon} onClick={prev} />
                    <Button round icon={
                        getPlayIcon(playbackState)}
                        onClick={togglePlay} />
                    <Button round icon={NextIcon} onClick={next} />
                </PlaybackControls>
                <div
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                    onMouseEnter={() => setShowVolumeControl(true)} onMouseLeave={() => setShowVolumeControl(false)}>
                    <Slider type="range" min={0} max={1} value={volume} step={0.1} onChange={changeVolume}
                        style={{
                            width: showVolumeControl ? "100%" : 0, opacity: showVolumeControl ? 1 : 0
                        }} />
                    <Button round icon={ThevolumeIcon}
                        onClick={toggleMute} />
                </div>
            </Controls>
            <audio ref={audioRef} src={stream.url} autoPlay />
        </Player>
    )
}
