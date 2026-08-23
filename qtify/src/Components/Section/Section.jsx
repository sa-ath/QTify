import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import styles from "./Section.module.css";

const API_BASE_URL = "https://qtify-backend.labs.crio.do/albums";

function Section({
  title = "Top Albums",
  endpoint = "top",
  initiallyExpanded = false,
}) {
  const [albums, setAlbums] = useState([]);
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const renderCard = (album) => (
    <Card
      image={album.image}
      follows={album.follows}
      title={album.title}
    />
  );

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`${API_BASE_URL}/${endpoint}`)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.section} aria-labelledby={`${endpoint}-albums-title`}>
      <div className={styles.header}>
        <h2 id={`${endpoint}-albums-title`}>{title}</h2>
        <button
          className={styles.collapseButton}
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Collapse" : "Show All"}
        </button>
      </div>

      {isExpanded ? (
        <div className={styles.grid}>
          {isLoading && <p className={styles.message}>Loading albums...</p>}
          {!isLoading && error && <p className={styles.message}>{error}</p>}
          {!isLoading && !error && albums.map((album) => (
            <React.Fragment key={album.id}>{renderCard(album)}</React.Fragment>
          ))}
        </div>
      ) : (
        <>
          {isLoading && <p className={styles.message}>Loading albums...</p>}
          {!isLoading && error && <p className={styles.message}>{error}</p>}
          {!isLoading && !error && (
            <Carousel
              items={albums}
              renderItem={renderCard}
              getItemKey={(album) => album.id}
              navigationId={endpoint}
            />
          )}
        </>
      )}
    </section>
  );
}

export default Section;
