import { Link } from "react-router-dom";
import { Phone, MapPin, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="شعار الجمعية الخيرية بمعنيا" 
                className="w-12 h-12 object-contain bg-background rounded-full p-1"
              />
              <div>
                <h3 className="font-bold">الجمعية الخيرية بمعنيا</h3>
                <p className="text-sm opacity-80">مشهرة برقم ٢٢٨٧ منذ ٢٠١٦</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              نعمل على دعم الأيتام والمرضى والأسر المحتاجة من خلال مشاريع خيرية مستدامة وموثوقة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">الرئيسية</Link></li>
              <li><Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">عن الجمعية</Link></li>
              <li><Link to="/projects" className="opacity-80 hover:opacity-100 transition-opacity">مشاريعنا</Link></li>
              <li><Link to="/donate" className="opacity-80 hover:opacity-100 transition-opacity">تبرع الآن</Link></li>
              <li><Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:01096731819" className="opacity-80 hover:opacity-100 transition-opacity">01096731819</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="opacity-80">معنيا - المنيا - مصر</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="opacity-80">info@charity-monya.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>© {new Date().getFullYear()} الجمعية الخيرية بمعنيا - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
