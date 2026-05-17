import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../../core/i18n';

export function TermsOfServiceScreen() {
  const [, setLocation] = useLocation();
  const { t, isRTL } = useTranslation();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setLocation(-1)}
            className="p-2 hover:bg-secondary rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">شروط الاستخدام</h1>
        </div>

        {/* Content */}
        <div className="bg-card rounded-lg p-6 space-y-6 text-text-secondary">
          <div>
            <p className="text-sm text-text-tertiary mb-4">آخر تحديث: 2024</p>
            <p className="mb-4">
              مرحباً بك في تطبيق Night Out Algeria. باستخدامك للتطبيق، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق، يُرجى التوقف عن الاستخدام فوراً.
            </p>
          </div>

          <Section title="1. وصف الخدمة">
            <p>
              يقدم التطبيق منصة لاكتشاف الأماكن الترفيهية والمرخصة في الجزائر (حانات، نوادي، مطاعم). التطبيق يعمل كوسيط معلوماتي ولا يبيع خدمات مباشرة.
            </p>
          </Section>

          <Section title="2. شروط الأهلية">
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>يجب أن يكون عمرك 18 سنة أو أكثر لاستخدام التطبيق.</li>
              <li>باستخدامك التطبيق، تؤكد أنك تبلغ السن القانونية للدخول للأماكن المذكورة.</li>
            </ul>
          </Section>

          <Section title="3. سلوك المستخدم والمحتوى">
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>تتحمل المسؤولية الكاملة عن أي محتوى تضيفه (تقييمات، صور، تعليقات).</li>
              <li>يُمنع نشر محتوى مسيء، مخِل بالآداب، أو مخالف للقوانين الجزائرية.</li>
              <li>نحتفظ بالحق في حذف أي محتوى مخالف أو تعليق الحسابات المخالفة.</li>
              <li>بمنحك المحتوى، تمنحنا ترخيصاً لاستخدامه وعرضه داخل التطبيق.</li>
            </ul>
          </Section>

          <Section title="4. دقة المعلومات وإخلاء المسؤولية">
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>المعلومات (ساعات العمل، الأسعار) تعتمد على بيانات من المستخدمين وقد تتغير.</li>
              <li>لا نضمن دقة أو اكتمال المعلومات، ولا نتحمل مسؤولية أي ضرر ينتج عن زيارتك لأي مكان مدرج.</li>
              <li>ننصحك بالتحقق من المؤسسة مباشرة قبل الزيارة.</li>
            </ul>
          </Section>

          <Section title="5. الملكية الفكرية">
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>جميع حقوق التطبيق (شعار، كود، تصميم) مملوكة لـ Night Out Algeria.</li>
              <li>يُمنع نسخ أو استخدام أي جزء من التطبيق لأغراض تجارية دون إذن.</li>
            </ul>
          </Section>

          <Section title="6. الحسابات والأمان">
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>أنت مسؤول عن سرية بيانات الدخول وعن جميع الأنشطة في حسابك.</li>
              <li>أبلغنا فوراً عن أي استخدام غير مصرح به.</li>
            </ul>
          </Section>

          <Section title="7. إنهاء الخدمة">
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>يمكنك حذف حسابك في أي وقت عبر الإعدادات.</li>
              <li>يحق لنا تعليق أو إنهاء حسابك إذا خالفت هذه الشروط.</li>
            </ul>
          </Section>

          <Section title="8. حدود المسؤولية">
            <p>
              يُقدم التطبيق "كما هو". لا نتحمل مسؤولية أضرار غير مباشرة أو فقدان بيانات أو أرباح نتيجة استخدام التطبيق.
            </p>
          </Section>

          <Section title="9. القانون والاختصاص القضائي">
            <p>
              تخضع هذه الشروط للقوانين الجزائرية. تختص محاكم ولاية الجزائر بالنظر في أي نزاع ينشأ عن هذه الشروط.
            </p>
          </Section>

          <Section title="10. تعديل الشروط">
            <p>
              نحتفظ بالحق في تعديل الشروط. استمرارك في الاستخدام بعد التعديل يُعتبر موافقة منك.
            </p>
          </Section>

          <Section title="11. الاتصال">
            <div className="space-y-2 text-sm">
              <p><strong>البريد:</strong> support@nightoutalgeria.com</p>
              <p><strong>العنوان:</strong> الجزائر</p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-text mb-3">{title}</h2>
      <div className="text-text-secondary">{children}</div>
    </div>
  );
}
