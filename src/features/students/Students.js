import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import DataTable from '../../components/DataTable'


const Students = () => {
    const tableColumns = [
        { field: 'name', headerName: 'Name', flex: 1, headerClassName: "customColor", },
        { field: 'age', headerName: 'Age', flex: 1, headerClassName: "customColor", },
        { field: 'dob', headerName: 'Date of birth', flex: 1, headerClassName: "customColor", },
        {
            field: 'actions', headerName: 'Actions', flex: 1, headerClassName: "customColor", renderCell: (params) => (
                <Button variant='outlined' size='small'>View</Button>
            )
        },
    ]
    const rows = [
        { id: 1, name: 'john', age: 31, dob: '12-25-2000' },
        { id: 2, name: 'jane', age: 25, dob: '12-04-2000' },
        { id: 3, name: 'alex', age: 26, dob: '12-16-2000' },
    ]
    return (
        <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <Button variant='contained' size="small">Add new</Button>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: 400, width: '100%', marginTop: '2rem' }}>
                    <DataTable
                        columns={tableColumns}
                        rows={rows}
                    />
                </Box>
            </Grid>
        </Grid>

    )
}

export default Students