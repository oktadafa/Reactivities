import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import homePage from "../../features/home/homePage";
import HomePage from "../../features/home/homePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
export const routes : RouteObject[] = [
    {
        path: "/",
        element:<App/>,
        children: [
            {
                path:'',
                element: <HomePage/>
            },
            {
                path: 'activities',
                element: <ActivityDashboard/>
            },
            {
                path:'createActivity',
                element: <ActivityForm key={"create"}/>
            },
            {
                path: 'activities/:id',
                element: <ActivityDetails/>
            },
            {
                path: 'manage/:id',
                element:<ActivityForm key={"manage"}/>
            },
            {
                path: 'errors',
                element: <TestErrors/>
            },
            {
                path:'not-found',
                element: <NotFound/>
            },
            {
                path:'server-error',
                element: <ServerError/>
            },
            {
                path:'*',
                element: <Navigate replace to='/not-found'/>
            }
        ]
    }
]
export const router = createBrowserRouter(routes);