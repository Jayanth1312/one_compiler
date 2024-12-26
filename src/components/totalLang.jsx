import React, { useState, useEffect } from "react";
import "./totallang.css";

function TotalLang() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
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
        const totalSaves = data.reduce((sum, lang) => sum + lang.count, 0);

        setTotal(totalSaves);
      } catch (error) {
        console.error("Error fetching total data:", error);
        setTotal(8000);
      }
    };

    fetchTotal();
  }, []);

  return (
    <div className="total-container">
      <h2>Total no of saves</h2>
      <div className="total-value">
        <h3>{total.toLocaleString()}</h3>
      </div>
    </div>
  );
}

export default TotalLang;
