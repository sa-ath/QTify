import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import LeftNavigation from "../Navigation/LeftNavigation";
import RightNavigation from "../Navigation/RightNavigation";
import styles from "./Carousel.module.css";
import "swiper/css";

function Carousel({ items = [], renderItem, getItemKey = (item) => item.id, navigationId = "default" }) {
  const safeNavigationId = String(navigationId).replace(/[^a-zA-Z0-9_-]/g, "-");
  const previousButtonClass = `${styles.previousButton} ${styles.previousButton}-${safeNavigationId}`;
  const nextButtonClass = `${styles.nextButton} ${styles.nextButton}-${safeNavigationId}`;

  return (
    <div className={styles.carousel}>
      <Swiper
        modules={[Navigation, A11y]}
        navigation={{
          prevEl: `.${styles.previousButton}-${safeNavigationId}`,
          nextEl: `.${styles.nextButton}-${safeNavigationId}`,
        }}
        slidesPerView="auto"
        spaceBetween={20}
        watchOverflow
        a11y={{ enabled: true }}
      >
        {items.map((item) => (
          <SwiperSlide className={styles.slide} key={getItemKey(item)}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
      <LeftNavigation className={previousButtonClass} />
      <RightNavigation className={nextButtonClass} />
    </div>
  );
}

export default Carousel;
