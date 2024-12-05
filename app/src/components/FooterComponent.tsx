import React from "react";

const FooterComponent = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© 2024 Analyse des Sites UNESCO</p>
        <p style={styles.text}>
          Ce projet a été développé dans le cadre d'une analyse de données
          UNESCO. Tous les droits sont réservés.
        </p>
      </div>
    </footer>
  );
};

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  footer: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  text: {
    fontSize: "0.9rem",
    margin: "5px 0",
  },
};

export default FooterComponent;
