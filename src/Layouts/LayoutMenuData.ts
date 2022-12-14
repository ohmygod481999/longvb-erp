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
                    label: "Trang chủ",
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
                    id: "pos",
                    label: "Bán hàng",
                    link: "/restaurant/pos",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsPos(!isPos);
                    },
                    parentId: "restaurant",
                    stateVariables: isPos,
                    childItems: [
                        { id: 1, label: "Danh sách bàn", link: "/restaurant/pos" },
                    ]
                },
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
                    id: "zone",
                    label: "Khu vực",
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
                    childItems: [
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
                        },
                        {
                            id: "foods",
                            label: "Món ăn",
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
                    label: "Đơn hàng",
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
