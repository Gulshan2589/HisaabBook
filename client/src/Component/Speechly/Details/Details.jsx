import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Doughnut} from 'react-chartjs-2';
// import { ArcElement, Chart } from 'chart.js';

import useStyles from './styles';
import useTransactions from '../../../useTransactions';

const Details = ({ title }) => {
    // Chart.register(ArcElement);
    const classes = useStyles();
    const { total, chartData } = useTransactions(title);
    return (
        <Card className={title === 'Income' ? classes.income : classes.expense}>
            <CardHeader title={title} />
            <CardContent>
                <Typography variant='h5'>₹{total}</Typography>
                <Doughnut data={chartData} />
            </CardContent>
        </Card>
    )
}

export default Details;