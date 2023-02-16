import React, {useState, useEffect } from "react";
import { serverCalls } from '../api'


export const useGetData = () => {
    const [droneData, setData] = useState<any>([]);

    async function handleDataFetch(){
        const result = await serverCalls.get();
        setData(result)
    }



    //useEffect hook, which stores the data form the function to render after page renders
    useEffect( () => {
        handleDataFetch();
    }, [])

    return { droneData, getData:handleDataFetch }
}