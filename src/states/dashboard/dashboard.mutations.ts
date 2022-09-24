import { ReactiveVar } from "@apollo/client";
import { dashboardState } from ".";
import { Dashboard } from "../../models/dashboard.model";

function createUpdateDashboard(dashboardState: ReactiveVar<Dashboard>) {
    return (startDate: Date, endDate: Date) => {
        const dashboard = dashboardState();
        dashboardState({
            startDate,
            endDate,
        });
    };
}

export const dashboardMutations = {
    updateDashboard: createUpdateDashboard(dashboardState),
};
