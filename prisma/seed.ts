import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Seed Investors
  const investors = [
    {
      name: 'Alex Thompson',
      title: 'Partner at Paradigm Capital',
      category: 'vcs',
      twitter: 'https://twitter.com/alexthompson',
      notes: 'Focus on infrastructure and DeFi protocols. Check size $5M-$20M.'
    },
    {
      name: 'Sarah Chen',
      title: 'General Partner at a16z crypto',
      category: 'vcs',
      twitter: 'https://twitter.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarahchen',
      notes: 'Lead rounds from seed to Series B. Strong network in gaming and social.'
    },
    {
      name: 'Mike Johnson',
      title: 'Angel Investor',
      category: 'angels',
      twitter: 'https://twitter.com/mikej',
      notes: 'Former founder of 3 successful Web3 companies. Invests $50k-$250k.'
    },
    {
      name: 'Emily Davis',
      title: 'Founder at DeFi Ventures',
      category: 'liquid_funds',
      twitter: 'https://twitter.com/emilydavis',
      notes: 'Active trader and market maker. Can provide liquidity post-launch.'
    },
    {
      name: 'David Kim',
      title: 'Managing Partner at Polychain',
      category: 'vcs',
      twitter: 'https://twitter.com/davidkim',
      notes: 'Thesis-driven investments in layer 1s and cross-chain infrastructure.'
    },
    {
      name: 'Lisa Wang',
      title: 'Angel & Advisor',
      category: 'angels',
      linkedin: 'https://linkedin.com/in/lisawang',
      notes: 'Strong marketing background. Often provides advisory services alongside investment.'
    },
    {
      name: 'James Wilson',
      title: 'CIO at Multicoin Capital',
      category: 'liquid_funds',
      twitter: 'https://twitter.com/jameswilson',
      notes: 'Large check sizes. Looking for tokens with strong fundamentals.'
    },
    {
      name: 'Rachel Green',
      title: 'Partner at Variant Fund',
      category: 'vcs',
      twitter: 'https://twitter.com/rachelgreen',
      notes: 'Consumer crypto and ownership economies. Very hands-on post-investment.'
    },
  ]

  for (const investor of investors) {
    await prisma.investor.create({ data: investor })
  }
  console.log(`Created ${investors.length} investors`)

  // Seed Articles
  const articles = [
    {
      title: 'How to Build Pre-Launch Hype for Your Token',
      url: 'https://example.com/pre-launch-hype',
      category: 'pre_launch',
      notes: 'Essential reading for community building strategy'
    },
    {
      title: 'ICO Structures: A Complete Guide',
      url: 'https://example.com/ico-structures',
      category: 'ico_details',
      notes: 'Covers legal considerations and best practices'
    },
    {
      title: 'The Philosophy of Decentralization',
      url: 'https://example.com/decentralization',
      category: 'philosophy',
      notes: 'Foundation concepts every founder should understand'
    },
    {
      title: 'Q4 2024 Project Update',
      url: 'https://example.com/q4-update',
      category: 'project_updates',
      notes: 'Template for quarterly updates'
    },
    {
      title: 'Community Building Before Launch',
      url: 'https://example.com/community-building',
      category: 'pre_launch',
      notes: 'Focus on Discord and Twitter growth tactics'
    },
    {
      title: 'Tokenomics 101',
      url: 'https://example.com/tokenomics',
      category: 'ico_details',
      notes: 'Mathematical models and distribution strategies'
    },
    {
      title: 'The Art of the Pitch Deck',
      url: 'https://example.com/pitch-deck',
      category: 'pre_launch',
      notes: 'What VCs actually want to see'
    },
    {
      title: 'Post-Launch: First 90 Days',
      url: 'https://example.com/first-90-days',
      category: 'project_updates',
      notes: 'Critical milestones and metrics to track'
    },
  ]

  for (const article of articles) {
    await prisma.article.create({ data: article })
  }
  console.log(`Created ${articles.length} articles`)

  // Seed Videos
  const videos = [
    {
      title: 'Uniswap Launch Video',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      notes: 'Classic example of simple, effective launch messaging'
    },
    {
      title: 'How Aave Built a Billion Dollar Protocol',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      notes: 'Behind the scenes of building a top DeFi protocol'
    },
    {
      title: 'The Story of Ethereum',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      notes: 'Historical context and vision setting'
    },
    {
      title: 'Building in Public: A Web3 Journey',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      notes: 'Documentary-style content about the founder journey'
    },
    {
      title: 'Tokenomics Design Workshop',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      notes: '2-hour deep dive with practical examples'
    },
  ]

  for (const video of videos) {
    await prisma.video.create({ data: video })
  }
  console.log(`Created ${videos.length} videos`)

  // Seed Tweets
  const tweets = [
    {
      content: 'Just launched our protocol. After 2 years of building in stealth, we\'re finally live. Here\'s the thread...',
      tweetUrl: 'https://twitter.com/example/status/1',
      notes: 'Great launch announcement format'
    },
    {
      content: 'The future of finance is being built right now. We\'re at the intersection of traditional finance and DeFi...',
      tweetUrl: 'https://twitter.com/example/status/2',
      notes: 'Vision-driven messaging'
    },
    {
      content: 'Our tokenomics explained: 1. Community allocation: 40% 2. Team: 20% (4yr vest) 3. Treasury: 25% 4. Investors: 15%',
      tweetUrl: 'https://twitter.com/example/status/3',
      notes: 'Clear, transparent communication'
    },
    {
      content: 'Why we chose to build on Ethereum: thread on security, composability, and network effects 🧵',
      tweetUrl: 'https://twitter.com/example/status/4',
      notes: 'Technical positioning and thought leadership'
    },
  ]

  for (const tweet of tweets) {
    await prisma.tweet.create({ data: tweet })
  }
  console.log(`Created ${tweets.length} tweets`)

  // Seed Podcasts
  const podcasts = [
    {
      title: 'Bankless: The Future of DeFi',
      url: 'https://spotify.com/episode/1',
      notes: 'Must-listen for anyone in DeFi space'
    },
    {
      title: 'Unchained: Interview with Vitalik',
      url: 'https://spotify.com/episode/2',
      notes: 'Insights on Ethereum\'s future and scaling'
    },
    {
      title: 'The Defiant: Building Web3 Communities',
      url: 'https://spotify.com/episode/3',
      notes: 'Practical advice on community management'
    },
    {
      title: 'Epicenter: Layer 2 Deep Dive',
      url: 'https://spotify.com/episode/4',
      notes: 'Technical discussion on scaling solutions'
    },
    {
      title: 'Zero Knowledge: Cryptography for Founders',
      url: 'https://spotify.com/episode/5',
      notes: 'Understanding ZK tech without a PhD'
    },
  ]

  for (const podcast of podcasts) {
    await prisma.podcast.create({ data: podcast })
  }
  console.log(`Created ${podcasts.length} podcasts`)

  // Seed Providers
  const providers = [
    {
      name: 'Web3 Studio',
      website: 'https://web3studio.io',
      avgPrice: '$50,000 - $100,000',
      category: 'agencies',
      subcategory: 'Full-Service',
      notes: 'End-to-end protocol development and launch support',
      bestWorkUrl: 'https://web3studio.io/portfolio'
    },
    {
      name: 'DeFi Designs',
      website: 'https://defidesigns.co',
      avgPrice: '$10,000 - $25,000',
      category: 'agencies',
      subcategory: 'Design',
      notes: 'UI/UX specialists for DeFi applications',
      bestWorkUrl: 'https://defidesigns.co/work'
    },
    {
      name: 'Smart Contract Auditors',
      website: 'https://scauditors.io',
      avgPrice: '$25,000 - $75,000',
      category: 'agencies',
      subcategory: 'Security',
      notes: 'Comprehensive smart contract auditing services'
    },
    {
      name: 'The Crypto Pod',
      website: 'https://cryptopod.fm',
      avgPrice: '$2,000 - $5,000',
      category: 'podcasters',
      notes: '100k+ listeners, founder interviews',
      bestWorkUrl: 'https://cryptopod.fm/episodes'
    },
    {
      name: 'Web3 Waves',
      website: 'https://web3waves.fm',
      avgPrice: '$3,000 - $8,000',
      category: 'podcasters',
      notes: 'Technical deep dives, 50k+ audience'
    },
    {
      name: 'CryptoInfluencer',
      website: 'https://cryptoinfluencer.xyz',
      avgPrice: '$5,000/month',
      category: 'key_kols',
      notes: '500k+ Twitter followers, thought leader in DeFi',
      bestWorkUrl: 'https://twitter.com/cryptoinfluencer'
    },
    {
      name: 'BlockchainGuru',
      website: 'https://blockchainguru.io',
      avgPrice: '$8,000/month',
      category: 'key_kols',
      notes: '1M+ followers, advisor to top protocols'
    },
    {
      name: 'Web3ContentKing',
      website: 'https://web3contentking.com',
      avgPrice: '$3,000/month',
      category: 'key_kols',
      notes: '200k+ Twitter, specializes in thread breakdowns'
    },
    {
      name: 'BlockFilm Studio',
      website: 'https://blockfilm.io',
      avgPrice: '$15,000 - $50,000',
      category: 'filmmakers',
      notes: 'High-end video production and launch films',
      bestWorkUrl: 'https://blockfilm.io/reel'
    },
    {
      name: 'Crypto Creatives',
      website: 'https://cryptocreatives.tv',
      avgPrice: '$8,000 - $20,000',
      category: 'filmmakers',
      notes: 'Social-first video content'
    },
    {
      name: 'Wintermute',
      website: 'https://wintermute.com',
      avgPrice: 'Custom',
      category: 'market_makers',
      notes: 'Leading market maker for token launches',
      bestWorkUrl: 'https://wintermute.com/services'
    },
    {
      name: 'GSR Markets',
      website: 'https://gsr.io',
      avgPrice: 'Custom',
      category: 'market_makers',
      notes: 'Institutional-grade liquidity provision'
    },
    {
      name: 'Crypto Legal',
      website: 'https://cryptolegal.io',
      avgPrice: '$500/hour',
      category: 'miscellaneous',
      subcategory: 'Legal',
      notes: 'Token launch legal structuring'
    },
    {
      name: 'Web3 PR Agency',
      website: 'https://web3pr.io',
      avgPrice: '$10,000/month',
      category: 'miscellaneous',
      subcategory: 'PR',
      notes: 'Media relations and press coverage'
    },
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
