import { PublicNavbar } from '@/components/public/PublicNavbar';
import { SalonProfile } from '@/components/public/SalonProfile';
import { PublicFooter } from '@/components/public/PublicFooter';

export default async function SalonPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return (
    <main className="min-h-screen bg-white">
      <PublicNavbar />
      <SalonProfile slug={resolvedParams.slug} />
      <PublicFooter />
    </main>
  );
}
