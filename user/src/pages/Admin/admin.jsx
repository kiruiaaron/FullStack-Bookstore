import React from "react";
import HomeSection from "./HomeSection";
import TopBar from "./TopBar";

const Admin = () => {
  return (
    <div style={styles.container}>
      <TopBar />
      <div style={styles.mainContent}>
        <HomeSection />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  mainContent: {
    display: "flex",
    flex: 1,
  },
};

export default Admin;
