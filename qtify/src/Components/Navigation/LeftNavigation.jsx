import React from "react";

function LeftNavigation({ className }) {
  return (
    <button className={className} type="button" aria-label="Previous albums">
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m15 18-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default LeftNavigation;
