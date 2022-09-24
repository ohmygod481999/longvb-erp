import { useQuery } from "@apollo/client";
import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";
import { useQueryRevenueBranch } from "../../Components/Hooks/useQueryRevenueBranch";
import { formatMoney } from "../../helpers";
import { GET_DASHBOARD } from "../../states/dashboard/dashboard.queries";

const RevenueCharts = ({ dataColors, series }) => {
    var linechartcustomerColors = getChartColorsArray(dataColors);

    var options = {
        chart: {
            height: 370,
            type: "line",
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: "straight",
            dashArray: [0, 0, 8],
            width: [2, 0, 2.2],
        },
        fill: {
            opacity: [0.1, 0.9, 1],
        },
        markers: {
            size: [0, 0, 0],
            strokeWidth: 2,
            hover: {
                size: 4,
            },
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return formatMoney(value);
                },
            },
        },
        xaxis: {
            categories: [
                "Th 1",
                "Th 2",
                "Th 3",
                "Th 4",
                "Th 5",
                "Th 6",
                "Th 7",
                "Th 8",
                "Th 9",
                "Th 10",
                "Th 11",
                "Th 12",
            ],
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
        grid: {
            show: true,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 0,
                right: -2,
                bottom: 15,
                left: 10,
            },
        },
        legend: {
            show: true,
            horizontalAlign: "center",
            offsetX: 0,
            offsetY: -5,
            markers: {
                width: 9,
                height: 9,
                radius: 6,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 0,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: "30%",
                barHeight: "70%",
            },
        },
        colors: linechartcustomerColors,
        tooltip: {
            shared: true,
            y: [
                {
                    formatter: function (y) {
                        if (typeof y !== "undefined") {
                            // return y.toFixed(0);
                            return formatMoney(y);
                        }
                        return y;
                    },
                },
                {
                    formatter: function (y) {
                        if (typeof y !== "undefined") {
                            return y + " đơn";
                        }
                        return y;
                    },
                },
                {
                    formatter: function (y) {
                        if (typeof y !== "undefined") {
                            return y.toFixed(0) + " Sales";
                        }
                        return y;
                    },
                },
            ],
        },
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height="370"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const StoreVisitsCharts = ({ dataColors }) => {
    var chartDonutBasicColors = getChartColorsArray(dataColors);
    const { data } = useQuery(GET_DASHBOARD);
    const branchRevenue = useQueryRevenueBranch(
        data?.dashboard.startDate,
        data?.dashboard.endDate
    );

    const series = [44, 55, 41, 17, 15];
    var options = {
        labels: branchRevenue.map((store) => store.name),
        chart: {
            height: 333,
            type: "donut",
        },
        legend: {
            position: "bottom",
        },
        stroke: {
            show: false,
        },
        dataLabels: {
            dropShadow: {
                enabled: false,
            },
        },
        colors: chartDonutBasicColors,
        tooltip: {
            shared: true,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        // return y.toFixed(0);
                        return formatMoney(y);
                    }
                    return y;
                },
            },
        },
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={branchRevenue.map((store) => store.revenue)}
                type="donut"
                height="333"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

export { RevenueCharts, StoreVisitsCharts };
