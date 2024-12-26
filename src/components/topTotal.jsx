import React, { useState, useEffect } from "react";
import "./topTotal.css";

const TopTotal = () => {
  const [totalData, setTotalData] = useState({
    topFiveTotal: 0,
    remainingTotal: 0,
  });

  useEffect(() => {
    const fetchTotalData = async () => {
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
        const sortedData = [...data].sort((a, b) => b.count - a.count);
        const topFive = sortedData.slice(0, 5);
        const remaining = sortedData.slice(5);

        const topFiveTotal = topFive.reduce((sum, lang) => sum + lang.count, 0);
        const remainingTotal = remaining.reduce((sum, lang) => sum + lang.count, 0);

        setTotalData({
          topFiveTotal,
          remainingTotal,
        });
      } catch (error) {
        console.error("Error fetching total data:", error);
        setTotalData({
          topFiveTotal: 15102474,
          remainingTotal: 3016103,
        });
      }
    };

    fetchTotalData();
  }, []);

  return (
    <div className="total-cards-container">
      <div className="total-card">
        <h3>Top 5 Languages</h3>
        <div className="total-value">
          <span className="number">{totalData.topFiveTotal}</span>
          <span className="label">Total Saves</span>
        </div>
        <div className="percentage">
          {((totalData.topFiveTotal / (totalData.topFiveTotal + totalData.remainingTotal)) * 100).toFixed(1)}% of total
        </div>
      </div>

      <div className="total-card">
        <h3>Other Languages</h3>
        <div className="total-value">
          <span className="number">{totalData.remainingTotal}</span>
          <span className="label">Total Saves</span>
        </div>
        <div className="percentage">
          {((totalData.remainingTotal / (totalData.topFiveTotal + totalData.remainingTotal)) * 100).toFixed(1)}% of total
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
