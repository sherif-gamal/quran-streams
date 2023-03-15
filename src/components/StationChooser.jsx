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

export const StationChooser = ({ stations, currentStream, onUpdateSelection }) => {
    const [open, setOpen] = useState(true)
    const chevron = open ? ChevronDown : ChevronUp
    return (
        <Container>
            <CurrentlyPlaying>
                <Marquee direction='right' gradientColor={[14, 5, 5]}>
                    {currentStream.ar} | {currentStream.en}
                </Marquee>
                <Flex>
                    <Button icon={chevron} onClick={() => setOpen(!open)} />
                </Flex>
            </CurrentlyPlaying>
            {
                <List style={{ maxHeight: open ? "400px" : "0px" }}>
                    {stations.map((station, index) => (
                        <Station key={index} onClick={() => onUpdateSelection(index)} >
                            <div>{station.ar}</div>
                            <div>{station.en}</div>
                        </Station>
                    ))}
                </List>
            }

        </Container>
    )
}