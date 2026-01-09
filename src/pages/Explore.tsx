import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, SlidersHorizontal, Wifi, Leaf, X, ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CafeCard from "@/components/cafe/CafeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cafes } from "@/data/cafes";

const Explore = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const [filters, setFilters] = useState({
    hasWifi: false,
    hasVegan: false,
    priceRange: [] as number[],
    ambience: [] as string[],
  });

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

  const filteredCafes = useMemo(() => {
    let result = [...cafes];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (cafe) =>
          cafe.name.toLowerCase().includes(query) ||
          cafe.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // WiFi filter
    if (filters.hasWifi) {
      result = result.filter((cafe) => cafe.hasWifi);
    }

    // Vegan filter
    if (filters.hasVegan) {
      result = result.filter((cafe) => cafe.hasVeganOptions);
    }

    // Price range filter
    if (filters.priceRange.length > 0) {
      result = result.filter((cafe) => filters.priceRange.includes(cafe.priceRange));
    }

    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "distance") {
      result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    } else if (sortBy === "reviews") {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result.map((cafe) => ({
      ...cafe,
      isFavorite: favorites.has(cafe.id),
    }));
  }, [searchQuery, filters, sortBy, favorites]);

  const activeFiltersCount = [
    filters.hasWifi,
    filters.hasVegan,
    filters.priceRange.length > 0,
    filters.ambience.length > 0,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({
      hasWifi: false,
      hasVegan: false,
      priceRange: [],
      ambience: [],
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-cream/30 border-b border-border py-6">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Inputs */}
              <div className="flex flex-1 gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search cafés..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-xl"
                  />
                </div>
                <div className="relative flex-1 hidden sm:block">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 rounded-xl"
                  />
                </div>
              </div>

              {/* Filter & Sort */}
              <div className="flex gap-3">
                <Button
                  variant={showFilters ? "default" : "outline"}
                  className="h-12 rounded-xl"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-accent text-accent-foreground">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] h-12 rounded-xl">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Best Rated</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                    <SelectItem value="reviews">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 p-4 bg-card rounded-2xl border border-border animate-fade-in">
                <div className="flex flex-wrap gap-6">
                  {/* Amenities */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Amenities</h4>
                    <div className="flex flex-wrap gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={filters.hasWifi}
                          onCheckedChange={(checked) =>
                            setFilters({ ...filters, hasWifi: checked as boolean })
                          }
                        />
                        <Wifi className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">WiFi</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={filters.hasVegan}
                          onCheckedChange={(checked) =>
                            setFilters({ ...filters, hasVegan: checked as boolean })
                          }
                        />
                        <Leaf className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Vegan Options</span>
                      </label>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Price Range</h4>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((price) => (
                        <Button
                          key={price}
                          variant={filters.priceRange.includes(price) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const newRange = filters.priceRange.includes(price)
                              ? filters.priceRange.filter((p) => p !== price)
                              : [...filters.priceRange, price];
                            setFilters({ ...filters, priceRange: newRange });
                          }}
                        >
                          {"$".repeat(price)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {activeFiltersCount > 0 && (
                    <div className="flex items-end">
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <X className="h-4 w-4 mr-1" />
                        Clear all
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">{filteredCafes.length}</span> cafés found
              </p>
            </div>

            {filteredCafes.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCafes.map((cafe, index) => (
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
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">No cafés found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
