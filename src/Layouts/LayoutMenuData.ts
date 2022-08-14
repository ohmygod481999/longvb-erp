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
    const [isRestaurant, setIsRestaurant] = useState(false);
    // Restaurant
    const [isStore, setIsStore] = useState(false);
    
    const [isFood, setIsFood] = useState (false)
    const [isFoodCategory,setIsFoodCategory] = useState(false)
    
    const [isTable, setIsTable] = useState(false);

    const [iscurrentState, setIscurrentState] = useState<CurrentState>(
        CurrentState.Dashboard
    );

    function updateIconSidebar(e: any) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            if (ul) {
                const iconItems = ul.querySelectorAll(".nav-icon.active");
                // @ts-ignore
                let activeIconItems = [...iconItems];
                activeIconItems.forEach((item) => {
                    item.classList.remove("active");
                    var id = item.getAttribute("subitems");
                    if (document.getElementById(id))
                        // @ts-ignore
                        document.getElementById(id).classList.remove("show");
                });
            }
        }
    }

    useEffect(() => {
        document.body.classList.remove("twocolumn-panel");
        if (iscurrentState !== CurrentState.Dashboard) {
            setIsDashboard(false);
        }
        if (iscurrentState !== CurrentState.Restaurant) {
            setIsRestaurant(false);
        }
    }, [history, iscurrentState, isDashboard, isRestaurant]);

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
            click: function (e: any) {
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
            click: function (e: any) {
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
                    link: "/restaurant/branch",
                    isChildItem: false,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsStore(!isStore);
                    },
                    parentId: "restaurant",
                    stateVariables: isStore,
                },
                {
                    id: "food",
                    label: "Quản trị món ăn",
                    link: "/#",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsFood(!isFood);
                    },
                    parentId: "restaurant",
                    stateVariables: isFood,
                    childItems:[
                        {
                            id: "foodCategori",
                            label: "Phân loại món ăn",
                            link: "/restaurant/food/category",
                            isChildItem: false,
                             click: function (e: any) {
                                e.preventDefault();
                                 setIsFoodCategory(!isFoodCategory);
                            },
                             parentId: "food",
                             stateVariables: isFoodCategory,
                        }
                    ]
                },
                {
                
                    id: "store",
                    label: "Bàn ăn",
                    link: "/restaurant/table",
                    isChildItem: false,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsTable(!isTable);
                    },
                    parentId: "restaurant",
                    stateVariables: isTable,
                },
            ],
        },
    ];
    return menuItems;
};
