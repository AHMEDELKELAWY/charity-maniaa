import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Shield, Users, Award } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "الإحسان",
    description: "نسعى لتقديم أفضل خدمة للمستفيدين بروح المحبة والعطاء",
  },
  {
    icon: Shield,
    title: "الأمانة",
    description: "نحافظ على أموال المتبرعين ونوصلها للمستحقين بكل شفافية",
  },
  {
    icon: Users,
    title: "التعاون",
    description: "نعمل كفريق واحد مع المتبرعين والمتطوعين لتحقيق أهدافنا",
  },
  {
    icon: Award,
    title: "الإتقان",
    description: "نلتزم بأعلى معايير الجودة في تنفيذ مشاريعنا الخيرية",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">عن الجمعية</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              الجمعية الخيرية بمعنيا تعمل منذ سنوات على خدمة المجتمع ودعم المحتاجين من خلال مشاريع خيرية متنوعة ومستدامة
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">من نحن؟</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  الجمعية الخيرية بمعنيا هي منظمة غير ربحية تأسست بهدف خدمة المجتمع المحلي ودعم الفئات الأكثر احتياجاً في منطقة معنيا والمناطق المجاورة.
                </p>
                <p>
                  نعمل على تقديم الدعم المادي والمعنوي للأيتام والأرامل والمطلقات والأسر الفقيرة، بالإضافة إلى دعم المرضى غير القادرين على تحمل تكاليف العلاج.
                </p>
                <p>
                  كما نسعى لنشر العلم الشرعي من خلال دعم دور تحفيظ القرآن الكريم والمعاهد الأزهرية، إيماناً منا بأهمية التعليم في بناء مجتمع واعٍ ومتماسك.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600"
                alt="أنشطة الجمعية الخيرية"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">رؤيتنا</h3>
                </div>
                <p className="leading-relaxed opacity-90">
                  أن نكون الجمعية الرائدة في العمل الخيري بمنطقة معنيا، ونحقق التكافل الاجتماعي الشامل الذي يضمن حياة كريمة لجميع أفراد المجتمع.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary text-secondary-foreground">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary-foreground/20 flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">رسالتنا</h3>
                </div>
                <p className="leading-relaxed opacity-90">
                  تقديم خدمات خيرية متميزة ومستدامة للمحتاجين، من خلال مشاريع منظمة وشفافة تضمن وصول التبرعات لمستحقيها.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">قيمنا</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نلتزم بمجموعة من القيم التي توجه عملنا وتضمن تحقيق أهدافنا
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
