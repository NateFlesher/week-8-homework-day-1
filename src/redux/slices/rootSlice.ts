import { createSlice } from "@reduxjs/toolkit";

export interface DroneState {
    make: string,
    model: string,
    price: number,
    mpg: string,
    max_speed: string,
    dimensions: string,
    weight: string,
    cost_of_production: number
}


const initialState: DroneState = {
    make: '',
    model: '',
    price: 0,
    mpg: '',
    max_speed: '',
    dimensions: '',
    weight: '',
    cost_of_production: 0
}


const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        chooseMake: (state, action) => { state.make = action.payload },
        chooseModel: (state, action) => { state.model = action.payload },
        choosePrice: (state, action) => { state.price = action.payload },
        chooseMpg: (state, action) => { state.mpg = action.payload },
        chooseSpeed: (state, action) => { state.max_speed = action.payload },
        chooseDimension: (state, action) => { state.dimensions = action.payload },
        chooseWeight: (state, action) => { state.weight = action.payload },
        chooseProdCost: (state, action) => { state.cost_of_production = action.payload }
    }
})


//Export Reducer
export const reducer = rootSlice.reducer
export const {
    chooseMake,
    chooseModel,
    choosePrice,
    chooseMpg,
    chooseSpeed,
    chooseDimension,
    chooseWeight,
    chooseProdCost
} = rootSlice.actions;