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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MapPin, Mail, Clock, Send, Check } from "lucide-react";
import LocationMap from "@/components/LocationMap";

const contactSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  email: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  subject: z.string().min(3, "الموضوع يجب أن يكون 3 أحرف على الأقل"),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Phone, label: "الهاتف", value: "01096731819", href: "tel:01096731819" },
  { icon: MapPin, label: "العنوان", value: "معنيا - المنيا - مصر" },
  { icon: Mail, label: "البريد", value: "elkelawy3@gmail.com", href: "mailto:elkelawy3@gmail.com" },
  { icon: Clock, label: "أوقات العمل", value: "يومياً من 9 ص - 5 م" },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Save to database
      const { error: dbError } = await supabase.from("contact_messages").insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        subject: data.subject,
        message: data.message,
      });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          subject: data.subject,
          message: data.message,
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        // Don't throw - message was saved, just email failed
      }

      setIsSuccess(true);
      reset();
      toast({
        title: "تم إرسال رسالتك",
        description: "سنتواصل معكم في أقرب وقت",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "حدث خطأ",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">تواصل معنا</h1>
            <p className="text-lg text-muted-foreground">
              نحن سعداء بتواصلكم معنا للاستفسار أو المشاركة في العمل الخيري
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">معلومات التواصل</h2>
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-primary hover:underline">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>أرسل رسالتك</CardTitle>
                </CardHeader>
                <CardContent>
                  {isSuccess ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">تم إرسال رسالتك</h3>
                      <p className="text-muted-foreground mb-4">سنتواصل معكم في أقرب وقت</p>
                      <Button onClick={() => setIsSuccess(false)}>إرسال رسالة أخرى</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">الاسم *</Label>
                          <Input
                            id="name"
                            placeholder="أدخل اسمك"
                            {...register("name")}
                          />
                          {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">رقم الهاتف *</Label>
                          <Input
                            id="phone"
                            placeholder="01xxxxxxxxx"
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">الموضوع *</Label>
                          <Input
                            id="subject"
                            placeholder="موضوع الرسالة"
                            {...register("subject")}
                          />
                          {errors.subject && (
                            <p className="text-sm text-destructive">{errors.subject.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">الرسالة *</Label>
                        <Textarea
                          id="message"
                          placeholder="اكتب رسالتك هنا..."
                          rows={5}
                          {...register("message")}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive">{errors.message.message}</p>
                        )}
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        <Send className="w-4 h-4 ml-2" />
                        {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">موقعنا على الخريطة</h2>
          <LocationMap className="h-[400px] md:h-[500px]" />
        </div>
      </section>
    </Layout>
  );
}
