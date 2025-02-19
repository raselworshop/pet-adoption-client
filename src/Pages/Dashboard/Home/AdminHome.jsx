import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { CatIcon, DogIcon, DollarSignIcon, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import BarChartComponent from "./adminCharts/interactivity";
import Barchart from "./adminCharts/Barchart";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const { data: stats = {}, isLoading: isStatsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/admin-analytics");
      // console.log(res.data || [])
      return res.data;
    },
  });
  const { data: donationsByCategory = [] } = useQuery({
    queryKey: ["overview-donation"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/donations-by-category");
      // console.log(res.data)
      return res.data;
    },
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
        Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = donationsByCategory.map((data) => {
    return {
      name: data.category,
      value: data.donatedAmount,
    };
  });
  const pieChartStatsData = Object.entries(stats).map(([key, value]) => ({
    name: key,
    value: Number(value) || 0,
  }));
  const scaledPieChartStatsData = pieChartStatsData.map((item) => ({
    name: item.name,
    value: Math.log(item.value + 1), 
  }));
  console.log("Pie Chart Data:", scaledPieChartStatsData);

  return (
    <div className="-inset-0">
      <Helmet>
        <title>PA || DASHBOARD</title>
      </Helmet>
      <h2 className="text-3xl font-semibold mb-3">
        <span>Hi, Welcome</span>
        <span>{user ? user.displayName : "Back"} Back</span>
      </h2>
      <div className="w-full flex items-center justify-evenly gap-3 shadow p-3">
        <div className="bg-gray-200 dark:bg-gray-900 flex items-center gap-5 p-5">
          <div className="stat-figure text-secondary">
            <Users className="dark:text-white bg-black" size={40}></Users>
          </div>
          <div className="border-l-2 pl-2">
            <div className="text-xl">Users</div>
            {isStatsLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="stat-value">{stats.users || 0}K</div>
            )}
            <div className="stat-desc">Jan - Feb</div>
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-gray-900 flex items-center gap-5 p-5">
          <div className="stat-figure text-secondary">
            <DollarSignIcon
              className="dark:text-white bg-black"
              size={40}
            ></DollarSignIcon>
          </div>
          <div className="border-l-2 pl-2">
            <div className="text-xl">Donations</div>
            <div className="stat-value">{stats.donations}</div>
            <div className="stat-desc">Jan - Feb</div>
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-gray-900 flex items-center gap-5 p-5">
          <div className="stat-figure text-secondary">
            <CatIcon className="dark:text-white bg-black" size={40}></CatIcon>
          </div>
          <div className="border-l-2 pl-2">
            <div className="text-xl">Pets Collectoins</div>
            <div className="stat-value">{stats.pets}K</div>
            <div className="stat-desc">Jan - Feb</div>
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-gray-900 flex items-center gap-5 p-5">
          <div className="stat-figure text-secondary">
            <DogIcon className="dark:text-white bg-black" size={40}></DogIcon>
          </div>
          <div className="border-l-2 pl-2">
            <div className="text-xl">Adopts</div>
            <div className="stat-value">{stats.adopts}K</div>
            <div className="stat-desc">Jan - Feb</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center mb-5">
        <div>
          <BarChart
            width={500}
            height={300}
            data={donationsByCategory}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="donatedAmount"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {donationsByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="min-h-[400px] w-full">
          {scaledPieChartStatsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={scaledPieChartStatsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomizedLabel}
                >
                  {scaledPieChartStatsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend/>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>Loading Chart...</p>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <BarChartComponent />
        <Barchart />
      </div>
    </div>
  );
};

export default AdminHome;
