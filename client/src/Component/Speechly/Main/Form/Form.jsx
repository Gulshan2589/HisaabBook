import React, { useContext, useState, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import { useSpeechContext } from '@speechly/react-client';
import { ExpenseTrackerContext } from '../../../../Context/Context';
import { message } from "antd";
import axios from "axios";
import Spinner from "../../../Auth/spinner";
import { incomeCategories, expenseCategories } from '../../../../Constant/categories';
import formateDate from '../../../../Utils/formateDate';
import {
    PushToTalkButton,
    PushToTalkButtonContainer
} from "@speechly/react-ui";

const initialState = {
    amount: '2300',
    category: 'Lottery',
    type: 'Income',
    date: formateDate(new Date()),
};

const Form = ({ setShowAddEditTransactionModal }) => {
    const { segment } = useSpeechContext();
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const { addTransaction } = useContext(ExpenseTrackerContext);
    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;
    const [loading, setLoading] = useState(false);

    // const createTransaction = async () => {
    //     try {
    //         if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
    //         const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() };
    //         setFormData(initialState);
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // };
    const onFinish = async () => {
        const transaction = { ...formData, amount: Number(formData.amount) };
        const user = JSON.parse(localStorage.getItem("Hisabbook-user"));
        try {
            setLoading(true);
            await axios.post('/api/transaction/addtransaction', { ...transaction, UserId: user._id });
            message.success("Transaction added successfully");
            addTransaction(transaction);
            setLoading(false);
        } catch (error) {
            message.error('something went wrong');
            setLoading(false);
        }
    };


    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' });
            } else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' });
            } else if (segment.intent.intent === 'add_reference') {
                setFormData({ ...formData, reference: segment })
            } else if (segment.intent.intent === 'add_description') {
                setFormData({ ...formData, description: segment })
            } else if (segment.intent.intent === 'add_date')
                //{
                setFormData({ ...formData, date: segment })
            // } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
            //     return createTransaction();
            // } 
            else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return setFormData(initialState);
            }

            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                const refer = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                const desc = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value });
                        break;
                    case 'category':
                        if (incomeCategories.map((iC) => iC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Income', category });
                        } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Expense', category });
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: e.value });
                        break;
                    case 'reference':
                        setFormData({ ...formData, reference: refer });
                        break;
                    case 'description':
                        setFormData({ ...formData, description: desc });
                        break;
                    default:
                        break;
                }
            });

            // if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
            //     createTransaction();
            // }
        }
    }, [segment]);
    return (
        <Grid container spacing={2}>
            {loading && <Spinner />}
            <Grid item xs={12}>
                <Typography className={classes.Typography} align="center" variant="subtitle2" gutterBottom>
                    {segment && segment.words.map((w) => w.value).join(" ")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel >Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e) => setFormData({ ...formData, date: formateDate(e.target.value) })} />
            </Grid>
            <Grid item xs={6}>
                <InputLabel >Reference</InputLabel>
                <TextField type="text" fullWidth
                    value={formData.reference} onChange={(e) => setFormData({ ...formData, reference: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <InputLabel>Description</InputLabel>
                <TextField type="text" fullWidth
                    value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary"
                onFinish fullWidth onClick={onFinish}>Create</Button>
            <PushToTalkButtonContainer>
                <PushToTalkButton />
            </PushToTalkButtonContainer>
        </Grid>
    );
}

export default Form;