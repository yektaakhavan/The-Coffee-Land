# گزارش کار: تست، امنیت و پرفورمنس — پروژه Coffee Land

این گزارش خلاصه‌ی تمام تغییراتی‌ست که روی پروژه اعمال شد. برای هر بخش: **چه چالشی بود، چیکار شد، چرا مهمه** — همون فرمولی که برای توضیح نمونه‌کار در رزومه لازمه.

---

## ۱. تست‌نویسی (Testing)

### وضعیت قبل
پروژه هیچ تستی نداشت — نه Unit test، نه Component test.

### کاری که انجام شد
- نصب و پیکربندی **Vitest** + **React Testing Library** + **jsdom** (سازگار با Vite، بدون نیاز به کانفیگ اضافه مثل Jest)
- نوشتن **۲۶ تست** در ۵ فایل:

| فایل تست | تعداد تست | چی رو پوشش می‌ده |
|---|---|---|
| `calculateFinalPrice.test.js` | ۸ | محاسبه قیمت نهایی، مرزهای تخفیف (منفی، بالای ۱۰۰٪)، ورودی نامعتبر |
| `formatPrice.test.js` | ۴ | فرمت اعداد فارسی، عدد صفر، ورودی رشته‌ای |
| `normalizeOrder.test.js` | ۵ | یکسان‌سازی دو شکل متفاوت سفارش (چک‌اوت واقعی / دموی ادمین) |
| `hashPassword.test.js` | ۴ | خروجی هش SHA-256، قطعیت (deterministic بودن)، تمایز پسوردهای مختلف |
| `ProductCard.test.jsx` | ۵ | نمایش قیمت/تخفیف، بج ناموجود، لینک صحیح، lazy loading تصویر |

### چرا مهمه
تست‌ها فقط برای «درست بودن» نیستن — موقع نوشتنشون **دو مشکل واقعی** کشف شد که در بخش امنیت توضیح داده شده. این نشون می‌ده تست‌نویسی صرفاً یه چک‌لیست نیست، بلکه ابزار کشف باگه.

**جمله برای رزومه:**
> «برای منطق قیمت‌گذاری و نرمال‌سازی سفارش، تست واحد نوشتم که حین کار یک باگ امنیتی در محاسبه تخفیف رو هم آشکار کرد.»

---

## ۲. امنیت (Security)

### مشکل ۱: تخفیف منفی قیمت رو افزایش می‌داد
**قبل:** تابع `calculateFinalPrice` هیچ اعتبارسنجی نداشت. اگه یه جای کد (مثلاً به‌خاطر باگ یا دستکاری داده در localStorage) `discountPercent` منفی بشه، قیمت به‌جای کم شدن **زیاد** می‌شد.

**بعد:** ورودی‌ها clamp شدن:
```js
const safeDiscount = Math.min(100, Math.max(0, Number(discountPercent) || 0));
```
حالا تخفیف همیشه بین ۰ تا ۱۰۰ محدود می‌مونه و ورودی نامعتبر (`NaN`) هم به‌جای کرش کردن، صفر در نظر گرفته می‌شه.

**جمله برای رزومه:**
> «در بررسی منطق تخفیف، متوجه شدم مقدار منفی باعث افزایش قیمت به‌جای کاهش می‌شه؛ با اعتبارسنجی و clamp کردن ورودی این مشکل رو برطرف کردم.»

### مشکل ۲: پسورد به‌صورت متن ساده (plain text) در localStorage ذخیره می‌شد
**قبل:** توی `SignUpPage.jsx` و `SignInPage.jsx`، پسورد کاربر عیناً همون چیزی که تایپ می‌کرد، داخل `localStorage` ذخیره و مقایسه می‌شد — یعنی هرکسی به DevTools مرورگر دسترسی داشت، پسورد همه کاربرا رو می‌دید.

**بعد:** یه تابع `hashPassword.js` با **Web Crypto API** (بومی مرورگر، بدون نیاز به پکیج اضافه) ساختم که پسورد رو با **SHA-256** هش می‌کنه. الان:
- موقع ثبت‌نام، هش پسورد ذخیره می‌شه نه خود پسورد
- موقع ورود، پسورد وارد‌شده هش شده و با هش ذخیره‌شده مقایسه می‌شه

**نکته صادقانه (این رو حتماً توی مصاحبه بگو، نشون‌دهنده درک عمیقته):**
چون این پروژه بک‌اند واقعی نداره، این هش کردن **جایگزین کامل امنیت واقعی نیست** — چون:
- هیچ salt سمت سروری وجود نداره
- همه‌چیز روی خود مرورگر کاربره؛ کسی که به همون دستگاه دسترسی داشته باشه بازم می‌تونه هش رو ببینه

