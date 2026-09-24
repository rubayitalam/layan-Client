import { PublicNavbar } from '@/components/public/PublicNavbar';
import { SearchGrid } from '@/components/public/SearchGrid';
import { PublicFooter } from '@/components/public/PublicFooter';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#F7F6F3]">
      <PublicNavbar />
      <SearchGrid />
      <PublicFooter />
    </main>
  );
}
