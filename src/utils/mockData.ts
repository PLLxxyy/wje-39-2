import { Package } from '../types';

const cities = [
  { name: '北京', x: 70, y: 20 },
  { name: '上海', x: 85, y: 55 },
  { name: '广州', x: 70, y: 80 },
  { name: '深圳', x: 72, y: 82 },
  { name: '成都', x: 35, y: 55 },
  { name: '武汉', x: 60, y: 55 },
  { name: '西安', x: 45, y: 40 },
  { name: '杭州', x: 82, y: 52 },
  { name: '南京', x: 80, y: 48 },
  { name: '重庆', x: 38, y: 58 },
  { name: '天津', x: 72, y: 22 },
  { name: '苏州', x: 84, y: 50 },
  { name: '郑州', x: 55, y: 40 },
  { name: '长沙', x: 58, y: 65 },
  { name: '沈阳', x: 80, y: 10 },
];

const cityDistances: Record<string, number> = {
  '北京-上海': 1318, '北京-广州': 2121, '北京-深圳': 2160, '北京-成都': 1800, '北京-武汉': 1200,
  '北京-西安': 1070, '北京-杭州': 1279, '北京-南京': 1023, '北京-重庆': 1750, '北京-天津': 137,
  '北京-苏州': 1150, '北京-郑州': 695, '北京-长沙': 1591, '北京-沈阳': 700,
  '上海-广州': 1420, '上海-深圳': 1430, '上海-成都': 1960, '上海-武汉': 820,
  '上海-西安': 1380, '上海-杭州': 175, '上海-南京': 301, '上海-重庆': 1680, '上海-天津': 1320,
  '上海-苏州': 100, '上海-郑州': 998, '上海-长沙': 1170, '上海-沈阳': 1890,
  '广州-深圳': 147, '广州-成都': 1540, '广州-武汉': 980,
  '广州-西安': 1650, '广州-杭州': 1250, '广州-南京': 1360, '广州-重庆': 1280, '广州-天津': 2000,
  '广州-苏州': 1430, '广州-郑州': 1450, '广州-长沙': 707, '广州-沈阳': 2700,
  '深圳-成都': 1570, '深圳-武汉': 1020,
  '深圳-西安': 1690, '深圳-杭州': 1280, '深圳-南京': 1390, '深圳-重庆': 1310, '深圳-天津': 2030,
  '深圳-苏州': 1460, '深圳-郑州': 1490, '深圳-长沙': 740, '深圳-沈阳': 2730,
  '成都-武汉': 1150, '成都-西安': 720,
  '成都-杭州': 1700, '成都-南京': 1610, '成都-重庆': 308, '成都-天津': 1850,
  '成都-苏州': 1690, '成都-郑州': 1200, '成都-长沙': 1230, '成都-沈阳': 2450,
  '武汉-西安': 740, '武汉-杭州': 730, '武汉-南京': 540, '武汉-重庆': 910, '武汉-天津': 1100,
  '武汉-苏州': 700, '武汉-郑州': 536, '武汉-长沙': 362, '武汉-沈阳': 1800,
  '西安-杭州': 1300, '西安-南京': 1050, '西安-重庆': 790, '西安-天津': 1150,
  '西安-苏州': 1230, '西安-郑州': 480, '西安-长沙': 1000, '西安-沈阳': 1750,
  '杭州-南京': 240, '杭州-重庆': 1500, '杭州-天津': 1250,
  '杭州-苏州': 120, '杭州-郑州': 920, '杭州-长沙': 870, '杭州-沈阳': 1750,
  '南京-重庆': 1400, '南京-天津': 900,
  '南京-苏州': 217, '南京-郑州': 700, '南京-长沙': 800, '南京-沈阳': 1550,
  '重庆-天津': 1800, '重庆-苏州': 1480,
  '重庆-郑州': 1150, '重庆-长沙': 900, '重庆-沈阳': 2600,
  '天津-苏州': 1090, '天津-郑州': 790,
  '天津-长沙': 1500, '天津-沈阳': 660,
  '苏州-郑州': 900, '苏州-长沙': 1050, '苏州-沈阳': 1820,
  '郑州-长沙': 898, '郑州-沈阳': 1400,
  '长沙-沈阳': 2200,
};

