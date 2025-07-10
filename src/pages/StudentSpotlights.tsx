
import Navigation from '../components/Navigation';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import { Star, Award, Users, Heart, MessageCircle, Share2, Instagram, Twitter, Globe } from 'lucide-react';

const StudentSpotlights = () => {
  const spotlights = [
    {
      id: 1,
      name: "Emma Chen",
      title: "Fashion Design Student",
      school: "Parsons School of Design",
      specialty: "Sustainable Fashion",
      bio: "Passionate about creating eco-friendly fashion that doesn't compromise on style. Currently working on a zero-waste collection.",
      achievements: ["CFDA Scholar", "Sustainability Award 2024"],
      stats: { followers: 12500, likes: 8900, posts: 156 },
      gradient: "from-accent to-secondary",
      social: { instagram: "@emmachen_design", twitter: "@emmachen", website: "emmachen.design" }
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "Fashion Marketing Student",
      school: "Fashion Institute of Technology",
      specialty: "Digital Fashion Marketing",
      bio: "Combining traditional fashion knowledge with cutting-edge digital marketing strategies to help brands reach Gen Z consumers.",
      achievements: ["Digital Innovation Award", "Top Marketing Campaign 2024"],
      stats: { followers: 9800, likes: 6700, posts: 89 },
      gradient: "from-primary/30 to-accent",
      social: { instagram: "@marcus_fashion", twitter: "@marcusj_fashion", website: "marcusjohnson.co" }
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      title: "Textile Design Student",
      school: "Central Saint Martins",
      specialty: "Innovative Textiles",
      bio: "Exploring the intersection of technology and textiles, creating smart fabrics that adapt to environmental conditions.",
      achievements: ["Innovation Grant Winner", "Textile Excellence Award"],
      stats: { followers: 15200, likes: 11300, posts: 203 },
      gradient: "from-secondary to-primary/20",
      social: { instagram: "@sofia_textiles", twitter: "@sofia_design", website: "sofiarodriguez.art" }
    },
    {
      id: 4,
      name: "David Kim",
      title: "Fashion Photography Student",
      school: "School of Visual Arts",
      specialty: "Editorial Photography",
      bio: "Capturing the essence of fashion through innovative photography techniques and storytelling.",
      achievements: ["Young Photographer Award", "Editorial Excellence 2024"],
      stats: { followers: 18700, likes: 14200, posts: 127 },
      gradient: "from-primary/40 to-secondary",
      social: { instagram: "@davidkim_photo", twitter: "@david_captures", website: "davidkim.photo" }
    }
  ];

  const categories = [
    { name: "Design", count: 45, icon: Award },
    { name: "Marketing", count: 28, icon: Users },
    { name: "Photography", count: 32, icon: Star },
    { name: "Styling", count: 19, icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero
        title="Student Spotlights"
        description="Celebrating the next generation of fashion innovators and their creative journeys"
        className="bg-gradient-to-br from-background to-card/50"
      />

      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Stats Section */}
          <section className="mb-16 animate-fade-in">
            <div className="grid md:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.name}
                    className="bg-card p-6 rounded-xl border border-border text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                      {category.count}
                    </h3>
                    <p className="text-muted-foreground">{category.name} Students</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Featured Students */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Featured Student Spotlights
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {spotlights.map((student, index) => (
                <article
                  key={student.id}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`h-48 bg-gradient-to-br ${student.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                        {student.name}
                      </h3>
                      <p className="text-foreground/80 font-medium">{student.title}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full">
                        <span className="text-sm font-medium">Featured</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-primary font-medium mb-1">{student.school}</p>
                      <p className="text-muted-foreground text-sm">Specialty: {student.specialty}</p>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {student.bio}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-foreground mb-2">Achievements</h4>
                      <div className="flex flex-wrap gap-2">
                        {student.achievements.map((achievement, idx) => (
                          <span
                            key={idx}
                            className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{student.stats.followers.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Heart className="w-4 h-4" />
                          <span>{student.stats.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MessageCircle className="w-4 h-4" />
                          <span>{student.stats.posts}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <a
                          href={`https://instagram.com/${student.social.instagram.replace('@', '')}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a
                          href={`https://twitter.com/${student.social.twitter.replace('@', '')}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                        <a
                          href={`https://${student.social.website}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      </div>
                      <button className="text-primary hover:text-primary/80 transition-colors hover:scale-110 transform">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Application CTA */}
          <section className="text-center animate-fade-in">
            <div className="bg-card p-8 rounded-xl border border-border">
              <Star className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Want to be Featured?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Submit your work and story to be considered for our Student Spotlight series. 
                Share your creative journey with our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg">
                  Submit Your Work
                </button>
                <button className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentSpotlights;
