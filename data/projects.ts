export type ProjectType = 'Playable Ads' | 'HTML5 Games'
export type DimensionType = '2D' | '3D'

export interface Project {
  id: string
  title: string
  category: string
  type: ProjectType
  dimension: DimensionType
  cardBg: string // Pastel bottom color
  thumbnail: string
  htmlUrl: string
  description: string
  metrics?: {
    size?: string
    fps?: string
    moves?: string
  }
  tags?: string[]
}

export interface Html5Game {
  id: string
  title: string
  url: string
  image: string
}

/**
 * ============================================================
 * DATA PLAYABLE ADS (PLAYTOMAX CLONE ARCHITECTURE)
 * ============================================================
 */
export const projects: Project[] = [
  {
    id: 'water-sort',
    title: 'Water Sort: Snow Bottle',
    category: 'Puzzle / Sorting',
    type: 'Playable Ads',
    dimension: '2D',
    cardBg: '#dff1fd', // Soft sky blue
    thumbnail: '/thumbnails/water-sort.png',
    htmlUrl: '/playables/water-sort/index.html',
    description: 'Snow Bottle 15-move playable ad built with Luna & Unity WebGL. Highly optimized for fast user engagement, zero runtime GC spikes, and instant tap intent.',
    metrics: { size: '4.3 MB', fps: '60 FPS', moves: '15 MOVES' },
    tags: ['Unity', 'Luna Playable', 'WebGL', 'C#', 'Snow Bottle'],
  },
  {
    id: 'berry-factory-tycoon',
    title: 'Berry Factory Tycoon',
    category: 'Simulation',
    type: 'Playable Ads',
    dimension: '3D',
    cardBg: '#fdeddf', // Soft peach
    thumbnail: '/thumbnails/berry-factory.png',
    htmlUrl: 'https://playable-ads.html5gd.com/berry-factory-jelly-bears/default/',
    description: 'Tactile factory conveyor management playable designed for instant engagement and high CPI performance.',
    metrics: { size: '3.8 MB', fps: '60 FPS', moves: 'Real-time' },
    tags: ['Unity', '3D Spline', 'Simulation'],
  },
  {
    id: 'fancy-blast',
    title: 'Fancy Blast',
    category: 'Match 3',
    type: 'Playable Ads',
    dimension: '2D',
    cardBg: '#eae6fd', // Lavender
    thumbnail: '/thumbnails/fancy-blast.png',
    htmlUrl: 'https://sandbox.playtomax.com/ad/fancy_blast/default/index.html',
    description: 'Crisp match-3 puzzle playable ad with responsive combo cascades and organic tap guidance.',
    metrics: { size: '2.4 MB', fps: '60 FPS', moves: '10 MOVES' },
    tags: ['Unity', '2D Board', 'Match 3'],
  },
  {
    id: 'flop-house',
    title: 'Flop House',
    category: 'Simulation',
    type: 'Playable Ads',
    dimension: '3D',
    cardBg: '#fbf5d5', // Warm cream
    thumbnail: '/thumbnails/flop-house.png',
    htmlUrl: 'https://playable-ads.html5gd.com/flop-house-admit-the-homeless-rain/default/',
    description: 'Survival shelter management simulation with drag-and-drop worker assignment and urgent stakes.',
    metrics: { size: '3.9 MB', fps: '60 FPS', moves: 'Urgent Action' },
    tags: ['Unity', '3D Mesh', 'Simulation'],
  },
  {
    id: 'coffee-mania',
    title: 'Coffee Mania',
    category: 'Puzzle / Sorting',
    type: 'Playable Ads',
    dimension: '3D',
    cardBg: '#dff1fd', // Soft blue
    thumbnail: '/thumbnails/coffee-mania.png',
    htmlUrl: 'https://playable-ads.html5gd.com/coffee-mania-hexa-sort/default/',
    description: 'Tactile 3D sorting cylinder with 360-degree swipe rotation and bite-sized cognitive challenge.',
    metrics: { size: '3.1 MB', fps: '60 FPS', moves: 'Swipe & Sort' },
    tags: ['Unity', '3D Sorting', 'Luna'],
  },
  {
    id: 'bus-frenzy',
    title: 'Bus Frenzy',
    category: 'Puzzle / Sorting',
    type: 'Playable Ads',
    dimension: '2D',
    cardBg: '#fdeddf', // Soft peach
    thumbnail: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a60a9c48cec35914976e98e_6a60a99f3c840a34015ca710_bus-frenzy-cover.avif',
    htmlUrl: 'https://playable-ads.html5gd.com/bus-frenzy-j-curve-road/default/',
    description: 'Color sorting traffic management puzzle with responsive car queue physics.',
    metrics: { size: '2.8 MB', fps: '60 FPS', moves: 'Color Match' },
    tags: ['Unity', 'Traffic Puzzle', 'Luna'],
  },
  {
    id: 'idle-bank-tycoon',
    title: 'Idle Bank Tycoon',
    category: 'Idle',
    type: 'Playable Ads',
    dimension: '3D',
    cardBg: '#eae6fd', // Lavender
    thumbnail: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a60a9c48cec35914976e985_6a60a99a644365cdabdef6cb_idle-bank-tycoon-cover.avif',
    htmlUrl: 'https://playable-ads.html5gd.com/idle-bank-tycoon-skills/default/',
    description: 'Dynamic banking tycoon simulator with instant gold vault upgrade progression.',
    metrics: { size: '3.4 MB', fps: '60 FPS', moves: 'Tap to Earn' },
    tags: ['Unity', 'Idle Tycoon', '3D'],
  },
  {
    id: 'idle-miner-tycoon',
    title: 'Idle Miner Tycoon',
    category: 'Idle',
    type: 'Playable Ads',
    dimension: '2D',
    cardBg: '#fbf5d5', // Warm cream
    thumbnail: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a60a9c48cec35914976e991_6a60a993feca921e1945b0df_idle-miner-tycoon-cover.avif',
    htmlUrl: 'https://playable-ads.html5gd.com/idle-miner-tycoon-treasure-excavation-iterations/default/',
    description: 'Classic underground mining idle ad unit with excavator boost loop.',
    metrics: { size: '2.1 MB', fps: '60 FPS', moves: 'Idle Loop' },
    tags: ['Unity', '2D Spine', 'Idle'],
  },
  {
    id: 'metalstorm',
    title: 'Metalstorm',
    category: 'Action',
    type: 'Playable Ads',
    dimension: '3D',
    cardBg: '#dff1fd', // Soft blue
    thumbnail: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a60a9c58cec35914976e99b_6a60a98cfda4c8b94cba20b1_metalstorm-cover.avif',
    htmlUrl: 'https://playable-ads.html5gd.com/metalstorm/default/',
    description: 'High-octane jet fighter aerial dogfight playable with gyroscope roll and missile lock.',
    metrics: { size: '4.8 MB', fps: '60 FPS', moves: 'Dogfight' },
    tags: ['Unity', '3D Flight', 'Action'],
  },
]

