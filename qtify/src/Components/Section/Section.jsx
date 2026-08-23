import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styles from "./Section.module.css";

const API_BASE_URL = "https://qtify-backend.labs.crio.do";

function Section({
  title = "Top Albums",
  endpoint = "albums/top",
  initiallyExpanded = false,
  type = "albums",
  showToggle = true,
}) {
  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const renderCard = (item) => (
    <Card
      image={item.image}
      follows={type === "songs" ? item.likes : item.follows}
      title={item.title}
      metricLabel={type === "songs" ? "Likes" : "Follows"}
    />
  );

  useEffect(() => {
    let isMounted = true;

    Promise.allSettled([
        axios.get(`${API_BASE_URL}/${endpoint}`),
        ...(type === "songs" ? [axios.get(`${API_BASE_URL}/genres`)] : []),
      ])
      .then(([itemsResult, genresResult]) => {
        if (!isMounted) {
          return;
        }

        if (itemsResult.status === "rejected") {
          setError("Unable to load albums right now.");
          setIsLoading(false);
          return;
        }

        const data = itemsResult.value.data;
        const dataObject = data && typeof data === "object" ? data : {};
        const responseItems = Array.isArray(data)
          ? data
          : dataObject.albums || dataObject.songs || [];
        const loadedItems = Array.isArray(responseItems) ? responseItems : [];
        setItems(loadedItems);

        if (type === "songs" && genresResult?.status === "fulfilled") {
          const genreData = genresResult.value.data;
          const responseGenres = Array.isArray(genreData)
            ? genreData
            : genreData?.data || genreData?.genres || [];
          setGenres(Array.isArray(responseGenres) ? responseGenres : []);
        } else if (type === "songs") {
          const fallbackGenres = loadedItems.reduce((genreList, song) => {
            if (song.genre && !genreList.some((genre) => genre.key === song.genre.key)) {
              genreList.push(song.genre);
            }
            return genreList;
          }, []);
          setGenres(fallbackGenres);
        }
        setError("");
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
  }, [endpoint, type]);

  const filteredItems = type === "songs" && selectedGenre !== "all"
    ? items.filter((song) => song.genre?.key === selectedGenre)
    : items;
  const sectionId = endpoint.replace("/", "-");

  return (
    <section className={styles.section} aria-labelledby={`${sectionId}-title`}>
      <div className={styles.header}>
        <h2 id={`${sectionId}-title`}>{title}</h2>
        {showToggle && <button
          className={styles.collapseButton}
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Collapse" : "Show All"}
        </button>}
      </div>

      {type === "songs" && !isLoading && !error && (
        <Tabs
          className={styles.tabs}
          value={selectedGenre}
          onChange={(_, value) => setSelectedGenre(value)}
          variant="scrollable"
          scrollButtons={false}
          aria-label="Filter songs by genre"
        >
          <Tab value="all" label="All" />
          {genres.map((genre) => <Tab key={genre.key} value={genre.key} label={genre.label} />)}
        </Tabs>
      )}

      {type === "songs" ? (
        <>
          {isLoading && <p className={styles.message}>Loading songs...</p>}
          {!isLoading && error && <p className={styles.message}>{error}</p>}
          {!isLoading && !error && <Carousel items={filteredItems} renderItem={renderCard} getItemKey={(item) => item.id} navigationId="songs" />}
        </>
      ) : isExpanded ? (
        <div className={styles.grid}>
          {isLoading && <p className={styles.message}>Loading albums...</p>}
          {!isLoading && error && <p className={styles.message}>{error}</p>}
          {!isLoading && !error && items.map((item) => (
            <React.Fragment key={item.id}>{renderCard(item)}</React.Fragment>
          ))}
        </div>
      ) : (
        <>
          {isLoading && <p className={styles.message}>Loading albums...</p>}
          {!isLoading && error && <p className={styles.message}>{error}</p>}
          {!isLoading && !error && (
            <Carousel
              items={items}
              renderItem={renderCard}
              getItemKey={(item) => item.id}
              navigationId={endpoint}
            />
          )}
        </>
      )}
    </section>
  );
}

export default Section;
