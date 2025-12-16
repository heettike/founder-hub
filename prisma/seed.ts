import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Seed Investors
  const investors = [
    { name: 'Alex Thompson', title: 'Partner at Paradigm Capital', category: 'vcs', twitter: 'https://twitter.com/alexthompson' },
    { name: 'Sarah Chen', title: 'General Partner at a16z crypto', category: 'vcs', twitter: 'https://twitter.com/sarahchen', linkedin: 'https://linkedin.com/in/sarahchen' },
    { name: 'Mike Johnson', title: 'Angel Investor', category: 'angels', twitter: 'https://twitter.com/mikej' },
    { name: 'Emily Davis', title: 'Founder at DeFi Ventures', category: 'liquid_funds', twitter: 'https://twitter.com/emilydavis' },
    { name: 'David Kim', title: 'Managing Partner at Polychain', category: 'vcs', twitter: 'https://twitter.com/davidkim' },
    { name: 'Lisa Wang', title: 'Angel & Advisor', category: 'angels', linkedin: 'https://linkedin.com/in/lisawang' },
    { name: 'James Wilson', title: 'CIO at Multicoin Capital', category: 'liquid_funds', twitter: 'https://twitter.com/jameswilson' },
    { name: 'Rachel Green', title: 'Partner at Variant Fund', category: 'vcs', twitter: 'https://twitter.com/rachelgreen' },
  ]

  for (const investor of investors) {
    await prisma.investor.create({ data: investor })
  }
  console.log(`Created ${investors.length} investors`)

  // Seed Articles
  const articles = [
    { title: 'How to Build Pre-Launch Hype for Your Token', url: 'https://example.com/pre-launch-hype', category: 'pre_launch' },
    { title: 'ICO Structures: A Complete Guide', url: 'https://example.com/ico-structures', category: 'ico_details' },
    { title: 'The Philosophy of Decentralization', url: 'https://example.com/decentralization', category: 'philosophy' },
    { title: 'Q4 2024 Project Update', url: 'https://example.com/q4-update', category: 'project_updates' },
    { title: 'Community Building Before Launch', url: 'https://example.com/community-building', category: 'pre_launch' },
    { title: 'Tokenomics 101', url: 'https://example.com/tokenomics', category: 'ico_details' },
  ]

  for (const article of articles) {
    await prisma.article.create({ data: article })
  }
  console.log(`Created ${articles.length} articles`)

  // Seed Videos
  const videos = [
    { title: 'Uniswap Launch Video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'How Aave Built a Billion Dollar Protocol', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'The Story of Ethereum', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'Building in Public: A Web3 Journey', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  ]

  for (const video of videos) {
    await prisma.video.create({ data: video })
  }
  console.log(`Created ${videos.length} videos`)

  // Seed Tweets
  const tweets = [
    { content: 'Just launched our protocol. After 2 years of building in stealth, we\'re finally live. Here\'s the thread...', tweetUrl: 'https://twitter.com/example/status/1' },
    { content: 'The future of finance is being built right now. We\'re at the intersection of traditional finance and DeFi...', tweetUrl: 'https://twitter.com/example/status/2' },
    { content: 'Our tokenomics explained: 1. Community allocation: 40% 2. Team: 20% (4yr vest) 3. Treasury: 25% 4. Investors: 15%', tweetUrl: 'https://twitter.com/example/status/3' },
  ]

  for (const tweet of tweets) {
    await prisma.tweet.create({ data: tweet })
  }
  console.log(`Created ${tweets.length} tweets`)

  // Seed Podcasts
  const podcasts = [
    { title: 'Bankless: The Future of DeFi', url: 'https://spotify.com/episode/1' },
    { title: 'Unchained: Interview with Vitalik', url: 'https://spotify.com/episode/2' },
    { title: 'The Defiant: Building Web3 Communities', url: 'https://spotify.com/episode/3' },
    { title: 'Epicenter: Layer 2 Deep Dive', url: 'https://spotify.com/episode/4' },
  ]

  for (const podcast of podcasts) {
    await prisma.podcast.create({ data: podcast })
  }
  console.log(`Created ${podcasts.length} podcasts`)

  // Seed Providers
  const providers = [
    { name: 'Web3 Studio', website: 'https://web3studio.io', avgPrice: '$50,000 - $100,000', category: 'agencies', subcategory: 'Full-Service' },
    { name: 'DeFi Designs', website: 'https://defidesigns.co', avgPrice: '$10,000 - $25,000', category: 'agencies', subcategory: 'Design' },
    { name: 'The Crypto Pod', website: 'https://cryptopod.fm', avgPrice: '$2,000 - $5,000', category: 'podcasters' },
    { name: 'Tweet Masters', website: 'https://tweetmasters.xyz', avgPrice: '$3,000/month', category: 'ghostwriters' },
    { name: 'BlockFilm Studio', website: 'https://blockfilm.io', avgPrice: '$15,000 - $50,000', category: 'filmmakers' },
    { name: 'Crypto Legal', website: 'https://cryptolegal.io', avgPrice: '$500/hour', category: 'miscellaneous', subcategory: 'Legal' },
  ]

  for (const provider of providers) {
    await prisma.provider.create({ data: provider })
  }
  console.log(`Created ${providers.length} providers`)

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
