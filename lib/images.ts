// Curated editorial salon / hair photography from Unsplash.
// Tall, moody portrait orientations and detail shots fit the brand.

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImages = {
  main: u('photo-1521590832167-7bcbfaa6381f', 2000),
  side: u('photo-1492106087820-71f1a00d2b11', 1400),
  detail: u('photo-1559599101-f09722fb4948', 1200),
};

export const teamImages = [
  u('photo-1531123897727-8f129e1688ce', 900),
  u('photo-1554151228-14d9def656e4', 900),
  u('photo-1544005313-94ddf0286df2', 900),
  u('photo-1488426862026-3ee34a7d66df', 900),
  u('photo-1614283233556-f35b0c801ef1', 900),
  u('photo-1487412720507-e7ab37603c6f', 900),
];

export const galleryImages = [
  u('photo-1605497788044-5a32c7078486', 1200),
  u('photo-1595475207225-428b62bda831', 1200),
  u('photo-1580618672591-eb180b1a973f', 1200),
  u('photo-1492106087820-71f1a00d2b11', 1200),
  u('photo-1519415943484-9fa1873496d4', 1200),
  u('photo-1580618864180-f6d7d39b8ff6', 1200),
  u('photo-1503951914875-452162b0f3f1', 1200),
  u('photo-1487412720507-e7ab37603c6f', 1200),
  u('photo-1605980776566-0486c3ac7617', 1200),
  u('photo-1559599101-f09722fb4948', 1200),
  u('photo-1521590832167-7bcbfaa6381f', 1200),
  u('photo-1595959183082-7b570b7e08e2', 1200),
];

export const ambientImages = {
  studio: u('photo-1633681926022-84c23e8cb2d6', 1800),
  pour: u('photo-1522337660859-02fbefca4702', 1400),
  texture: u('photo-1604654894610-df63bc536371', 1400),
  product: u('photo-1599387737272-ba2c44ff5d04', 1200),
  bottle: u('photo-1571781926291-c477ebfd024b', 1200),
  candle: u('photo-1601925268150-1cd56f3d23dc', 1200),
};
