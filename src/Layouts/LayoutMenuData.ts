import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

enum CurrentState {
    Dashboard,
    Restaurant
}

export const useNavdata = () => {
    const history = useHistory();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isRestaurant, setIsRestaurant] = useState(false)


    // Restaurant
    const [isStore, setIsStore] = useState(false);

    const [iscurrentState, setIscurrentState] = useState<CurrentState>(CurrentState.Dashboard);

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== CurrentState.Dashboard) {
            setIsDashboard(false);
        }
        if (iscurrentState !== CurrentState.Restaurant) {
            setIsRestaurant(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isRestaurant
    ]);

    const menuItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboards",
            icon: "ri-dashboard-2-line",
            link: "/#",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState(CurrentState.Dashboard);
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "Dashboard",
                    label: "Dashboard",
                    link: "/dashboard",
                    parentId: "dashboard",
                },
            ],
        },
        {
            label: "Quản trị nhà hàng",
            isHeader: true,
        },
        {
            id: "restaurant",
            label: "Quản trị nhà hàng",
            icon: "ri-account-circle-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsRestaurant(!isRestaurant);
                setIscurrentState(CurrentState.Restaurant);
                updateIconSidebar(e);
            },
            stateVariables: isRestaurant,
            subItems: [
                {
                    id: "store",
                    label: "Chi nhánh",
                    link: "/profile",
                    isChildItem: false,
                    click: function (e) {
                        e.preventDefault();
                        setIsStore(!isStore);
                    },
                    parentId: "restaurant",
                    stateVariables: isStore,
                },
            ],
        },
    ];
    return menuItems;
};