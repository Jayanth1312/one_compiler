import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./bargraph.css";

const LanguageBarGraph = () => {
  const [languageData, setLanguageData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLanguageData = async () => {
      try {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = "https://onecompiler.com/api/code/languagesWithCount";

        const response = await fetch(proxyUrl + apiUrl, {
          method: "GET",
          headers: {
            Origin: window.location.origin,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const topLanguages = data
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
          .map((lang) => ({
            name: lang._id.toUpperCase(),
            count: lang.count,
          }));

        setLanguageData(topLanguages);
        setIsLoading(false);
        
      } catch (error) {
        console.error("Error fetching language data:", error);
        setError(error.message);
        setIsLoading(false);

        const mockData = [
          { name: "HTML", count: 6426427 },
          { name: "PYTHON", count: 2846030 },
          { name: "JAVA", count: 2175616 }, 
          { name: "JAVASCRIPT", count: 1878574 },
          { name: "MYSQL", count: 1775827 },
        ];
        setLanguageData(mockData);
      }
    };

    fetchLanguageData();
  }, []);

  if (isLoading) {
    return <div className="language-container">Loading language data...</div>;
  }

  return (
    <div className="language-container">
      <h2 className="language-title">Top 5 Programming Languages</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={languageData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#666" }}
            axisLine={{ stroke: "#e0e0e0" }}
          />
          <YAxis tick={{ fill: "#666" }} axisLine={{ stroke: "#e0e0e0" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
            }}
          />
          <Legend />
          <Bar
            dataKey="count"
            fill="#00a389"
            width={10}
            radius={[7, 7, 0, 0]}
            name="Number of Saves"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LanguageBarGraph;
