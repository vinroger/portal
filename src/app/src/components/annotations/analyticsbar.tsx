/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";

interface AnalyticsBarProps {
  analyticsData: { time: string; [key: string | number]: number | string }[];
  callbacks: any;
}

interface AnalyticsBarState {
  selectedDataPoint: number;
}

export default class AnalyticsBar extends Component<
  AnalyticsBarProps,
  AnalyticsBarState
> {
  constructor(props: AnalyticsBarProps) {
    super(props);
    this.state = {
      selectedDataPoint: -1,
    };
    this.handleDataPointClick = this.handleDataPointClick.bind(this);
  }

  shouldComponentUpdate(nextProps: AnalyticsBarProps): boolean {
    return this.props.analyticsData !== nextProps.analyticsData;
  }

  handleDataPointClick(index: number): void {
    this.setState({ selectedDataPoint: index });
  }

  render(): JSX.Element {
    const { analyticsData } = this.props;
    console.log(analyticsData, "analut");
    if (analyticsData.length === 0) {
      return (
        <div>
          <h2>
            Please run "Analyse" on the "Inference" section to get analytics
            data.
          </h2>
        </div>
      );
    }

    // initialize a set
    const tagSet: any = new Set();
    // iterate over the array
    analyticsData.forEach((item: {}) => {
      Object.keys(item).forEach(key => {
        if (key !== "frame" && key !== "time") {
          tagSet.add(key);
        }
      });
    });
    function getPredefinedColors() {
      return [
        "#1ABC9C",
        "#5DADE2",
        "#2980B9",
        "#A3E4D7",
        "#E8DAEF",
        "#D0ECE7",
        "#A569BD",
        "#73C6B6",
        "#76D7C4",
        "#AED6F1",
        "#3498DB",
        "#16A085",
        "#D2B4DE",
        "#A9CCE3",
        "#73C6B6",
        "#76D7C4",
        "#AED6F1",
        "#BB8FCE",
      ];
    }

    function getColorForIndex(index: number) {
      const colors = getPredefinedColors();
      return colors[index % colors.length];
    }

    return (
      <div style={{ height: "300px", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={300}
            data={analyticsData}
            margin={{
              top: 5,
              right: 40,
              left: 0,
              bottom: 50,
            }}
            onClick={e => {
              this.handleDataPointClick(Number(e.activeLabel));
            }}
          >
            <Legend />
            <CartesianGrid strokeDasharray="3 3" stroke="#62839e" />
            <XAxis dataKey="time" stroke="#62839e" />
            <YAxis stroke="#62839e" />
            <Tooltip wrapperStyle={{ color: "black" }} />

            {[...tagSet].map((key: string, index) => {
              if (key === "frame" || key === "time") {
                return null;
              }
              const color = getColorForIndex(index);
              return (
                <Area
                  key={index}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  dot={false}
                  fill={color}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
