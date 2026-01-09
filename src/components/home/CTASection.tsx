import { ArrowRight, Coffee, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-12 lg:p-16">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
                Ready to Discover Your New Favorite Café?
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-md">
                Join thousands of coffee lovers who've found their perfect spots with BrewBuddy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="warm" size="xl" asChild>
                  <Link to="/explore">
                    Start Exploring
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="heroOutline"
                  size="xl"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              <div className="text-center p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
                <div className="flex justify-center mb-2">
                  <Coffee className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-2xl font-bold text-primary-foreground">500+</p>
                <p className="text-sm text-primary-foreground/70">Cafés Listed</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
                <div className="flex justify-center mb-2">
                  <Star className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-2xl font-bold text-primary-foreground">12K+</p>
                <p className="text-sm text-primary-foreground/70">Reviews</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-2xl font-bold text-primary-foreground">50K+</p>
                <p className="text-sm text-primary-foreground/70">Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
