// Import necessary dependencies and components from Material UI and other libraries
import React, { useState, useEffect, useContext } from 'react';
import {
    TextField, Typography, Grid, Button,
    Card, CardHeader, CardContent, Divider, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import { incomeCategories, expenseCategories } from '../../Constant/categories';
import useStyles from './styles';
import InfoCard from '../../Component/Dashboard/InfoCard';
import { Modal, message } from 'antd';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../Auth/spinner';
import { ExpenseTrackerContext } from '../../Context/Context';
import formateDate from '../../Utils/formateDate';
import { useSpeechContext } from '@speechly/react-client';
import {
    PushToTalkButton,
    PushToTalkButtonContainer
} from "@speechly/react-ui";//import speechly Ui 

//initial state of form
const initialState = {
    amount: '',
    category: '',
    type: '',
    date: '',
    reference: '',
    description: '',
};

//the Modelpopup function call when click on add new button 
//and passing the props of dashbord1 component
const Modelpopup = ({ setShowAddEditTransactionModal, showAddEditTransactionModal,
    selectedItemForEdit, setSelectedItemForEdit, getTransactions}) => {
    //defining constant using useState, usStyles, useContext hooks
    const classes = useStyles();
    const { segment } = useSpeechContext();
    const [formData, setFormData] = useState(initialState);
    // Define a constant to determine the categories based on the selected type
    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;
    const [loading, setLoading] = useState(false);
    const { addTransaction , balance} = useContext(ExpenseTrackerContext);

    //onFinish function when Create button clicked
    const onFinish = async () => {
        const transaction = { ...formData, amount: Number(formData.amount) };
        //assigning value of localstorage data to user varaible
        try {
            const user = JSON.parse(localStorage.getItem("HisabbookUser"));
            //setTimeout(() => setLoading(true), 3000);
            setLoading(true);
            //if form is in edit state then if codtion otherwise else
            if (selectedItemForEdit) {
                // Send a POST request to the server to edit the selected transaction
                axios.post("/api/transaction/edit-transaction", {
                    payload: { ...transaction, UserId: user._id, },
                    transactionId: selectedItemForEdit._id,
                });
                //getting all transactions
                getTransactions();
                message.success("Transaction Updated successfully");
            }
            else {
                // Send a POST request to the server to add a new transaction
                await axios.post('/api/transaction/addtransaction', { ...transaction, UserId: user._id });
                message.success("Transaction added successfully");
                //adding transcation to context api
                addTransaction({...transaction, amount: Number(formData.amount), id: uuidv4() });
                getTransactions();
            }
            //setting the transactionModal state to false
            setShowAddEditTransactionModal(false);
            setSelectedItemForEdit(null);
            //setting the loading state to false
            
            //catching error if any exception
        } catch (error) {
            
            message.error('something went wrong');
        } finally {
            setLoading(false);
        }
    };

    // Listen for changes to the Speechly segment and update the form data accordingly
    useEffect(() => {
        if (segment) {
            // Check the intent of the Speechly segment and update the transaction type accordingly
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' });
            } else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' });
            } else if (segment.intent.intent === 'add_reference') {
                setFormData({ ...formData, reference: segment })
            } else if (segment.intent.intent === 'add_description') {
                setFormData({ ...formData, description: segment })
            } else if (segment.intent.intent === 'add_date') {
                setFormData({ ...formData, date: segment })
            }

            // Check the entities of the Speechly segment and update the form data accordingly
            segment.entities.forEach((e) => {
                // Convert the first character to uppercase and the rest to lowercase
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                const refer = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                const desc = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value });
                        break;
                    case 'category':
                        // Check if the entity value matches a category in the income or 
                        //expense category list and update the form data accordingly
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
        }
    }, [segment]);

    return (
        //antd modal popup 
        <Modal title={selectedItemForEdit ? "Edit Transaction" : "Add Transcation"}
         open={showAddEditTransactionModal}
            onCancel={() => setShowAddEditTransactionModal(false)}
            footer={false}>
            {/* card with classname root */}
            {loading && <Spinner text="Saving..." />}
            <Card className={classes.root}>
                <CardHeader className={classes.CardHeader} title="HisaabBook"
                    subheader={<Typography className={classes.subheader}>Powerd by Speechly</Typography>} />
                <CardContent>
                    <Typography align="center" variant="h5">Total Balance ₹{balance}</Typography>
                    <Typography style={{ lineheight: '2em', marginTop: '20px' }}>
                        {/* for additional information */}
                       
                        <InfoCard />
                    </Typography>
                    <Divider className={classes.divider} />
                    {/* The container for the form's input fields */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography className={classes.Typography} align="center" variant="subtitle2" gutterBottom>
                                {segment && segment.words.map((w) => w.value).join(" ")}
                            </Typography>
                        </Grid>
                        {/* A grid item for selecting the type of transaction */}
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel >Type</InputLabel>
                                <Select value={formData.type} onChange={(e) => setFormData({
                                     ...formData, type: e.target.value })}>
                                    <MenuItem value="Income">Income</MenuItem>
                                    <MenuItem value="Expense">Expense</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* A grid item for selecting the category of the transaction */}
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select value={formData.category} onChange={(e) => setFormData({ 
                                    ...formData, category: e.target.value })}>
                                    {selectedCategories.map((c) => <MenuItem key={c.type} 
                                    value={c.type}>{c.type}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* A grid item for entering the amount of the transaction */}
                        <Grid item xs={6}>
                            <TextField type="number" label="Amount" fullWidth value={
                            formData.amount} onChange={ (e) => setFormData({ ...formData, amount: e.target.value })} />
                        </Grid>
                        {/* A grid item for selecting the date of the transaction */}
                        <Grid item xs={6}>
                            <TextField type="date" label="Date" fullWidth value={formData.date} onChange={
                                (e) => setFormData({ ...formData, date: formateDate(e.target.value) })} />
                        </Grid>
                        {/* A grid item for entering the Reference of the transaction */}
                        <Grid item xs={6}>
                            <InputLabel >Reference</InputLabel>
                            <TextField type="text" fullWidth
                                value={formData.reference} onChange={(e) => setFormData({
                                     ...formData, reference: e.target.value })} />
                        </Grid>
                        {/* A grid item for entering the Description of the transaction */}
                        <Grid item xs={6}>
                            <InputLabel>Description</InputLabel>
                            <TextField type="text" fullWidth
                                value={formData.description} onChange={(e) => setFormData({
                                     ...formData, description: e.target.value })} />
                        </Grid>
                        {/* button for submiting data */}
                        <Button className={classes.button} variant="outlined" color="primary"
                            onFinish fullWidth onClick={onFinish}>{selectedItemForEdit ?"Save":"Create"}</Button>
                        {/* Speechly PushToTalkButton for voice input */}
                        <PushToTalkButtonContainer>
                            <PushToTalkButton />
                        </PushToTalkButtonContainer>
                    </Grid>
                </CardContent >
            </Card>
        </Modal>
    );
};

export default Modelpopup; 