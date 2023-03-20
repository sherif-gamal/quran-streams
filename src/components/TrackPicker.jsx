import styled from '@emotion/styled';
import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';
import Button from './Button';
import { ChevronDown, ChevronUp } from './icons/Chevron';

const Container = styled.div`
    width: 95%;
`
const List = styled.div`
    display: flex;
    flex-direction: column;
    place-items: center;
    transition: all 1s ease-in-out;
    overflow-y: scroll;
`

const Station = styled.div`
    background: #f1f3f4;
    font-size: small;
    padding: 5px;
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
    height: 54px;
    justify-content: space-between;
    border-bottom: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
`

const CurrentlyPlaying = styled.div`
    background: #f1f3f4;
    font-size: small;
    padding: 5px;
    display: flex;
    place-items: center;
    width: 100%;
    /* height: 30px; */
    justify-content: space-between;
    border-bottom: 1px solid black;
    border-radius: 10px;
`;
const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

export const TrackPicker = ({ playlist, currentStream, onUpdateSelection }) => {
    const [open, setOpen] = useState(true)
    const chevron = open ? ChevronDown : ChevronUp
    const stream = playlist.tracks[currentStream]
    return (
        <Container>
            <CurrentlyPlaying>
                <Marquee direction='right' gradientColor={[208, 183, 142]}>
                    {stream.groupTitle} | {stream.name}
                </Marquee>
                <Flex>
                    <Button icon={chevron} onClick={() => setOpen(!open)} />
                </Flex>
            </CurrentlyPlaying>
            {
                <List style={{ maxHeight: open ? "400px" : "0px" }}>
                    {playlist.tracks.map((station, index) => (
                        <Station key={index} onClick={() => onUpdateSelection(index)}
                            style={{
                                backgroundColor: currentStream === index ? "#b1ce34" : "#f1f3f4"
                            }}>
                            <div>{index + 1} - {station.name}</div>
                        </Station>
                    ))}
                </List>
            }

        </Container>
    )
}