import React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Ad {
  id: number;
  title: string;
  description: string;
  image_url: string;
  cta_text: string;
  cta_url: string;
}

function AdCard({ title, description, image_url, cta_text, cta_url }: Omit<Ad, 'id'>) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"; // Fallback car image

  return (
    <Card className="overflow-hidden group">
      <div className="relative h-24 sm:h-32 md:h-40">
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 z-10 bg-black/50 text-white hover:bg-black/50 text-xs"
        >
          Ad
        </Badge>
        <img
          src={imageError ? fallbackImage : image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          onError={() => setImageError(true)}
        />
      </div>
      <CardContent className="p-2 sm:p-3 md:p-4">
        <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4 line-clamp-2">{description}</p>
        <a
          href={cta_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          {cta_text}
        </a>
      </CardContent>
    </Card>
  );
}

export function AdGrid() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAds() {
      try {
        const { data, error } = await supabase
          .from('nabangganaba-ads')
          .select('*')
          .eq('active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAds(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch ads');
      } finally {
        setLoading(false);
      }
    }

    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((placeholder) => (
            <Card key={placeholder} className="animate-pulse">
              <div className="h-24 sm:h-32 md:h-40 bg-gray-200" />
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-8 bg-gray-200 rounded mb-4" />
                <div className="h-8 w-24 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mb-6 text-center text-red-500">
        Error loading ads: {error}
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="container mx-auto mb-6 text-center text-muted-foreground">
        No ads available
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ads.map((ad) => (
          <AdCard key={ad.id} {...ad} />
        ))}
      </div>
    </div>
  );
}

export default AdGrid;