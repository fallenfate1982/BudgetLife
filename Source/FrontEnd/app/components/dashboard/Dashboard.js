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
    padding: theme.spacing(12),
    backgroundColor: theme.palette.background.default,
  },
  header: {
    marginBottom: theme.spacing(20),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
  },
  title: {
    marginBottom: theme.spacing(6),
  },
  chart: {
    height: 400,
    marginTop: theme.spacing(8),
  },
  gridContainer: {
    marginBottom: theme.spacing(20),
  },
  buttonPrimary: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: theme.spacing(1.5),
    marginRight: theme.spacing(2),
    borderRadius: theme.spacing(1),
    transition: 'opacity 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#000000',
      opacity: 0.9,
    },
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #000000',
    transition: 'opacity 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      opacity: 0.9,
    },
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
        <CircularProgress style={{ color: '#000000' }} size={48} thickness={4} />
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
        <CircularProgress style={{ color: '#000000' }} size={48} thickness={4} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={2} alignItems="center" className={classes.header}>
        <Grid item xs>
          <Typography variant="h2" color="textPrimary">Dashboard</Typography>
        </Grid>
        <Grid item>
          <IconButton 
            onClick={logout} 
            title="Logout"
            className={classes.buttonPrimary}
          >
            <LogoutIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={6} className={classes.gridContainer}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper} elevation={0}>
            <Typography variant="h4" color="textSecondary" className={classes.title}>
              Total Budget
            </Typography>
            <Typography variant="h2" color="textPrimary">$12,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper} elevation={0}>
            <Typography variant="h4" color="textSecondary" className={classes.title}>
              Total Expenses
            </Typography>
            <Typography variant="h2" color="textPrimary">$8,500</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper} elevation={0}>
            <Typography variant="h4" color="textSecondary" className={classes.title}>
              Remaining
            </Typography>
            <Typography variant="h2" color="textPrimary">$3,500</Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} className={classes.gridContainer}>
          <Paper className={classes.paper} elevation={0}>
            <Typography variant="h3" color="textPrimary" className={classes.title}>
              Income vs Expenses
            </Typography>
            <div className={classes.chart}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="#E5E7EB" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#697386"
                    fontSize={14}
                    tickLine={false}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis 
                    stroke="#697386"
                    fontSize={14}
                    tickLine={false}
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                  <Bar 
                    dataKey="income" 
                    fill="#4CAF50" 
                    barSize={16} 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="expenses" 
                    fill="#F44336" 
                    barSize={16} 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} className={classes.gridContainer}>
          <Paper className={classes.paper} elevation={0}>
            <Typography variant="h3" color="textPrimary" className={classes.title}>
              Recent Transactions
            </Typography>
            <Typography variant="body1" color="textSecondary">
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
