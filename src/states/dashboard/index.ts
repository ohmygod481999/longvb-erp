import { makeVar, ReactiveVar } from "@apollo/client";
import { getFirstDayOfMonth } from "../../helpers";
import { Dashboard } from "../../models/dashboard.model";

const dashboardInitialValue = {
    startDate: getFirstDayOfMonth(),
    endDate: new Date(),
};

export const dashboardState: ReactiveVar<Dashboard> = makeVar<Dashboard>(
    dashboardInitialValue
);
