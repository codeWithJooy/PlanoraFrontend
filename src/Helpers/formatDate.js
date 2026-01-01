export function formatDateWithSuffix(dateStr){
  const date = new Date(dateStr);

  const day = date.getDate();
  const year = date.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];

  const getDaySuffix = (day)=> {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getDaySuffix(day)} ${month} ${year}`;
}

export function formatISODateWithSuffix(isoDate) {
    const date = new Date(isoDate);
  
    // Use UTC methods to avoid timezone shift
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getUTCMonth()];
  
    const getDaySuffix = (day) => {
      if (day >= 11 && day <= 13) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    return `${day}${getDaySuffix(day)} ${month} ${year}`;
  }
  