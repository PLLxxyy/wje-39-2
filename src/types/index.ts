export type PackageStatus = 'transit' | 'delivered' | 'exception';
export type SpeedLevel = 'fast' | 'normal' | 'slow';

export interface Package {
  id: string;
  trackingNo: string;
  recipient: string;
  address: string;
  currentCity: string;
  destinationCity: string;
  status: PackageStatus;
  progress: number;
  estimatedDelivery: string;
  x: number;
  y: number;
  route: { x: number; y: number }[];
  distance: number;
  elapsedHours: number;
}

export type MapMode = 'normal' | 'satellite';
export type FilterStatus = 'all' | PackageStatus;
