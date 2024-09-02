import userRoutes from "./userRoutes.js";
import consultantRoutes from "./consultantRoutes.js";
import availabilityRoutes from "./availabilityRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";

const setUpRoutes = app => {
    const all_routes = [
        { route: 'users', router: userRoutes },
        { route: 'consultant', router: consultantRoutes },
        { route: 'availabilities', router: availabilityRoutes },
        { route: 'appointment', router: appointmentRoutes },
    ]

    all_routes.forEach(routeObj => {
        app.use(`/api/${routeObj.route}`, routeObj.router);
    })
}

export default setUpRoutes;