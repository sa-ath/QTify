import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

const TOP_ALBUMS_URL = "https://qtify-backend.labs.crio.do/albums/top";

function Section({ title = "Top Albums" }) {
  const [albums, setAlbums] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    axios
      .get(TOP_ALBUMS_URL)
      .then(({ data }) => {
        if (isMounted) {
          setAlbums(Array.isArray(data) ? data : data.albums || []);
          setError("");
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load albums right now.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="top-albums-title">
      <div className={styles.header}>
        <h2 id="top-albums-title">{title}</h2>
        <button
          className={styles.collapseButton}
          type="button"
          onClick={() => setIsCollapsed((collapsed) => !collapsed)}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? "Show All" : "Collapse"}
        </button>
      </div>

      {!isCollapsed && (
        <div className={styles.grid}>
          {isLoading && <p className={styles.message}>Loading albums...</p>}
          {!isLoading && error && <p className={styles.message}>{error}</p>}
          {!isLoading && !error && albums.map((album) => (
            <Card
              key={album.id}
              image={album.image}
              follows={album.follows}
              title={album.title}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Section;
