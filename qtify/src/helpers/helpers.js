// Helper function to truncate text
export const truncate = (text, length = 50) => {
  if (!text) return "";
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
};

// Helper function to format duration
export const formatDuration = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};
