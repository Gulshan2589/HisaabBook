import React, { useContext, useState, useEffect } from 'react';
import { Table, Select, DatePicker } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AiOutlineBarChart, AiOutlineBars } from "react-icons/ai";
import './Dashboard.css';
import { message } from "antd";
import Spinner from '../Auth/spinner';
import axios from 'axios';
import { Analtics, Main } from '../../Component';
import { ExpenseTrackerContext } from '../../Context/Context';
import formateDate from '../../Utils/formateDate';

function Dashboard() {
  const { RangePicker } = DatePicker;
  const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext);
  const [selectedRange, setSelectedRange] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [type, setType] = useState('all');
  const [viewType, setViewType] = useState("table");
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("HisabbookUser"));
      setLoading(true);
      const respone = await axios.get('/api/transaction/getalltransactions', {UserId: user._id});
      setTransactionsData(respone.data);
      setLoading(false);
    } catch (error) {
      message.error('somethin went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransaction();
  }, [])


  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{formateDate(text)}</span>
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
      render: (text, transactions) => {
        return (
          <div>
            <EditOutlined className='a-icons1' />
            <DeleteOutlined className='a-icons2' onClick={() => deleteTransaction(transactions.id)} />
          </div>
        );
      },
    },
  ];
  return (
    <div className='dashboard_container'>
      {loading && <Spinner />}
      <div className='filter' >
        <div className='d-flex1'>
          <div className='frequency'>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <div className="mt-2">
                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
              </div>
            )}
          </div>
          <div className='type' >
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value='all'>ALL </Select.Option>
              <Select.Option value='Income'>Income</Select.Option>
              <Select.Option value='Expense'>Expense</Select.Option>
            </Select>
          </div>
        </div>
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
      <div className="table-analtics">
        {viewType === "table" ? <div className="table">
          <Table columns={columns} dataSource={transactionsData} />
        </div> : <Analtics />}
      </div>
      {showAddEditTransactionModal && (
        <><Main
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
        /></>
      )}
    </div>
  );
}

export default Dashboard;