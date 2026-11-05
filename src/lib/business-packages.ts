export const businessPackageValues = [
  "6-Month Listing",
  "12-Month Listing",
  "Not sure yet",
] as const;

export const businessPackageOptions = [
  { value: businessPackageValues[0], price: "R600" },
  { value: businessPackageValues[1], price: "R1,000" },
] as const;
