import React, { useContext } from 'react';
import Form from './Form/Form';
import { Card, CardContent, CardHeader, Typography,Divider } from '@material-ui/core';
import useStyles from './styles';
import InfoCard from '../../Dashboard/InfoCard';
import { ExpenseTrackerContext } from '../../../Context/Context';
import { Modal } from 'antd';

const Main = ({ setShowAddEditTransactionModal, showAddEditTransactionModal }) => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);
  return (
    <Modal title='Add Transaction' open={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}>
      <Card className={classes.root}>
        <CardHeader className={classes.CardHeader} title="HisaBook"
          subheader={<Typography className={classes.subheader}>Powerd by Speechly</Typography>} />
        <CardContent>
          <Typography align="center" variant="h5">Total Balance ${balance}</Typography>
          <Typography style={{ lineheight: '2em', marginTop: '20px' }}>
            <InfoCard />
          </Typography>
          <Divider className={classes.divider} />
          <Form  />
        </CardContent >
      </Card>
    </Modal>
  );
};

export default Main; 