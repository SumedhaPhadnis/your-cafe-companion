import { useState } from "react";
import { ArrowRight, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import CafeCard from "@/components/cafe/CafeCard";
import { cafes } from "@/data/cafes";
import { Link } from "react-router-dom";

const FeaturedCafes = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const featuredCafes = cafes.slice(0, 3).map((cafe) => ({
    ...cafe,
    isFavorite: favorites.has(cafe.id),
  }));

  const trendingCafes = cafes.slice(3, 6).map((cafe) => ({
    ...cafe,
    isFavorite: favorites.has(cafe.id),
  }));

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 space-y-16">
        {/* Featured Cafés */}
        <div className="space-y-8">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium uppercase tracking-wide">Top Rated</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Featured Cafés
              </h2>
              <p className="text-muted-foreground max-w-md">
                Handpicked spots loved by our community for their exceptional coffee and atmosphere.
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link to="/explore">
                View all
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCafes.map((cafe, index) => (
              <div
                key={cafe.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CafeCard cafe={cafe} onToggleFavorite={toggleFavorite} />
              </div>
            ))}
          </div>

          <Button variant="outline" asChild className="w-full md:hidden">
            <Link to="/explore">
              View all cafés
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Trending Now */}
        <div className="space-y-8">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wide">Trending</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Popular Right Now
              </h2>
              <p className="text-muted-foreground max-w-md">
                See what's hot in your area — the cafés everyone's talking about.
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link to="/explore?sort=popular">
                Explore trending
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendingCafes.map((cafe, index) => (
              <div
                key={cafe.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CafeCard cafe={cafe} onToggleFavorite={toggleFavorite} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCafes;
