import React from "react";

function RightNavigation({ className }) {
  return (
    <button className={className} type="button" aria-label="Next albums">
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default RightNavigation;
