import { useState } from "react";
import { Heart, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CafeCard from "@/components/cafe/CafeCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cafes } from "@/data/cafes";

const Favorites = () => {
  // In a real app, this would come from a global state or API
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(["1", "3"]));
  const [recentlyViewedIds] = useState<string[]>(["1", "2", "4", "5"]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const favoriteCafes = cafes
    .filter((cafe) => favoriteIds.has(cafe.id))
    .map((cafe) => ({ ...cafe, isFavorite: true }));

  const recentlyViewed = cafes
    .filter((cafe) => recentlyViewedIds.includes(cafe.id))
    .map((cafe) => ({ ...cafe, isFavorite: favoriteIds.has(cafe.id) }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="space-y-2 mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Your Cafés
            </h1>
            <p className="text-muted-foreground">
              Saved spots and recently viewed cafés
            </p>
          </div>

          <Tabs defaultValue="favorites" className="space-y-8">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="favorites" className="gap-2">
                <Heart className="h-4 w-4" />
                Favorites ({favoriteCafes.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <Coffee className="h-4 w-4" />
                Recently Viewed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="favorites" className="space-y-6">
              {favoriteCafes.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {favoriteCafes.map((cafe, index) => (
                    <div
                      key={cafe.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CafeCard cafe={cafe} onToggleFavorite={toggleFavorite} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Heart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    No favorites yet
                  </h3>
                  <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                    Start exploring and save cafés you love. They'll appear here for quick access.
                  </p>
                  <Button asChild>
                    <Link to="/explore">Discover Cafés</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              {recentlyViewed.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recentlyViewed.map((cafe, index) => (
                    <div
                      key={cafe.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CafeCard cafe={cafe} onToggleFavorite={toggleFavorite} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Coffee className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    No recent activity
                  </h3>
                  <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                    Cafés you view will show up here so you can easily find them again.
                  </p>
                  <Button asChild>
                    <Link to="/explore">Start Exploring</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
