import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heart, Users, BookOpen, Stethoscope, Utensils, Building, CheckCircle, Phone } from "lucide-react";

const projects = [
  {
    icon: Users,
    title: "كفالة الأيتام",
    description: "كفالة اليتيم تشمل التعليم، الرعاية الصحية، الغذاء، والدعم النفسي، وهي من أعظم أعمال الخير في الإسلام.",
  },
  {
    icon: Stethoscope,
    title: "علاج المرضى",
    description: "توفير العلاج والأدوية والرعاية الطبية للمرضى غير القادرين على تحمل تكاليف العلاج.",
  },
  {
    icon: BookOpen,
    title: "تحفيظ القرآن",
    description: "تعليم القرآن الكريم للأطفال والشباب ودعم حلقات التحفيظ والمعاهد القرآنية.",
  },
  {
    icon: Utensils,
    title: "إطعام الفقراء",
    description: "توزيع وجبات غذائية وسلات غذائية شهرية على الأسر المحتاجة والفقراء.",
  },
  {
    icon: Building,
    title: "بناء المعاهد",
    description: "المساهمة في بناء وتجهيز المعاهد الأزهرية ودور العلم والمساجد.",
  },
  {
    icon: Heart,
    title: "صدقة جارية",
    description: "مشاريع ذات أثر مستمر ودائم كحفر الآبار وبناء المساجد والمدارس.",
  },
];

const whyDonate = [
  "ضمان وصول التبرعات لمستحقيها",
  "مشاريع خيرية مستدامة",
  "إشراف وتنفيذ منظم",
  "أجر مستمر وموثوق",
];

const faqs = [
  {
    question: "ما أفضل أنواع الصدقات؟",
    answer: "أفضل الصدقات ما وافق نية المتبرع واحتياج الناس، ومنها كفالة اليتيم، علاج المريض، إطعام الجائع، والصدقة الجارية كبناء المساجد وحفر الآبار.",
  },
  {
    question: "كيف أتأكد من وصول تبرعي؟",
    answer: "نحرص على التواصل مع المتبرعين وإرسال تقارير دورية عن المشاريع، كما يمكنكم زيارة مقر الجمعية والاطلاع على سجلات التبرعات.",
  },
  {
    question: "هل يمكنني تخصيص تبرعي لمشروع معين؟",
    answer: "نعم، يمكنك اختيار المشروع الذي تريد التبرع له سواء كان كفالة أيتام أو علاج مرضى أو أي مشروع آخر.",
  },
  {
    question: "ما هي طرق التبرع المتاحة؟",
    answer: "يمكنك التبرع عبر فودافون كاش أو التحويل البنكي أو PayPal، أو زيارة مقر الجمعية للتبرع نقداً.",
  },
];

const stats = [
  { value: "500+", label: "يتيم مكفول" },
  { value: "1000+", label: "أسرة مستفيدة" },
  { value: "50+", label: "مشروع خيري" },
  { value: "2016", label: "سنة التأسيس" },
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
              <span>مشهرة برقم ٢٢٨٧ منذ عام ٢٠١٦</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              تبرعك اليوم يصنع أثراً يدوم
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
              من خلال الجمعية الخيرية بمعنيا، تصل تبرعاتكم إلى الأيتام، المرضى، الأسر الفقيرة، وطلاب العلم في صورة مشاريع موثوقة ومستدامة.
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

      {/* Why Donate Section */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              لماذا التبرع عبر الجمعية الخيرية؟
            </h2>
            <p className="text-muted-foreground">
              نحرص على تقديم أفضل الخدمات الخيرية بشفافية وأمانة
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {whyDonate.map((reason, index) => (
              <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-sm">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="font-medium text-foreground">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">مشاريع التبرع المتاحة</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              اختر المشروع المناسب لك وساهم في صنع الفرق في حياة المحتاجين
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
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
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

      {/* How to Donate Section */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              كيف تتبرع؟
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              يمكنك اختيار المشروع المناسب لك والتواصل معنا للتبرع والمشاركة في الخير
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/donate">صفحة التبرع</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="text-lg px-8">
                <a href="tel:01096731819" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>01096731819</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                الأسئلة الشائعة حول التبرع
              </h2>
              <p className="text-muted-foreground">
                إجابات على أكثر الأسئلة شيوعاً حول التبرع والمشاريع الخيرية
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-right text-lg font-medium">
                    <h3>{faq.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              كن سبباً في الخير
            </h2>
            <p className="text-lg opacity-90 mb-8">
              تبرعك قد يكون حياة لإنسان... شفاءً لمريض، تعليماً لطفل، سترًا لأسرة محتاجة، أو صدقة جارية تدوم
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link to="/donate">تبرع الآن</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="tel:01096731819" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>تواصل للتبرع: 01096731819</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
