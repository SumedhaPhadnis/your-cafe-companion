import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Heart,
  Navigation,
  Wifi,
  Leaf,
  Share2,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { cafes, reviews } from "@/data/cafes";

const CafeDetails = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const cafe = cafes.find((c) => c.id === id);

  if (!cafe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-2">Café not found</h1>
            <p className="text-muted-foreground mb-4">
              The café you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/explore">Browse Cafés</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const priceLabel = "$".repeat(cafe.priceRange);
  const cafeReviews = reviews.filter((r) => r.cafeId === cafe.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Image */}
        <section className="relative h-64 md:h-96 bg-cream overflow-hidden">
          <img
            src={cafe.image}
            alt={cafe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
          
          {/* Back Button */}
          <Link
            to="/explore"
            className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background ${
                isFavorite ? "text-destructive" : ""
              }`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Café Name */}
          <div className="absolute bottom-6 left-6 right-6">
            <Badge className="mb-2 bg-background/80 backdrop-blur-sm text-foreground">
              {priceLabel}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              {cafe.name}
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="container px-4 md:px-6 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{cafe.rating}</span>
                  <span className="text-muted-foreground">({cafe.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{cafe.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{cafe.openingHours}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold">About</h2>
                <p className="text-muted-foreground leading-relaxed">{cafe.description}</p>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold">Amenities & Vibes</h2>
                <div className="flex flex-wrap gap-2">
                  {cafe.hasWifi && (
                    <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
                      <Wifi className="h-4 w-4" />
                      Free WiFi
                    </Badge>
                  )}
                  {cafe.hasVeganOptions && (
                    <Badge variant="secondary" className="gap-1.5 py-1.5 px-3 bg-sage-light text-sage">
                      <Leaf className="h-4 w-4" />
                      Vegan Options
                    </Badge>
                  )}
                  {cafe.ambience.map((tag) => (
                    <Badge key={tag} variant="outline" className="py-1.5 px-3">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Menu Highlights */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold">Menu Highlights</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {cafe.menuHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        ☕
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold">Reviews</h2>
                  <span className="text-sm text-muted-foreground">
                    {cafeReviews.length} reviews
                  </span>
                </div>

                {/* Add Review */}
                <div className="p-4 rounded-2xl bg-secondary/30 space-y-4">
                  <h3 className="font-medium">Leave a Review</h3>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setSelectedRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= selectedRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Share your experience..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="resize-none"
                  />
                  <Button>Submit Review</Button>
                </div>

                {/* Review List */}
                <div className="space-y-4">
                  {cafeReviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 rounded-2xl bg-card border border-border"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={review.userAvatar} />
                          <AvatarFallback>{review.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{review.userName}</span>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="sticky top-24 space-y-4">
                {/* Location Card */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                  <h3 className="font-display font-semibold mb-4">Location</h3>
                  <p className="text-muted-foreground text-sm mb-4">{cafe.address}</p>
                  <div className="aspect-video rounded-xl bg-muted mb-4 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <MapPin className="h-8 w-8" />
                    </div>
                  </div>
                  <Button className="w-full" variant="hero">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>

                {/* Hours Card */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                  <h3 className="font-display font-semibold mb-4">Opening Hours</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-accent font-medium">Open Now</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    {cafe.openingHours}
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3">
                  <Button
                    variant={isFavorite ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CafeDetails;
