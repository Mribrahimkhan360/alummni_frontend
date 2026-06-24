import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import SectionCard from "./SectionCard";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const engagementLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const engagementData = [5200, 5600, 6100, 6700, 7400, 8320];

const eventLabels = ["Reunions", "Career Fairs", "Webinars", "Mixers", "Galas"];
const eventData = [420, 680, 310, 540, 260];

const navy = "#0E2A47";
const gold = "#C99A3D";
const textLight = "#8C97A8";
const border = "#E4E8EE";
const gridStroke = "#EEF1F5";

const tooltipBg = "#fff";

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: tooltipBg,
      borderColor: border,
      borderWidth: 1,
      borderRadius: 12,
      padding: 10,
      titleFont: { size: 12, weight: "600", family: "Inter, sans-serif" },
      bodyFont: { size: 12, weight: "600", family: "Inter, sans-serif" },
      titleColor: "#16213A",
      bodyColor: navy,
      displayColors: false,
      callbacks: {
        title: (items) => items[0].label,
        label: (ctx) => `Active: ${ctx.parsed.y.toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: textLight, font: { size: 12 } },
      border: { display: false },
    },
    y: {
      grid: { color: gridStroke, drawBorder: false },
      ticks: {
        color: textLight,
        font: { size: 12 },
        callback: (v) => `${(v / 1000).toFixed(0)}k`,
      },
      border: { display: false },
    },
  },
};

const engagementChartData = {
  labels: engagementLabels,
  datasets: [
    {
      label: "Active Alumni",
      data: engagementData,
      borderColor: navy,
      backgroundColor: (ctx) => {
        if (!ctx.chart.chartArea) return "rgba(14,42,71,0.08)";
        const { ctx: c, chartArea: { top, bottom } } = ctx.chart;
        const gradient = c.createLinearGradient(0, top, 0, bottom);
        gradient.addColorStop(0, "rgba(14,42,71,0.15)");
        gradient.addColorStop(1, "rgba(14,42,71,0)");
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointBackgroundColor: gold,
      pointBorderColor: "#fff",
      pointBorderWidth: 1.5,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: gold,
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 2,
      borderWidth: 2.5,
    },
  ],
};

const eventLineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: tooltipBg,
      borderColor: border,
      borderWidth: 1,
      borderRadius: 12,
      padding: 10,
      titleFont: { size: 12, weight: "600", family: "Inter, sans-serif" },
      bodyFont: { size: 12, weight: "600", family: "Inter, sans-serif" },
      titleColor: "#16213A",
      bodyColor: gold,
      displayColors: false,
      callbacks: {
        title: (items) => items[0].label,
        label: (ctx) => `Attendance: ${ctx.parsed.y}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: textLight, font: { size: 11 } },
      border: { display: false },
    },
    y: {
      grid: { color: gridStroke, drawBorder: false },
      ticks: { color: textLight, font: { size: 12 } },
      border: { display: false },
      beginAtZero: true,
    },
  },
};

const eventLineChartData = {
  labels: eventLabels,
  datasets: [
    {
      label: "Attendance",
      data: eventData,
      borderColor: gold,
      fill: false,
      tension: 0.4,
      pointBackgroundColor: gold,
      pointBorderColor: "#fff",
      pointBorderWidth: 1.5,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: gold,
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 2,
      borderWidth: 2.5,
    },
  ],
};

export default function AnalyticsSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 animate-fade-in">
      <SectionCard title="Alumni Engagement Trend">
        <div className="h-[220px]">
          <Line options={lineOptions} data={engagementChartData} />
        </div>
      </SectionCard>

      <SectionCard title="Event Attendance by Category">
        <div className="h-[220px]">
          <Line options={eventLineOptions} data={eventLineChartData} />
        </div>
      </SectionCard>
    </div>
  );
}
