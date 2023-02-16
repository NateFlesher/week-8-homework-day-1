import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api'
import { useGetData } from '../../custom-hooks';
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'
import { DroneForm } from '../DroneForm';

interface GridData {
    data: {
        id?: string
    }
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 110,
        editable: true,
        type: 'number'
    },
    {
        field: 'camera_quality',
        headerName: 'Camera Quality',
        width: 160
    },

    {
        field: 'flight_time',
        headerName: 'Flight Time',
        width: 110,
        editable: true
    },

    {
        field: 'max_speed',
        headerName: 'Max Speed',
        width: 110,
        editable: true,
    },

    {
        field: 'dimensions',
        headerName: 'Dimensions',
        width: 110,
        editable: true,
    },

    {
        field: 'weight',
        headerName: 'Weight',
        width: 110,
        editable: true,
    },

    {
        field: 'cost_of_production',
        headerName: 'Cost of Production',
        width: 110,
        editable: true,
        type: 'number'
    },

    {
        field: 'Series',
        headerName: 'series',
        width: 110,
        editable: true,

    },
];


export const DataTable = () => {
    let { droneData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true)
    }
    let handleClose = () => {
        setOpen(false)
    }
    let deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }

    console.log(gridData)


    return (
        <div style={{ height: 400, width: '100%' }}>
            <h2>Drones In Inventory</h2>
            <DataGrid
                rows={droneData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel) }}
                {...droneData}
            />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id='form-dialog-title'>Update a Drone</DialogTitle>
                <DialogContent>
                    <DialogContentText>Drone Id: {gridData[0]}
                        <DroneForm id={`${gridData[0]}`} />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}