"use client"
import React from "react";
import {
  Typography,
} from "@material-tailwind/react";
import {
  ClockIcon,
} from "@heroicons/react/24/outline";
import StatisticsCard from "@/components/admin/cards/StatisticsCard";
import statisticsCardsData from "@/data/mockStatisticsCard";
import statisticsChartsData from "@/data/mockStaticChart";
import StatisticsChart from "@/components/admin/charts/StatisticsChart";
import { TableWrapper } from "@/components/table/table";

export function DashboardPage() {
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid xl:grid-cols-1">
        <h2 className="mb-4">Latest Student</h2>
       <TableWrapper/>
      </div>
    </div>
  );
}

export default DashboardPage;
