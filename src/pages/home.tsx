import DatePicker from "components/date-picker/DatePicker";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <div className="header">Home Page</div>
      <div className="content">
        <DatePicker></DatePicker>
      </div>
    </div>
  );
};

export default Home;
