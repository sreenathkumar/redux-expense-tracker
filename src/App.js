import Balance from './components/Balance';
import Form from './components/Form';
import Layout from './components/Layout';
import Transactions from './components/Transactions/Transactions';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TotalTransactions from './components/Transactions/TotalTransactions';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Balance />
                                <Form />
                                <Transactions />
                            </>
                        }
                    />
                    <Route path="/transactions" element={<TotalTransactions />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
