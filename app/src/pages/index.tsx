import React from "react";
import GraphComponent from "../components/GraphComponent";
import TableComponent from "../components/TableComponent";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

const HomePage = () => {
  return (
    <div style={styles.page}>
      <HeaderComponent />
      <main style={styles.main}>
        <GraphComponent />
        <TableComponent />
      </main>
      <FooterComponent />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "0 20px",
  },
};

export default HomePage;
