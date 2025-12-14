const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}

Deno.serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, subject, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, phone, email, subject });

    // Send email using Resend API directly
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "الجمعية الخيرية بمعنيا <onboarding@resend.dev>",
        to: ["elkelawy3@gmail.com"],
        subject: `رسالة جديدة: ${subject}`,
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
              رسالة جديدة من موقع الجمعية
            </h1>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #374151;">بيانات المرسل:</h2>
              <p><strong>الاسم:</strong> ${name}</p>
              <p><strong>رقم الهاتف:</strong> ${phone}</p>
              ${email ? `<p><strong>البريد الإلكتروني:</strong> ${email}</p>` : ''}
              <p><strong>الموضوع:</strong> ${subject}</p>
            </div>
            
            <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="margin-top: 0; color: #374151;">الرسالة:</h2>
              <p style="line-height: 1.8; color: #4b5563;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
              <p>هذه الرسالة مرسلة تلقائياً من موقع الجمعية الخيرية بمعنيا</p>
            </div>
          </div>
        `,
      }),
    });

    const data = await res.json();
    console.log("Email API response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-contact-email function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
