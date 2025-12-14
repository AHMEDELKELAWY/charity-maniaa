import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, BookOpen, Stethoscope, Utensils, Building } from "lucide-react";

const projects = [
  {
    icon: Users,
    title: "كفالة الأيتام",
    description: "رعاية شاملة للأيتام تشمل التعليم والصحة والغذاء",
  },
  {
    icon: Stethoscope,
    title: "علاج المرضى",
    description: "توفير العلاج والأدوية للمرضى غير القادرين",
  },
  {
    icon: BookOpen,
    title: "تحفيظ القرآن",
    description: "تعليم القرآن الكريم للأطفال والشباب",
  },
  {
    icon: Utensils,
    title: "إطعام الفقراء",
    description: "توزيع وجبات غذائية على الأسر المحتاجة",
  },
  {
    icon: Building,
    title: "بناء المعاهد",
    description: "المساهمة في بناء المعاهد الأزهرية",
  },
  {
    icon: Heart,
    title: "صدقة جارية",
    description: "مشاريع ذات أثر مستمر ودائم",
  },
];

const stats = [
  { value: "500+", label: "يتيم مكفول" },
  { value: "1000+", label: "أسرة مستفيدة" },
  { value: "50+", label: "مشروع خيري" },
  { value: "10+", label: "سنوات من العطاء" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Heart className="w-4 h-4" />
              <span>معاً نصنع الفرق</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              الجمعية الخيرية
              <span className="text-primary"> بمعنيا</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
              تبرعاتكم تصل إلى الأيتام والمرضى والأسر المحتاجة من خلال مشاريع خيرية موثوقة ومستدامة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="lg" className="text-lg px-8 shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/donate">تبرع الآن</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/projects">تصفح المشاريع</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">مشاريعنا الخيرية</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نقدم مجموعة متنوعة من المشاريع الخيرية لدعم المحتاجين في مختلف المجالات
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <project.icon className="w-7 h-7 text-accent-foreground group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/projects">عرض جميع المشاريع</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              كن سبباً في الخير
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              تبرعك قد يكون شفاءً لمريض، تعليماً لطفل، سترًا لأسرة محتاجة، أو صدقة جارية تدوم
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/donate">تبرع الآن</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <a href="tel:01096731819">اتصل بنا: 01096731819</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
