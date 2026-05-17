import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../../core/i18n';

export function PrivacyPolicyScreen() {
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
          <h1 className="text-2xl font-bold">سياسة الخصوصية</h1>
        </div>

        {/* Content */}
        <div className="bg-card rounded-lg p-6 space-y-6 text-text-secondary">
          <div>
            <p className="text-sm text-text-tertiary mb-4">آخر تحديث: 2024</p>
            <p className="mb-4">
              مرحباً بك في تطبيق Night Out Algeria. نأخذ خصوصيتك على محمل الجد ونلتزم بحماية بياناتك الشخصية وفقاً للقانون الجزائري رقم 18-07 المتعلق بحماية الأشخاص الطبيعيين في مجال معالجة المعطيات ذات الطابع الشخصي.
            </p>
          </div>

          <Section title="1. البيانات التي نجمعها">
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>بيانات الحساب: الاسم، البريد الإلكتروني، رقم الهاتف (اختياري)، كلمة المرور (مشفرة).</li>
              <li>بيانات الجهاز: نوع الجهاز، نظام التشغيل، عنوان IP.</li>
              <li>بيانات الموقع: تُجمع فقط عند منحك الإذن لتحسين تجربة اكتشاف الأماكن القريبة.</li>
              <li>بيانات الاستخدام: التفاعلات، التقييمات، وتفضيلات الإشعارات.</li>
              <li>المحتوى المضاف: التقييمات، التعليقات، والصور التي تشاركها.</li>
            </ul>
          </Section>

          <Section title="2. كيف نستخدم بياناتك">
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>لتشغيل التطبيق وتحسين تجربة المستخدم.</li>
              <li>للتحقق من الحسابات ومنع الأنشطة المخالفة.</li>
              <li>لتحليل إحصائي غير مُعرّف لتطوير الخدمات.</li>
              <li>للرد على استفساراتك ودعمك الفني.</li>
            </ul>
          </Section>

          <Section title="3. مشاركة البيانات">
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>لا نبيع بياناتك الشخصية لأي طرف.</li>
              <li>قد نشارك بيانات محدودة مع مزودي خدمات موثوقين (مثل Firebase) بموجب اتفاقيات سرية.</li>
              <li>قد نكشف عن بياناتك إذا طلبت ذلك جهة قضائية مختصة وفقاً للقانون.</li>
            </ul>
          </Section>

          <Section title="4. حماية البيانات">
            <p>
              نطبق تدابير تقنية (تشفير، صلاحيات وصول محدودة) لحماية معلوماتك. مع ذلك، ننصحك بحماية كلمة مرورك وعدم مشاركتها.
            </p>
          </Section>

          <Section title="5. حقوقك كمستخدم">
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>الحق في الاطلاع على بياناتك وتصحيحها أو حذفها.</li>
              <li>الحق في الاعتراض على المعالجة لأغراض تسويقية.</li>
              <li>الحق في نقل بياناتك بصيغة قابلة للقراءة.</li>
            </ul>
            <p className="mt-3 text-sm">
              لممارسة هذه الحقوق، تواصل معنا عبر: privacy@nightoutalgeria.com
            </p>
          </Section>

          <Section title="6. ملفات الارتباط (Cookies)">
            <p>
              نستخدم تقنيات تتبع محدودة لتحسين الأداء وعرض إعلانات ذات صلة. يمكنك إدارة التفضيلات من إعدادات جهازك.
            </p>
          </Section>

          <Section title="7. الاحتفاظ بالبيانات">
            <p>
              نحتفظ ببياناتك طالما أن حسابك نشط. عند الحذف، سيتم إزالة بياناتك خلال 60 يوماً ما لم يقتضِ القانون غير ذلك.
            </p>
          </Section>

          <Section title="8. تحديثات السياسة">
            <p>
              قد نعدّل هذه السياسة، وسنُعلمك بأي تعديل جوهري عبر التطبيق.
            </p>
          </Section>

          <Section title="9. الاتصال">
            <div className="space-y-2 text-sm">
              <p><strong>البريد:</strong> privacy@nightoutalgeria.com</p>
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