این کار صرفاً یه **گام درست در جهت درست**ه: به‌جای متن ساده، حداقل هش ذخیره می‌شه، و الگوی صحیح (هیچ‌وقت پسورد خام رو ذخیره/مقایسه نکن) پیاده‌سازی و تمرین شده. توی مصاحبه گفتنِ همین محدودیت، خیلی بهتر از ادعای «امنش کردم» جواب می‌ده.

**جمله برای رزومه:**
> «چون پروژه بک‌اند واقعی نداشت، پسوردها رو به‌جای متن ساده به‌صورت هش SHA-256 ذخیره کردم و محدودیت‌های این روش (نبود salt/سرور) رو مستند کردم — آماده برای جایگزینی با bcrypt سمت سرور در آینده.»

---

## ۳. پرفورمنس (Performance)

### وضعیت قبل
- Code splitting بر اساس route از قبل با `React.lazy` پیاده‌سازی شده بود (این خودش نکته مثبتیه که می‌تونی توی رزومه بگی)
- ولی تصاویر محصولات (که بعضی‌هاشون ۱۵۰-۳۴۰ کیلوبایت بودن) بدون `loading="lazy"` رندر می‌شدن — یعنی حتی تصاویر خارج از دید کاربر هم فوراً دانلود می‌شدن
- `ProductCard` (که توی لیست‌های طولانی محصولات بارها رندر می‌شه) memoize نشده بود

### کاری که انجام شد
1. اضافه کردن `loading="lazy"` و `decoding="async"` به تصاویر در `ProductCard.jsx` و `CartItem.jsx`
2. Wrap کردن `ProductCard` با `React.memo` تا وقتی props تغییر نکرده، دوباره رندر نشه

### چرا مهمه
- `loading="lazy"` باعث می‌شه مرورگر فقط تصاویری که نزدیک viewport هستن رو دانلود کنه — روی صفحه فروشگاه با ده‌ها محصول، این تفاوت محسوسیه
- `React.memo` روی کامپوننتی که توی یه لیست (map) رندر می‌شه، از رندر اضافه جلوگیری می‌کنه وقتی مثلاً فقط یه آیتم سبد خرید تغییر می‌کنه ولی کل لیست محصولات دوباره رندر نمی‌شن

**جمله برای رزومه:**
> «تصاویر محصولات رو با native lazy loading بهینه کردم و کامپوننت ProductCard رو با React.memo از رندرهای غیرضروری توی لیست محافظت کردم.»

**قدم بعدی (اگه وقت داشتی):** تصاویر بزرگ (`coffee-time.png` ۲۳۶KB و چندتای دیگه) رو با ابزاری مثل Squoosh به WebP تبدیل و فشرده کن؛ و یه بار Lighthouse رو قبل/بعد اجرا کن تا عدد واقعی بهبود رو داشته باشی.

---

## فایل‌های تغییریافته

```
تغییر یافته:
  src/utils/calculateFinalPrice.js       (clamp کردن تخفیف)
  src/utils/calculateFinalPrice.test.js  (تست‌های جدید مرزی)
  src/pages/auth/SignUpPage.jsx          (هش کردن پسورد موقع ثبت‌نام)
  src/pages/auth/SignInPage.jsx          (مقایسه با پسورد هش‌شده)
  src/components/shop/ProductCard.jsx    (lazy loading + React.memo)
  src/components/shop/CartItem.jsx       (lazy loading تصویر)
  package.json / package-lock.json       (dependency های تست)
  vite.config.js                         (تنظیمات Vitest)

جدید:
  src/utils/hashPassword.js
  src/utils/hashPassword.test.js
  src/utils/formatPrice.test.js
  src/utils/normalizeOrder.test.js
  src/components/shop/ProductCard.test.jsx
  src/test/setup.js
```

همه‌ی ۲۶ تست پاس شدن و `npm run build` بدون خطا اجرا شد.

---

## پیشنهاد کامیت‌های گیت‌هاب

پیشنهاد می‌کنم به‌جای یه کامیت بزرگ، ۳ کامیت جدا بزنی — هیستوری تمیزتر و برای بازبینی/رزومه بهتره:

```
1) test: set up Vitest and add unit/component tests

   - Configure Vitest + jsdom + Testing Library
   - Add tests for calculateFinalPrice, formatPrice, normalizeOrder
   - Add component test for ProductCard

2) fix(security): clamp discount and hash passwords instead of storing plain text

   - Clamp discountPercent to [0,100] in calculateFinalPrice (previously
     a negative value silently increased the price)
   - Hash passwords with SHA-256 (Web Crypto API) before storing/comparing
     in SignUpPage and SignInPage instead of storing plain text
   - Note: client-only hashing is a mitigation, not a substitute for
     server-side salted hashing — documented in hashPassword.js

3) perf: lazy-load product images and memoize ProductCard

   - Add loading="lazy" and decoding="async" to product images
     in ProductCard and CartItem
   - Wrap ProductCard in React.memo to avoid re-rendering unchanged
     cards inside product lists
```
