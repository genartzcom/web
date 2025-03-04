import { NextResponse } from 'next/server';

const modulariumCollections = [
  {
    id: '1',
    title: 'Cyber Apes',
    creator: 'ape_master.eth',
    imageSrc: '/media/images/dummy-nfts/1.png',
    totalMinted: 5000,
    floorPrice: 2.1,
  },
  {
    id: '2',
    title: 'Pixel Warriors',
    creator: 'pixel_knight.eth',
    imageSrc: '/media/images/dummy-nfts/2.png',
    totalMinted: 3000,
    floorPrice: 3.0,
  },
  {
    id: '3',
    title: 'Meta Dragons',
    creator: 'dragon_king.eth',
    imageSrc: '/media/images/dummy-nfts/3.png',
    totalMinted: 2500,
    floorPrice: 4.2,
  },
  {
    id: '4',
    title: 'Cyber Apes',
    creator: 'ape_master.eth',
    imageSrc: '/media/images/dummy-nfts/4.png',
    totalMinted: 5000,
    floorPrice: 2.1,
  },
  {
    id: '5',
    title: 'Pixel Warriors',
    creator: 'pixel_knight.eth',
    imageSrc: '/media/images/dummy-nfts/5.png',
    totalMinted: 3000,
    floorPrice: 3.0,
  },
  {
    id: '6',
    title: 'Meta Dragons',
    creator: 'dragon_king.eth',
    imageSrc: '/media/images/dummy-nfts/6.png',
    totalMinted: 2500,
    floorPrice: 4.2,
  },
  {
    id: '7',
    title: 'Cyber Apes',
    creator: 'ape_master.eth',
    imageSrc: '/media/images/dummy-nfts/1.png',
    totalMinted: 5000,
    floorPrice: 2.1,
  },
  {
    id: '8',
    title: 'Pixel Warriors',
    creator: 'pixel_knight.eth',
    imageSrc: '/media/images/dummy-nfts/2.png',
    totalMinted: 3000,
    floorPrice: 3.0,
  },
  {
    id: '9',
    title: 'Meta Dragons',
    creator: 'dragon_king.eth',
    imageSrc: '/media/images/dummy-nfts/3.png',
    totalMinted: 2500,
    floorPrice: 4.2,
  },
  {
    id: '10',
    title: 'Cyber Apes',
    creator: 'ape_master.eth',
    imageSrc: '/media/images/dummy-nfts/4.png',
    totalMinted: 5000,
    floorPrice: 2.1,
  },
  {
    id: '11',
    title: 'Pixel Warriors',
    creator: 'pixel_knight.eth',
    imageSrc: '/media/images/dummy-nfts/5.png',
    totalMinted: 3000,
    floorPrice: 3.0,
  },
  {
    id: '12',
    title: 'Meta Dragons',
    creator: 'dragon_king.eth',
    imageSrc: '/media/images/dummy-nfts/6.png',
    totalMinted: 2500,
    floorPrice: 4.2,
  },
  {
    id: '13',
    title: 'Cyber Apes',
    creator: 'ape_master.eth',
    imageSrc: '/media/images/dummy-nfts/1.png',
    totalMinted: 5000,
    floorPrice: 2.1,
  },
  {
    id: '14',
    title: 'Pixel Warriors',
    creator: 'pixel_knight.eth',
    imageSrc: '/media/images/dummy-nfts/2.png',
    totalMinted: 3000,
    floorPrice: 3.0,
  },
  {
    id: '15',
    title: 'Meta Dragons',
    creator: 'dragon_king.eth',
    imageSrc: '/media/images/dummy-nfts/3.png',
    totalMinted: 2500,
    floorPrice: 4.2,
  },
  {
    id: '16',
    title: 'Cyber Apes',
    creator: 'ape_master.eth',
    imageSrc: '/media/images/dummy-nfts/4.png',
    totalMinted: 5000,
    floorPrice: 2.1,
  },
  {
    id: '17',
    title: 'Pixel Warriors',
    creator: 'pixel_knight.eth',
    imageSrc: '/media/images/dummy-nfts/5.png',
    totalMinted: 3000,
    floorPrice: 3.0,
  },
  {
    id: '18',
    title: 'Meta Dragons',
    creator: 'dragon_king.eth',
    imageSrc: '/media/images/dummy-nfts/6.png',
    totalMinted: 2500,
    floorPrice: 4.2,
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(3000);
  return NextResponse.json(modulariumCollections);
}