export const html5Games: Html5Game[] = [
  {
    id: 'top-differences',
    title: 'Top Differences',
    url: 'https://public.playtomax.com/games/top-differences/',
    image: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a7eea43c4219744d6c11f80_differences.jpg',
  },
  {
    id: 'turbo-race-3d',
    title: 'Turbo Race 3D',
    url: 'https://public.playtomax.com/games/drag-racing/',
    image: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a7ee9218ff320d61aa374c7_racing.jpg',
  },
  {
    id: 'pick-me-up',
    title: 'Pick Me Up',
    url: 'https://public.playtomax.com/games/pick-me-up/',
    image: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a7ee74f689f5b7d265e49f4_pick.jpg',
  },
  {
    id: 'sword-play',
    title: 'Sword Play',
    url: 'https://public.playtomax.com/games/sword-play/',
    image: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a7ee5db8ff320d61aa1906f_sword.jpg',
  },
  {
    id: 'bouncemasters',
    title: 'Bouncemasters',
    url: 'https://public.playtomax.com/games/bouncemasters/',
    image: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a60aba6cdbdedfb5ba7511c_6a60ab62a173f64939b6e82a_bouncemasters-cover.avif',
  },
  {
    id: 'bowmasters',
    title: 'Bowmasters',
    url: 'https://public.playtomax.com/games/bowmasters/',
    image: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a60ab6275825fe7d88c22dc_bowmasters-cover.avif',
  },
  {
    id: 'dig-deep',
    title: 'Dig Deep',
    url: 'https://public.playtomax.com/games/dig-deep/',
    image: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a60ab62a0ee687981ea61b9_dig-deep-cover.avif',
  },
  {
    id: 'bottle-jump',
    title: 'Bottle Jump',
    url: 'https://public.playtomax.com/games/bottle-jump-3d/',
    image: 'https://cdn.prod.website-files.com/6a3419e737651298c74f4775/6a60ab618684ad4197475f4a_bottle-jump-cover.avif',
  },
]
