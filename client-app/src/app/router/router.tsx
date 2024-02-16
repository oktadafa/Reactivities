import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import homePage from "../../features/home/homePage";
import HomePage from "../../features/home/homePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
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
                path: 'a',
                element: <ActivityDashboard/>
            },
            {
                path:'createActivity',
                element: <ActivityForm/>
            }
        ]
    }
]
export const router = createBrowserRouter(routes);