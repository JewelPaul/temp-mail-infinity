import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Articles = () => {
  const articles = [
    {
      id: "temporary-email-privacy-security",
      title: "The Importance of Temporary Email for Privacy and Security",
      description: "Learn how temporary email addresses protect your personal information and maintain your online privacy in an increasingly connected world.",
      author: "BravoMail Security Team",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Privacy",
      excerpt: "In today's digital landscape, protecting your personal email address is more crucial than ever. Discover why temporary email is essential for maintaining your privacy and security online."
    },
    {
      id: "prevent-spam-phishing",
      title: "How Disposable Email Helps Prevent Spam and Phishing",
      description: "Understand the mechanisms behind spam and phishing attacks, and learn how disposable email addresses serve as your first line of defense.",
      author: "BravoMail Security Team", 
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Security",
      excerpt: "Spam and phishing attacks are becoming increasingly sophisticated. Learn how temporary email addresses can protect you from these threats and keep your inbox clean."
    },
    {
      id: "digital-safety-best-practices",
      title: "Best Practices for Digital Safety and Using Temporary Email Responsibly",
      description: "A comprehensive guide to digital safety practices and how to effectively use temporary email services while maintaining responsible online behavior.",
      author: "BravoMail Security Team",
      date: "2024-01-05", 
      readTime: "8 min read",
      category: "Best Practices",
      excerpt: "Maximize your digital safety with proven best practices for temporary email usage. Learn when and how to use disposable email addresses effectively."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="text-center py-16 sm:py-20">
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Privacy & Security <span className="bg-gradient-hero bg-clip-text text-transparent">Articles</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay informed about digital privacy, email security, and best practices for protecting your online identity.
              Learn from experts about the importance of temporary email services.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="bg-gradient-card border-border/20 shadow-intense hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight hover:text-primary transition-colors">
                    <Link to={`/articles/${article.id}`}>
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <Link 
                    to={`/articles/${article.id}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16 bg-gradient-card border border-border/20 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Protect Your Privacy Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to start protecting your privacy? Generate a secure temporary email address instantly.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center px-8 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:shadow-glow transition-all duration-300"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;