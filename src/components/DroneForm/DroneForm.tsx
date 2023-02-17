import React from "react";
import { useDispatch, useStore } from 'react-redux'
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseMake, chooseModel, choosePrice, chooseMpg, chooseSpeed, chooseDimension, chooseWeight, chooseProdCost } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input'
import { serverCalls } from '../../api'
import { useGetData } from "../../custom-hooks";


interface DroneFormProps {
    id?: string,
    data?: {}
}

export const DroneForm = (props: DroneFormProps) => {
    const dispatch = useDispatch()
    let { droneData, getData } = useGetData();
    const store = useStore()
    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data: any, event: any) => {
        console.log(props.id)

        if (props.id!) {
            await serverCalls.update(props.id, data)
            console.log(`Updated: ${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseMake(data.make))
            dispatch(chooseModel(data.model))
            dispatch(choosePrice(data.price))
            dispatch(chooseMpg(data.mpg))
            dispatch(chooseSpeed(data.max_speed))
            dispatch(chooseDimension(data.dimensions))
            dispatch(chooseWeight(data.weight))
            dispatch(chooseProdCost(data.cost_of_production))
            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="make">Car Make</label>
                    <Input {...register('make')} name="make" placeholder="Make" />
                </div>
                <div>
                    <label htmlFor="model">Car Model</label>
                    <Input {...register('model')} name="model" placeholder="Model" />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder="Price" />
                </div>
                <div>
                    <label htmlFor="mpg">MPG</label>
                    <Input {...register('mpg')} name="mpg" placeholder="MPG" />
                </div>
                <div>
                    <label htmlFor="max_speed">Max Speed</label>
                    <Input {...register('max_speed')} name="max_speed" placeholder="Max Speed" />
                </div>
                <div>
                    <label htmlFor="dimensions">Dimensions</label>
                    <Input {...register('dimensions')} name="dimensions" placeholder="Dimensions" />
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <Input {...register('weight')} name="weight" placeholder="Weight" />
                </div>
                <div>
                    <label htmlFor="cost_of_production">Cost Of Production</label>
                    <Input {...register('cost_of_production')} name="cost_of_production" placeholder="Cost Of Production" />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )

}