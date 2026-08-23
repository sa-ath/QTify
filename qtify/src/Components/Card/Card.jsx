import React from "react";
import Chip from "@mui/material/Chip";
import albumImage from "../../assets/vibrating-headphone.png";
import styles from "./Card.module.css";

function Card({
  image = albumImage,
  follows = 120,
  title = "Daily Mix",
  metricLabel = "Follows",
}) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt={`${title} album cover`} />
        <Chip className={styles.chip} label={`${follows} ${metricLabel}`} size="small" />
      </div>
      <div className={styles.details}>
        <h2>{title}</h2>
      </div>
    </article>
  );
}

export default Card;