function getDistance(from: string, to: string): number {
  if (from === to) return 50;
  const key1 = `${from}-${to}`;
  const key2 = `${to}-${from}`;
  if (cityDistances[key1]) return cityDistances[key1];
  if (cityDistances[key2]) return cityDistances[key2];
  return 1000;
}

function randomDate(days: number): string {
  const now = new Date();
  now.setDate(now.getDate() + days);
  return now.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
}

function generateRoute(from: { x: number; y: number }, to: { x: number; y: number }): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [from];
  const steps = 5 + Math.floor(Math.random() * 4);
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    points.push({
      x: from.x + (to.x - from.x) * t + (Math.random() - 0.5) * 8,
      y: from.y + (to.y - from.y) * t + (Math.random() - 0.5) * 8,
    });
  }
  points.push(to);
  return points;
}

export function generatePackages(count: number): Package[] {
  const packages: Package[] = [];
  const statuses: Array<'transit' | 'delivered' | 'exception'> = ['transit', 'transit', 'transit', 'delivered', 'exception'];

  for (let i = 0; i < count; i++) {
    const fromCity = cities[Math.floor(Math.random() * cities.length)];
    let toCity = cities[Math.floor(Math.random() * cities.length)];
    while (toCity.name === fromCity.name) {
      toCity = cities[Math.floor(Math.random() * cities.length)];
    }

    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const progress = status === 'delivered' ? 100 : status === 'exception' ? Math.random() * 60 : Math.random() * 90;
    const route = generateRoute(fromCity, toCity);
    const currentIndex = Math.min(Math.floor((progress / 100) * (route.length - 1)), route.length - 1);
    const pos = route[currentIndex];
    const distance = getDistance(fromCity.name, toCity.name);
    const avgSpeed = 40 + Math.random() * 40;
    const totalExpectedHours = distance / avgSpeed;
    const elapsedHours = (progress / 100) * totalExpectedHours * (0.7 + Math.random() * 0.6);

    packages.push({
      id: `PKG${String(i + 1).padStart(4, '0')}`,
      trackingNo: `SF${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      recipient: `用户${i + 1}`,
      address: `${toCity.name}市${['朝阳区', '海淀区', '天河区', '福田区', '武侯区', '江汉区'][Math.floor(Math.random() * 6)]}某街道${Math.floor(Math.random() * 900) + 100}号`,
      currentCity: fromCity.name,
      destinationCity: toCity.name,
      status,
      progress: Math.round(progress),
      estimatedDelivery: randomDate(status === 'delivered' ? -1 : Math.floor(Math.random() * 3) + 1),
      x: pos.x,
      y: pos.y,
      route,
      distance,
      elapsedHours: Math.max(0.1, elapsedHours),
    });
  }

  return packages;
}

export function movePackages(packages: Package[]): Package[] {
  return packages.map((pkg) => {
    if (pkg.status === 'delivered') return pkg;

    const newProgress = Math.min(pkg.progress + (Math.random() * 3), 100);
    const currentIndex = Math.min(Math.floor((newProgress / 100) * (pkg.route.length - 1)), pkg.route.length - 1);
    const pos = pkg.route[currentIndex];
    const timeIncrement = (newProgress - pkg.progress) / 100 * (pkg.distance / 55);

    let newStatus = pkg.status;
    if (newProgress >= 100) newStatus = 'delivered';
    else if (Math.random() < 0.005 && pkg.status !== 'exception') newStatus = 'exception';

    return {
      ...pkg,
      progress: Math.round(newProgress),
      status: newStatus,
      x: pos.x,
      y: pos.y,
      elapsedHours: newStatus === 'exception' ? pkg.elapsedHours : pkg.elapsedHours + timeIncrement,
    };
  });
}
