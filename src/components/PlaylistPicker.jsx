import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import allPlaylists from '../common/playlists.json';

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: -30px;
    z-index: 100;
    width: 100%;
`
const Input = styled.input`
  padding-left: 25px;
  background: url("https://static.thenounproject.com/png/101791-200.png") no-repeat left;
  background-size: 20px;
  border-radius: 20px;
  border-bottom: 1px solid #040404;
  width: 100%;
  height: 30px;
`
const PlaylistList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    li {
        padding: 0.5rem;
        /* border-bottom: 1px solid #040404; */
        /* border-radius: 20px; */
        background: #f4e176;
        border-radius: 20px;
        cursor: pointer;
        &:hover {
            background: #f1f3f4;
        }
    }
    transition: all 0.5s ease-in-out;
`



export const PlaylistPicker = () => {
    const [open, setOpen] = useState(false)
    const [playlists, setPlaylists] = useState(allPlaylists)
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();

    const onChange = useCallback((e) => {
        const { value } = e.target
        setSearch(value);
        setPlaylists(allPlaylists.filter((playlist) => playlist.name.toLowerCase().includes(value.toLowerCase())));
    }, []);

    const onKeyDown = useCallback((e) => {
        if (e.code === 'Escape') {
            setOpen(false)
        } else if (e.code === 'ArrowDown') {
            setSelected((selected + 1) % playlists.length)
        } else if (e.code === 'ArrowUp') {
            setSelected(selected === 0 ? playlists.length - 1 : selected - 1)
        } else if (e.code === 'Enter') {
            navigate(`/${playlists[selected].slug}`)
            setOpen(false)
        }
    }, [selected])

    return (
        <Flex onKeyDown={onKeyDown}>
            <Input type="text" placeholder="Search Playlists" onClick={() => setOpen(!open)} onBlur={() => setOpen(false)} value={search} onChange={onChange} />
            <PlaylistList style={{ height: open ? "200px" : '0px' }}>
                {playlists.map((playlist, idx) => (
                    <Link to={`/${playlist.slug}`}>
                        <li key={playlist.slug} style={{ backgroundColor: selected == idx ? 'white' : 'wheat' }}>
                            {playlist.name}
                        </li>
                    </Link>

                ))}
            </PlaylistList>
        </Flex>
    )
}
