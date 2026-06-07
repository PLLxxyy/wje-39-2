import { PackageStatus, SpeedLevel, Package } from '../types';

export const statusColor: Record<PackageStatus, string> = {
  transit: '#3b82f6',
  delivered: '#22c55e',
  exception: '#ef4444',
};

export const statusLabel: Record<PackageStatus, string> = {
  transit: '运输中',
  delivered: '已签收',
  exception: '异常',
};

export const statusBg: Record<PackageStatus, string> = {
  transit: 'bg-blue-500',
  delivered: 'bg-green-500',
  exception: 'bg-red-500',
};

export const speedLabel: Record<SpeedLevel, string> = {
  fast: '偏快',
  normal: '正常',
  slow: '偏慢',
};

export const speedColor: Record<SpeedLevel, string> = {
  fast: '#22c55e',
  normal: '#3b82f6',
  slow: '#f59e0b',
};

export const speedBg: Record<SpeedLevel, string> = {
  fast: 'bg-green-500',
  normal: 'bg-blue-500',
  slow: 'bg-amber-500',
};

export function calculateSpeed(pkg: Package): number {
  if (pkg.elapsedHours <= 0 || pkg.progress <= 0) return 0;
  const traveledDistance = pkg.distance * (pkg.progress / 100);
  return traveledDistance / pkg.elapsedHours;
}

export function getSpeedLevel(pkg: Package): SpeedLevel {
  const speed = calculateSpeed(pkg);
  if (speed === 0) return 'normal';
  if (speed < 40) return 'slow';
  if (speed > 70) return 'fast';
  return 'normal';
}
