import { PublicNavbar } from '@/components/public/PublicNavbar';
import { DiscoveryFeed } from '@/components/public/DiscoveryFeed';
import { PublicFooter } from '@/components/public/PublicFooter';

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-[#F7F6F3]">
      <PublicNavbar />
      <DiscoveryFeed />
      <PublicFooter />
    </main>
  );
}
