import React from "react";

const HeaderComponent = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>Analyse des Sites UNESCO</h1>
        <p style={styles.description}>
          Explorez la relation entre l'IDH des pays et l'état de leurs sites
          UNESCO. Découvrez si les sites situés dans des pays à faible revenu
          sont plus exposés aux menaces de conservation.
        </p>
      </div>
    </header>
  );
};

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  header: {
    backgroundColor: "#0c3b2e",
    color: "#fff",
    padding: "40px 0",
    textAlign: "center",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#ccc",
    maxWidth: "800px",
    margin: "0 auto",
  },
};

export default HeaderComponent;
