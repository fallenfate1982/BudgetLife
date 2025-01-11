import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  makeStyles,
  CircularProgress,
  Button,
  IconButton,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ExitToApp as LogoutIcon } from '@material-ui/icons';
import { useAuth } from '../../context/AuthContext';
import { budgets, transactions } from '../../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  chart: {
    height: 300,
    marginTop: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [budgetData, setBudgetData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetsResponse, transactionsResponse] = await Promise.all([
          budgets.getAll(),
          transactions.getAll()
        ]);
        
        setBudgetData(budgetsResponse.data);
        setTransactionData(transactionsResponse.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className={classes.loadingContainer}>
        <CircularProgress />
      </Container>
    );
  }

  // Process transaction data for chart
  const chartData = transactionData.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    const existingMonth = acc.find(item => item.name === month);
    
    if (existingMonth) {
      if (transaction.isExpense) {
        existingMonth.expenses += transaction.amount;
      } else {
        existingMonth.income += transaction.amount;
      }
    } else {
      acc.push({
        name: month,
        income: transaction.isExpense ? 0 : transaction.amount,
        expenses: transaction.isExpense ? transaction.amount : 0
      });
    }
    return acc;
  }, []).sort((a, b) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.indexOf(a.name) - months.indexOf(b.name);
  });

  if (loading) {
    return (
      <Container className={classes.loadingContainer}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={2} alignItems="center" className={classes.header}>
        <Grid item xs>
          <Typography variant="h4">Dashboard</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={logout} title="Logout">
            <LogoutIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
              Total Budget
            </Typography>
            <Typography variant="h4">$12,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
              Total Expenses
            </Typography>
            <Typography variant="h4">$8,500</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
              Remaining
            </Typography>
            <Typography variant="h4">$3,500</Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
              Income vs Expenses
            </Typography>
            <div className={classes.chart}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#4CAF50" />
                  <Bar dataKey="expenses" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
              Recent Transactions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Transaction list will be implemented in step 007
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
