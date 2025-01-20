import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Helper } from '../../Tools/Helper';
import { api_Routes } from '../../api_Route';
import '../../MetricsChart.css';

const MetricsChart = () => {
  const [charts, setCharts] = useState({
    dailyActiveUsers: {
      data: [],
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    },
    weeklyActiveUsers: {
      data: [],
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    },
    dailyPageViews: {
      data: [],
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    },
    weeklyPageViews: {
      data: [],
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    },
  });

  const fetchData = async (url, startDate, endDate) => {
    // console.log(`Fetching data from ${url} with startDate=${startDate} and endDate=${endDate}`);
    try {
      const response = await Helper.Get({
        url: `${url}?startDate=${startDate}&endDate=${endDate}`,
        hasToken: true,
      });
      // console.log('Response:', response);
      return response.response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return [];
    }
  };

  const updateChartData = async (chartKey, url, startDate, endDate) => {
    const data = await fetchData(url, startDate, endDate);
    setCharts((prev) => ({
      ...prev,
      [chartKey]: { ...prev[chartKey], data },
    }));
  };

  const handleDateChange = (chartKey, e) => {
    const { name, value } = e.target;
    // console.log(`Date changed for ${chartKey}: ${name}=${value}`);
    setCharts((prev) => ({
      ...prev,
      [chartKey]: { ...prev[chartKey], [name]: value },
    }));
    updateChartData(
      chartKey,
      api_Routes.metrics[chartKey],
      name === 'startDate' ? value : charts[chartKey].startDate,
      name === 'endDate' ? value : charts[chartKey].endDate
    );
  };

  useEffect(() => {
    // console.log('Fetching metrics...');
    Object.keys(charts).forEach((chartKey) => {
      updateChartData(
        chartKey,
        api_Routes.metrics[chartKey],
        charts[chartKey].startDate,
        charts[chartKey].endDate
      );
    });
  }, []);

  const ChartComponent = ({ title, data, xAxisKey, yAxisKey, strokeColor, chartKey }) => (
    <div className="chart-card">
      <h2>{title}</h2>
      <div className="date-picker">
        <label>
          <span>Start Date</span>
          <input
            type="date"
            name="startDate"
            value={charts[chartKey].startDate}
            onChange={(e) => handleDateChange(chartKey, e)}
            onClick={(e) => e.target.showPicker()} // Open the date picker on click
          />
        </label>
        <label>
          <span>End Date</span>
          <input
            type="date"
            name="endDate"
            value={charts[chartKey].endDate}
            onChange={(e) => handleDateChange(chartKey, e)}
            onClick={(e) => e.target.showPicker()} // Open the date picker on click
          />
        </label>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={yAxisKey} stroke={strokeColor} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="metrics-container">
    <div className="chart-card" data-chart-key="dailyActiveUsers">
      <h2>Daily Active Users</h2>
      <div className="date-picker">
        <label>
          <span>Start Date</span>
          <input
            type="date"
            name="startDate"
            value={charts.dailyActiveUsers.startDate}
            onChange={(e) => handleDateChange('dailyActiveUsers', e)}
            onClick={(e) => e.target.showPicker()}
          />
        </label>
        <label>
          <span>End Date</span>
          <input
            type="date"
            name="endDate"
            value={charts.dailyActiveUsers.endDate}
            onChange={(e) => handleDateChange('dailyActiveUsers', e)}
            onClick={(e) => e.target.showPicker()}
          />
        </label>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={charts.dailyActiveUsers.data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  
    <div className="chart-card" data-chart-key="weeklyActiveUsers">
      <h2>Weekly Active Users</h2>
      <div className="date-picker">
        <label>
          <span>Start Date</span>
          <input
            type="date"
            name="startDate"
            value={charts.weeklyActiveUsers.startDate}
            onChange={(e) => handleDateChange('weeklyActiveUsers', e)}
            onClick={(e) => e.target.showPicker()}
          />
        </label>
        <label>
          <span>End Date</span>
          <input
            type="date"
            name="endDate"
            value={charts.weeklyActiveUsers.endDate}
            onChange={(e) => handleDateChange('weeklyActiveUsers', e)}
            onClick={(e) => e.target.showPicker()}
          />
        </label>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={charts.weeklyActiveUsers.data}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  
    <div className="chart-card" data-chart-key="dailyPageViews">
      <h2>Daily Page Views</h2>
      <div className="date-picker">
        <label>
          <span>Start Date</span>
          <input
            type="date"
            name="startDate"
            value={charts.dailyPageViews.startDate}
            onChange={(e) => handleDateChange('dailyPageViews', e)}
            onClick={(e) => e.target.showPicker()}
          />
        </label>
        <label>
          <span>End Date</span>
          <input
            type="date"
            name="endDate"
            value={charts.dailyPageViews.endDate}
            onChange={(e) => handleDateChange('dailyPageViews', e)}
            onClick={(e) => e.target.showPicker()}
          />
        </label>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={charts.dailyPageViews.data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pageViews" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  
    <div className="chart-card" data-chart-key="weeklyPageViews">
      <h2>Weekly Page Views</h2>
      <div className="date-picker">
        <label>
          <span>Start Date</span>
          <input
            type="date"
            name="startDate"
            value={charts.weeklyPageViews.startDate}
            onChange={(e) => handleDateChange('weeklyPageViews', e)}
            onClick={(e) => e.target.showPicker()}
          />
        </label>
        <label>
          <span>End Date</span>
          <input
            type="date"
            name="endDate"
            value={charts.weeklyPageViews.endDate}
            onChange={(e) => handleDateChange('weeklyPageViews', e)}
            onClick={(e) => e.target.showPicker()}
          />
        </label>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={charts.weeklyPageViews.data}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pageViews" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
  );
};

export default MetricsChart;