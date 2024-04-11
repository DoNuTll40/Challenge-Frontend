
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import useAuth from "../hooks/UserAuth";
import Login from "../components/Login";
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import ListUsers from "../components/Pages/ListUsers";
import ListCars from "../components/Pages/ListCars";
import PageFound from "../components/Pages/PageFound";
import Register from "../components/Register";

const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Outlet />
        </>,
        children: [
            { index: true, element: <Login /> },
            { path: 'register', element: <Register /> },
        ]
    },
    {
        path: '*',
        element: <>
            <PageFound />
        </>
    },
])

const userRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Header />
            <Outlet />
            <Footer />
        </>,
        children: [
            { index: true, element: <Body />},
        ]
    },
    {
        path: '*',
        element: <>
            <PageFound />
        </>
    },
])

const adminRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Header />
            <Outlet />
            <Footer />
        </>,
        children: [
            { index: true, element: <Body /> },
            { path: "/cars", element: <ListCars /> },
            { path: "/users", element: <ListUsers /> },
        ]
    },
    {
        path: '*',
        element: <>
            <PageFound />
        </>
    },
])

export default function AppRoute() {
    const { user } = useAuth();
    // console.log(user)
    const finalRouter = user?.user_id ? user?.user_role === 'admin' ? adminRouter : userRouter : guestRouter
    return (
        <RouterProvider router={finalRouter} />
    )
}