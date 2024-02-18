import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import homePage from "../../features/home/homePage";
import HomePage from "../../features/home/homePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
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
            }
        ]
    }
]
export const router = createBrowserRouter(routes);