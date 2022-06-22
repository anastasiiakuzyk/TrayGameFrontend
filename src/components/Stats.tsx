import React, {FC, useEffect, useMemo} from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import {useHistory} from "react-router-dom";
import PrimaryButton from "./buttons/PrimaryButton";

interface StatsResponse {
    id: number;
    userId: number;
    totalKills: number;
    totalDeath: number;
    gamesPlayed: number;
}

interface UserResponse {
    id: number;
    nickname: number;
    photoUrl: string;
}

const useUserStats = () => {
    const userGameUUID = localStorage.getItem("gameUUID") ?? "";

    return useQuery<StatsResponse>("stats", async () => {
        const response = await axios.get(`http://localhost:8080/stats?uuid=${userGameUUID}`);
        return response.data;
    });
};

export const useUser = () => {
    const userGameUUID = localStorage.getItem("gameUUID") ?? "";

    return useQuery<UserResponse>("users", async () => {
        const response = await axios.get(`http://localhost:8080/user?uuid=${userGameUUID}`);
        return response.data;
    }, {retry: false});
};


export const Stats: FC = () => {
    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("gameUUID") === null) {
            history.push("/");
        }
    }, [history]);

    const { data: stats, isLoading: isStatsLoading } = useUserStats();
    const totalScore = useMemo(() => Math.floor(stats ? stats.totalKills/stats.totalDeath*stats.gamesPlayed : 0), [stats]);

    const { data: user, isLoading: isUserLoading } = useUser();

    const isDataLoading = !user || !stats || isStatsLoading || isUserLoading;

    return !isDataLoading ? (
        <div className="stat__page">
            <div className="profile__block">
                <img src={user?.photoUrl || ''} alt={(user?.nickname || '').toString()}/>
                <div className="profile__data">
                    <h2>{user?.nickname || ''}</h2>
                    <div><span>{totalScore}</span>pt</div>
                </div>

            </div>
            <div className={"stat__tips__wrapper"}>
                <div className={"stat__tips"}>
                    <h2>{stats?.totalKills || 0}</h2>
                    <span>Total Kills</span>
                </div>
                <div className={"stat__tips"}>
                    <h2>{stats?.totalDeath || 0}</h2>
                    <span>Total Death</span>
                </div>
                <div className={"stat__tips"}>
                    <h2>{stats?.gamesPlayed || 0}</h2>
                    <span>Games Played</span>
                </div>
            </div>
            <div className="modalScore__primaryButton-wrapper">
                <PrimaryButton onClick={() => history.push("/")}>Main Menu</PrimaryButton>
            </div>
        </div>
    ) : (<>Loading...</>);
}