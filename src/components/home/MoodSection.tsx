import { Link } from "react-router-dom";
import { Laptop, Heart, Users, Coffee, Sparkles, BookOpen } from "lucide-react";

const moods = [
  {
    icon: Laptop,
    label: "Work Mode",
    description: "Quiet spots with fast WiFi",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    query: "work",
  },
  {
    icon: Heart,
    label: "Date Night",
    description: "Romantic, intimate vibes",
    color: "bg-rose-50 text-rose-600 border-rose-100",
    query: "romantic",
  },
  {
    icon: Users,
    label: "Group Hangout",
    description: "Spacious and lively",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    query: "group",
  },
  {
    icon: Coffee,
    label: "Coffee Lover",
    description: "Specialty beans & expert baristas",
    color: "bg-orange-50 text-orange-600 border-orange-100",
    query: "specialty",
  },
  {
    icon: Sparkles,
    label: "Treat Yourself",
    description: "Pastries & sweet indulgences",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    query: "pastries",
  },
  {
    icon: BookOpen,
    label: "Study Session",
    description: "Quiet corners for focus",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    query: "study",
  },
];

const MoodSection = () => {
  return (
    <section className="py-16 md:py-24 bg-cream/30">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            What's Your Café Mood?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Tell us how you're feeling and we'll find the perfect spot for you.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {moods.map((mood, index) => (
            <Link
              key={mood.label}
              to={`/explore?mood=${mood.query}`}
              className="group p-6 rounded-2xl bg-card border border-transparent hover:border-primary/20 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl border ${mood.color} transition-transform group-hover:scale-110`}>
                  <mood.icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {mood.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{mood.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoodSection;
