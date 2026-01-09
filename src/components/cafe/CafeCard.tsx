import { Link } from "react-router-dom";
import { Star, MapPin, Heart, Wifi, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cafe } from "@/types/cafe";
import { cn } from "@/lib/utils";

interface CafeCardProps {
  cafe: Cafe;
  onToggleFavorite?: (id: string) => void;
}

const CafeCard = ({ cafe, onToggleFavorite }: CafeCardProps) => {
  const priceLabel = "$".repeat(cafe.priceRange);

  return (
    <Link
      to={`/cafe/${cafe.id}`}
      className="group block rounded-2xl bg-card overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <img
          src={cafe.image}
          alt={cafe.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all",
            cafe.isFavorite && "text-destructive"
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite?.(cafe.id);
          }}
        >
          <Heart className={cn("h-4 w-4", cafe.isFavorite && "fill-current")} />
        </Button>

        {/* Price Badge */}
        <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background">
          {priceLabel}
        </Badge>

        {/* Distance */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-sm text-primary-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{cafe.distance}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {cafe.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{cafe.rating}</span>
            <span className="text-sm text-muted-foreground">({cafe.reviewCount})</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-1">{cafe.address}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {cafe.hasWifi && (
            <Badge variant="secondary" className="text-xs gap-1">
              <Wifi className="h-3 w-3" />
              WiFi
            </Badge>
          )}
          {cafe.hasVeganOptions && (
            <Badge variant="secondary" className="text-xs gap-1 bg-sage-light text-sage">
              <Leaf className="h-3 w-3" />
              Vegan
            </Badge>
          )}
          {cafe.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default CafeCard;
