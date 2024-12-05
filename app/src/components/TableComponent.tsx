import { fetchDataFromRepository } from "@/graphdb/repositorie";
import React, { useEffect, useState } from "react";

const TableComponent = () => {
  const [data, setData] = useState<RepositorieData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchDataFromRepository(); // Appel de la fonction
      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tableau des sites UNESCO</h2>
      {loading ? (
        <p style={styles.loading}>Chargement des données...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.header}>Nom du Pays</th>
              <th style={styles.header}>Nom du Site</th>
              <th style={styles.header}>État du Site</th>
              <th style={styles.header}>IDH</th>
              <th style={styles.header}>Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.cell}>{row.pays}</td>
                <td style={styles.cell}>{row.site}</td>
                <td style={styles.cell}>{row.etat}</td>
                <td style={styles.cell}>{row.idh.toFixed(3)}</td>
                <td style={styles.cell}>{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    padding: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    marginTop: "30px",
    overflow: "hidden",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#777",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  header: {
    backgroundColor: "#0c3b2e",
    color: "#fff",
    padding: "12px 15px",
    fontSize: "1rem",
    textAlign: "left",
    fontWeight: "bold",
  },
  row: {
    transition: "background-color 0.3s",
  },
  cell: {
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
};

export default TableComponent;
