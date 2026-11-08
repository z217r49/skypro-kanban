import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageBoardCards from './pages/PageBoardCards';
import PageNewTask from './pages/PageNewTask';
import PageUser from './pages/PageUser';
import PageOutAccount from './pages/PageOutAccount';
import Page404 from './pages/Page404';
import PageRegistration from './pages/PageRegistration';
import PageViewingEditingCard from './pages/PageViewingEditingCard';

function AppRoutes () {
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<PageBoardCards loading={loading} />} />

                <Route path='/page-user' element={<PageUser />} />
                
                <Route path='/page-new-task' element={<PageNewTask />} />

                <Route path='/PageOutAccount' element={<PageOutAccount />} />


            </Routes>
        </Router>
    )

}