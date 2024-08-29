import { KittyStatus } from "../types";

export const getStatusColor = (status: KittyStatus | undefined) => {
  if (status === undefined) return "gray";

  const colors: Record<KittyStatus, string> = {
    RearinToGo: "pink",
    tired: "purple",
    "had birth recently": "teal",
  };
  
  return colors[status];
};
