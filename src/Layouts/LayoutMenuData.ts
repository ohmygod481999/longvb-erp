import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

enum CurrentState {
    Dashboard,
    Restaurant,
}

export const useNavdata = () => {
    const history = useHistory();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isWellCome, setIsWellCome] = useState(false);
    
    const [isRestaurant, setIsRestaurant] = useState(false);
    // Restaurant
    const [isPos, setIsPos] = useState(false)
    const [isStore, setIsStore] = useState(false);
    const [isOrder, setIsOrder] = useState(false);

    const [isFood, setIsFood] = useState(false);
    const [isFoodCategory, setIsFoodCategory] = useState(false);
    const [isFoods, setIsFoods] = useState(false);

    const [isTable, setIsTable] = useState(false);

    const [isGallery, setIsGallery] = useState(false);

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
                    id: "welcome",
                    label: "Trang ch???",
                    link: "/welcome",
                    parentId: "dashboard",
                },
                {
                    id: "Dashboard",
                    label: "Dashboard",
                    link: "/dashboard",
                    parentId: "dashboard",
                },
            ],
        },
        {
            label: "Qu???n tr??? nh?? h??ng",
            isHeader: true,
        },
        {
            id: "restaurant",
            label: "Qu???n tr??? nh?? h??ng",
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
                    id: "pos",
                    label: "B??n h??ng",
                    link: "/restaurant/pos",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsPos(!isPos);
                    },
                    parentId: "restaurant",
                    stateVariables: isPos,
                    childItems: [
                        { id: 1, label: "Danh s??ch b??n", link: "/restaurant/pos" },
                    ]
                },
                {
                    id: "store",
                    label: "Chi nh??nh",
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
                    id: "zone",
                    label: "Khu v???c",
                    link: "/restaurant/zone",
                    isChildItem: false,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsStore(!isStore);
                    },
                    parentId: "restaurant",
                    stateVariables: isStore,
                },
                {
                    id: "store",
                    label: "B??n ??n",
                    link: "/restaurant/table",
                    isChildItem: false,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsTable(!isTable);
                    },
                    parentId: "restaurant",
                    stateVariables: isTable,
                },
                {
                    id: "food",
                    label: "Qu???n tr??? m??n ??n",
                    link: "/#",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsFood(!isFood);
                    },
                    parentId: "restaurant",
                    stateVariables: isFood,
                    childItems: [
                        {
                            id: "foodCategori",
                            label: "Ph??n lo???i m??n ??n",
                            link: "/restaurant/food/category",
                            isChildItem: false,
                            click: function (e: any) {
                                e.preventDefault();
                                setIsFoodCategory(!isFoodCategory);
                            },
                            parentId: "food",
                            stateVariables: isFoodCategory,
                        },
                        {
                            id: "foods",
                            label: "M??n ??n",
                            link: "/restaurant/food",
                            isChildItem: false,
                            click: function (e: any) {
                                e.preventDefault();
                                setIsFoodCategory(!isFoods);
                            },
                            parentId: "food",
                            stateVariables: isFoods,
                        },
                    ],
                },
                {
                    id: "order",
                    label: "????n h??ng",
                    link: "/restaurant/order",
                    isChildItem: false,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsOrder(!isOrder);
                    },
                    parentId: "restaurant",
                    stateVariables: isOrder,
                },
                {
                    id: "gallery",
                    label: "Gallery",
                    link: "/restaurant/gallery",
                    isChildItem: false,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsGallery(!isGallery);
                    },
                    parentId: "restaurant",
                    stateVariables: isGallery,
                },
            ],
        },
    ];
    return menuItems;
};
