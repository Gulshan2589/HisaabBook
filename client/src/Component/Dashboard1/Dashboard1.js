//import all files and libraries
import React, { useState, useEffect } from 'react';
import { Table, Select, DatePicker } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AiOutlineBarChart, AiOutlineBars } from "react-icons/ai";
import Spinner from '../Auth/spinner';
import axios from 'axios';
import { message } from 'antd';
import Analatics from "./analatics1";
import { Modelpopup } from '../../Component';
import '../Dashboard/Dashboard.css';
import moment from "moment";

//Creating functional component
const Dashboard1 = () => {
  //Declaring all state variable which is used below
  const { RangePicker } = DatePicker;
  const [selectedRange, setSelectedRange] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [type, setType] = useState('all');
  const [viewType, setViewType] = useState("table");
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  //getTransactions function when page load
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("HisabbookUser"));
        // Get the current user from local storage

        setLoading(true);
      // Make an API request to fetch transaction data from the server, 
      //passing in the user ID, frequency, and other options as parameters
      const respone = await axios.post('/api/transaction/get-all-transactions',
        {
          UserId: user._id, frequency,
          ...(frequency === 'custom' && { selectedRange }), type
        });
      // Set the fetched transaction data in the component's state
      setTransactionsData(respone.data);
      setLoading(false);
    } catch (error) {
      message.error('somethin went wrong');
      setLoading(false);
    }
  };

  // deleteTransactions function when delete button clicked
  const deleteTransactions = async (record) => {
    try {
      //setting the loading state to true
      setLoading(true);
      //posting data of deleted transaction through axios in database
      await axios.post('/api/transaction/delete-transaction', { transactionId: record._id });
      message.success("Transaction Deleted Successfully");
      //getting all transactions after deleteed transactions
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something Went Wrong');
    }
  };

  //it happens when page load
  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);


  // Define an array of column objects that describe the
  // structure and behavior of a table in the component
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Action",
      dataIndex: "action",
      // A function that returns the HTML for the "Action" 
      //column, which contains edit and delete icons
      render: (text, record) => {
        return (
          <div>
            <EditOutlined className='a-icons1' onClick={() => {
              setSelectedItemForEdit(record);
              setShowAddEditTransactionModal(true);
            }} />
            <DeleteOutlined className='a-icons2' onClick={() => {
              deleteTransactions(record)
            }} />
          </div>
        );
      },
    },
  ];


  return (
    <div className='dashboard_container'>
      {loading && <Spinner />}

      {/* This section includes a filter component with frequency and type selectors. */}
      <div className='filter' >
        <div className='d-flex1'>
          {/* Frequency selector */}
          <div className='frequency'>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>
            {/* If custom frequency is selected, display a range picker. */}
            {frequency === 'custom' && (
              <div className="mt-2">
                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
              </div>
            )}
          </div>
          {/* Type selector */}
          <div className='type' >
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value='all'>ALL </Select.Option>
              <Select.Option value='Income'>Income</Select.Option>
              <Select.Option value='Expense'>Expense</Select.Option>
            </Select>
          </div>
        </div>

        {/* This section includes a view type selector between table and analytics. */}
        <div className='d-flex2'>
          <div className='analysis'>
            <AiOutlineBars className={`icons ${viewType === "table" ? "active-icon" : "inactive-icon"} `}
              onClick={() => setViewType("table")} />
            <AiOutlineBarChart className={`icons ${viewType === "analytics" ? "active-icon" : "inactive-icon"} `}
              onClick={() => setViewType("analytics")} />
          </div>
          <div className='f-button'>
            <button className='primary' onClick={() => setShowAddEditTransactionModal(true)}>Add New</button>
          </div>
        </div>
      </div>

      {/* This div displays either the table view or the analytics view depending on the selected view type */}
      <div className="table-analtics">
        {viewType === "table" ? <div className="table">
          <Table className="table-data" columns={columns} dataSource={transactionsData} />
        </div> : <Analatics transactions={transactionsData} />}
      </div>
      {/* If the add/edit transaction modal is visible, render the Modelpopup component. */}
      {showAddEditTransactionModal && (
        <><Modelpopup
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}
        /></>
      )}
    </div>
  )
}

export default Dashboard1