import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { PlaylistPicker } from "../components/PlaylistPicker";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;
export default function Root() {

    return (
        <Main>
            <PlaylistPicker />
            <Outlet />
        </Main>
    );
}