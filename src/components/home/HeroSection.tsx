import { useState } from "react";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/explore?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-warm py-16 md:py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-cream-dark px-4 py-1.5 text-sm font-medium text-coffee-medium animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-sage animate-pulse" />
            Discover 500+ local cafés
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in [animation-delay:100ms]">
            Find Your Perfect Café,{" "}
            <span className="text-gradient">One Sip at a Time</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto max-w-xl text-lg text-muted-foreground animate-fade-in [animation-delay:200ms]">
            Whether you're looking for a cozy corner to work, a romantic date spot, 
            or the best espresso in town — we've got you covered.
          </p>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="mx-auto max-w-2xl animate-fade-in [animation-delay:300ms]"
          >
            <div className="flex flex-col sm:flex-row gap-3 p-3 bg-card rounded-2xl shadow-card">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search cafés, coffee types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-0 bg-secondary/50 focus-visible:ring-1 rounded-xl"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 border-0 bg-secondary/50 focus-visible:ring-1 rounded-xl"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-in [animation-delay:400ms]">
            <Button variant="secondary" size="sm" className="rounded-full">
              ☕ Best Coffee
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              💻 Work-Friendly
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              🌱 Vegan Options
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              💰 Budget-Friendly
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
