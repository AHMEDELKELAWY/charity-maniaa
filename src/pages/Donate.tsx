import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Smartphone, Building2, Globe, Heart, Check } from "lucide-react";

const donationSchema = z.object({
  donor_name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  donor_phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  donor_email: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  amount: z.string().min(1, "يرجى إدخال مبلغ التبرع"),
  project_type: z.string().min(1, "يرجى اختيار نوع المشروع"),
  payment_method: z.string().min(1, "يرجى اختيار طريقة الدفع"),
  notes: z.string().optional(),
});

type DonationFormData = z.infer<typeof donationSchema>;

const projectTypes = [
  "كفالة أيتام",
  "كفالة أرامل ومطلقات",
  "صدقة جارية",
  "تحفيظ القرآن",
  "علاج المرضى",
  "إطعام الفقراء",
  "وقف خيري",
  "بناء معهد أزهري",
  "تبرع عام",
];

const paymentMethods = [
  { id: "vodafone", label: "فودافون كاش", icon: Smartphone, details: "01096731819" },
  { id: "bank", label: "تحويل بنكي", icon: Building2, details: "سيتم إرسال البيانات" },
  { id: "paypal", label: "PayPal (للخارج)", icon: Globe, details: "paypal.me/OffersTop" },
];

export default function Donate() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      payment_method: "",
      project_type: "",
    },
  });

  const selectedPayment = watch("payment_method");

  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("donations").insert({
        donor_name: data.donor_name,
        donor_phone: data.donor_phone,
        donor_email: data.donor_email || null,
        amount: parseFloat(data.amount),
        project_type: data.project_type,
        payment_method: data.payment_method,
        notes: data.notes || null,
      });

      if (error) throw error;

      setIsSuccess(true);
      reset();
      toast({
        title: "تم استلام طلب التبرع",
        description: "جزاكم الله خيراً، سنتواصل معكم قريباً لإتمام التبرع",
      });
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="max-w-lg mx-auto text-center">
              <CardContent className="py-12">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">جزاكم الله خيراً</h2>
                <p className="text-muted-foreground mb-6">
                  تم استلام طلب التبرع بنجاح. سنتواصل معكم قريباً لإتمام عملية التبرع.
                </p>
                <Button onClick={() => setIsSuccess(false)}>تبرع آخر</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              <span>تبرعك يصنع الفرق</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">تبرع الآن</h1>
            <p className="text-lg text-muted-foreground">
              ساهم في دعم الأيتام والمرضى والأسر المحتاجة من خلال تبرعك الكريم
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>بيانات التبرع</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="donor_name">الاسم الكريم *</Label>
                        <Input
                          id="donor_name"
                          placeholder="أدخل اسمك"
                          {...register("donor_name")}
                        />
                        {errors.donor_name && (
                          <p className="text-sm text-destructive">{errors.donor_name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="donor_phone">رقم الهاتف *</Label>
                        <Input
                          id="donor_phone"
                          placeholder="01xxxxxxxxx"
                          {...register("donor_phone")}
                        />
                        {errors.donor_phone && (
                          <p className="text-sm text-destructive">{errors.donor_phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="donor_email">البريد الإلكتروني (اختياري)</Label>
                        <Input
                          id="donor_email"
                          type="email"
                          placeholder="example@email.com"
                          {...register("donor_email")}
                        />
                        {errors.donor_email && (
                          <p className="text-sm text-destructive">{errors.donor_email.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">مبلغ التبرع (جنيه) *</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="100"
                          {...register("amount")}
                        />
                        {errors.amount && (
                          <p className="text-sm text-destructive">{errors.amount.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>نوع المشروع *</Label>
                      <Select onValueChange={(value) => setValue("project_type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع المشروع" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.project_type && (
                        <p className="text-sm text-destructive">{errors.project_type.message}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label>طريقة الدفع *</Label>
                      <RadioGroup
                        onValueChange={(value) => setValue("payment_method", value)}
                        className="grid md:grid-cols-3 gap-4"
                      >
                        {paymentMethods.map((method) => (
                          <div key={method.id}>
                            <RadioGroupItem
                              value={method.id}
                              id={method.id}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={method.id}
                              className="flex flex-col items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent hover:border-primary/50"
                            >
                              <method.icon className="w-8 h-8 text-primary" />
                              <span className="font-medium">{method.label}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      {errors.payment_method && (
                        <p className="text-sm text-destructive">{errors.payment_method.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">ملاحظات (اختياري)</Label>
                      <Textarea
                        id="notes"
                        placeholder="أي ملاحظات إضافية..."
                        {...register("notes")}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
                      {isSubmitting ? "جاري الإرسال..." : "إرسال طلب التبرع"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Payment Info Sidebar */}
            <div className="space-y-6">
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    فودافون كاش
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-2">01096731819</p>
                  <p className="text-sm opacity-90">حول المبلغ ثم أرسل لنا إيصال التحويل</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    PayPal (للخارج)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://paypal.me/OffersTop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-bold hover:underline"
                  >
                    paypal.me/OffersTop
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">للتبرعات من خارج مصر</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    التحويل البنكي
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    تواصل معنا للحصول على بيانات الحساب البنكي
                  </p>
                  <a href="tel:01096731819" className="text-primary font-bold hover:underline block mt-2">
                    01096731819
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
