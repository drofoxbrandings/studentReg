import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    root: {
        '& .customColor': {
            backgroundColor: '#b0bec5'
        }
    }
})

const DataTable = (props) => {
    const classes = useStyles()
    return (
        <DataGrid
            className={classes.root}
            rows={props.rows}
            columns={props.columns}
            autoHeight={true}
        />
    )
}

export default DataTable