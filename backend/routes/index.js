import userRoutes from "./user.js";
import consultantRoutes from "./consultant.js";
import availabilityRoutes from "./availability.js";
import appointmentRoutes from "./appointment.js";

const setUpRoutes = app => {
    const all_routes = [
        { route: 'users', router: userRoutes },
        { route: 'consultant', router: consultantRoutes },
        { route: 'availabilities', router: availabilityRoutes },
        { route: 'appointment', router: appointmentRoutes },
    ];

    all_routes.forEach(routeObj => {
        app.use(`/api/${routeObj.route}`, routeObj.router);
    });
}

export default setUpRoutes;