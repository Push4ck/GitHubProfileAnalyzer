import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface CommitRecord {
  date: string;
  commits: number;
}
interface CommitsChartProps {
  data: CommitRecord[];
}

export const CommitsChart: React.FC<CommitsChartProps> = ({ data }) => {
  return (
    <div>
      <h2>Weekly Commits</h2>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="commits" fill="#8884d8" />
      </BarChart>
    </div>
  );
};
