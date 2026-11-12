import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, Camera, Check, ChevronLeft,
  AtSign as Instagram, Clock3, FileBadge, Heart, ImagePlus, LayoutDashboard, MapPin,
  Menu, MessageCircle, Phone, Play, Plus, Scissors, ShieldCheck, Sparkles,
  Star, UploadCloud, UserRound, UsersRound, Video, X
} from 'lucide-react';
import './styles.css';

const services = [
  { id: 1, title: 'رنگ و لایت تخصصی', desc: 'ترکیب رنگ اختصاصی متناسب با چهره و سبک شما', price: 'از ۲,۸۰۰,۰۰۰', time: '۱۸۰ دقیقه', icon: Sparkles, tint: 'rose' },
  { id: 2, title: 'میکاپ و گریم', desc: 'میکاپ حرفه‌ای، سبک و ماندگار برای لحظه‌های خاص', price: 'از ۲,۲۰۰,۰۰۰', time: '۹۰ دقیقه', icon: Heart, tint: 'peach' },
  { id: 3, title: 'کوتاهی و استایل', desc: 'فرم‌دهی حرفه‌ای مو با جدیدترین تکنیک‌های روز', price: 'از ۷۵۰,۰۰۰', time: '۶۰ دقیقه', icon: Scissors, tint: 'sand' },
  { id: 4, title: 'خدمات ناخن', desc: 'مانیکور، پدیکور و طراحی ظریف با متریال ممتاز', price: 'از ۵۵۰,۰۰۰', time: '۷۵ دقیقه', icon: Star, tint: 'mauve' },
];

const staff = [
  { name: 'باران محمودی', role: 'مدیر و متخصص رنگ', years: '۱۲ سال تجربه', img: '/assets/hero-hair.jpg' },
  { name: 'نیکی امیری', role: 'میکاپ آرتیست', years: '۸ سال تجربه', img: '/assets/hero-bridal.jpg' },
  { name: 'سارا یوسفی', role: 'متخصص کوتاهی و استایل', years: '۶ سال تجربه', img: '/assets/hero-salon.jpg' },
];

const slides = [
  { image: '/assets/hero-salon.jpg', eyebrow: 'به دنیای زیبایی باران خوش آمدید', title: <>زیبایی تو،<br/><em>امضای ماست</em></>, text: 'تجربه‌ای آرام، حرفه‌ای و شخصی‌سازی‌شده؛ جایی که هر جزئیات برای درخشش تو طراحی شده است.' },
  { image: '/assets/hero-hair.jpg', eyebrow: 'سلامت و درخشش موهای شما', title: <>هنرِ رنگ،<br/><em>ظرافتِ اجرا</em></>, text: 'از مشاوره رنگ تا اجرای نهایی، همراهت هستیم تا بهترین نسخه خودت را پیدا کنی.' },
  { image: '/assets/hero-bridal.jpg', eyebrow: 'برای خاص‌ترین روز زندگی', title: <>درخششِ ماندگار،<br/><em>حسِ خوب تو</em></>, text: 'میکاپ و استایل اختصاصی عروس با تست کامل، برنامه‌ریزی دقیق و آرامش خیال.' },
];

function Logo({ compact = false }) {
  return <button className={`brand ${compact ? 'compact' : ''}`} onClick={() => scrollToId('home')} aria-label="خانه">
    <img src="/assets/baran-logo.png" alt="لوگوی سالن زیبایی باران" />
    {!compact && <span><strong>سالن زیبایی باران</strong><small>BEAUTY SALON</small></span>}
  </button>;
}

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

function Header({ onBooking, onAdmin }) {
  const [open, setOpen] = useState(false);
  const nav = [['services','خدمات'],['about','درباره باران'],['team','تیم ما'],['credentials','مدارک و افتخارات'],['contact','تماس با ما']];
  return <header className="header">
    <div className="top-strip"><span>شنبه تا پنجشنبه، ۹ صبح تا ۸ شب</span><span><Phone size={14}/> ۰۲۱-۲۲۳۳ ۴۴۵۵</span></div>
    <div className="nav-wrap container">
      <Logo />
      <nav className={open ? 'open' : ''}>
        {nav.map(([id,label]) => <button key={id} onClick={() => {scrollToId(id);setOpen(false)}}>{label}</button>)}
        <button className="admin-link" onClick={onAdmin}><LayoutDashboard size={17}/> پنل مدیریت</button>
      </nav>
      <button className="primary-btn header-cta" onClick={onBooking}><CalendarDays size={18}/> رزرو نوبت</button>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="منو">{open ? <X/> : <Menu/>}</button>
    </div>
  </header>
}

function Hero({ onBooking }) {
  const [active, setActive] = useState(0);
  useEffect(() => { const id = setInterval(() => setActive(a => (a + 1) % slides.length), 6500); return () => clearInterval(id); }, []);
  const move = d => setActive(a => (a + d + slides.length) % slides.length);
  return <section id="home" className="hero">
    {slides.map((s,i) => <div key={s.image} className={`hero-slide ${i === active ? 'active' : ''}`} style={{backgroundImage:`url(${s.image})`}} aria-hidden={i !== active}/>) }
    <div className="hero-shade"/>
    <div className="hero-content container">
      <div className="hero-copy">
        <span className="eyebrow"><Sparkles size={17}/>{slides[active].eyebrow}</span>
        <h1>{slides[active].title}</h1>
        <p>{slides[active].text}</p>
        <div className="hero-actions">
          <button className="primary-btn large" onClick={onBooking}>رزرو آنلاین <ArrowLeft size={19}/></button>
          <button className="ghost-btn" onClick={() => scrollToId('services')}>مشاهده خدمات</button>
        </div>
        <div className="trust-row"><span><BadgeCheck/> مواد اورجینال</span><span><ShieldCheck/> رعایت کامل بهداشت</span><span><Star/> تیم حرفه‌ای</span></div>
      </div>
    </div>
    <div className="slide-controls">
      <button onClick={() => move(-1)} aria-label="قبلی"><ArrowRight/></button>
      <div>{slides.map((_,i)=><button key={i} className={i===active?'active':''} onClick={()=>setActive(i)} aria-label={`اسلاید ${i+1}`}/>)}</div>
      <button onClick={() => move(1)} aria-label="بعدی"><ArrowLeft/></button>
    </div>
    <div className="hero-card"><span>اولین باره مهمان مایی؟</span><strong>مشاوره اولیه رایگان</strong><button onClick={onBooking}>دریافت مشاوره <ChevronLeft size={17}/></button></div>
  </section>
}

function SectionTitle({ overline, title, text }) { return <div className="section-title"><span>{overline}</span><h2>{title}</h2>{text && <p>{text}</p>}</div> }

function Services({ onBooking }) {
  return <section id="services" className="section services"><div className="container">
    <SectionTitle overline="خدمات ما" title="هر آنچه برای درخشش نیاز داری" text="با بهترین متریال و تکنیک‌های روز، خدماتی متناسب با نیاز و سبک شخصی تو ارائه می‌دهیم." />
    <div className="service-grid">{services.map(({icon:Icon,...s}) => <article className="service-card" key={s.id}>
      <div className={`service-icon ${s.tint}`}><Icon/></div><span className="service-no">۰{s.id}</span>
      <h3>{s.title}</h3><p>{s.desc}</p><div className="service-meta"><span><Clock3/>{s.time}</span><strong>{s.price} تومان</strong></div>
      <button onClick={onBooking}>انتخاب و رزرو <ArrowLeft/></button>
    </article>)}</div>
  </div></section>
}

function About() {
  return <section id="about" className="section about"><div className="container about-grid">
    <div className="about-media"><img src="/assets/hero-salon.jpg" alt="نمای داخلی سالن باران"/><div className="play-chip"><span><Play fill="currentColor"/></span><div><strong>داستان باران</strong><small>ویدئوی معرفی ۱:۲۰</small></div></div><div className="years"><strong>۱۲+</strong><span>سال تجربه<br/>در زیبایی</span></div></div>
    <div className="about-copy"><SectionTitle overline="درباره سالن باران" title="اینجا، زیبایی با آرامش همراه است"/><p>باران با یک باور ساده شکل گرفت: هر بانویی شایسته‌ی تجربه‌ای منحصربه‌فرد از زیبایی است. فضایی امن، آرام و صمیمی ساخته‌ایم تا با خیال راحت، خودت باشی و بدرخشی.</p>
      <div className="about-points"><div><BadgeCheck/><span><strong>تجربه شخصی‌سازی‌شده</strong><small>مشاوره اختصاصی قبل از شروع هر خدمت</small></span></div><div><Sparkles/><span><strong>کیفیت بدون مصالحه</strong><small>محصولات معتبر و تجهیزات به‌روز</small></span></div></div>
      <button className="text-btn">بیشتر درباره ما بدانید <ArrowLeft/></button>
    </div>
  </div></section>
}

function Team() {
  return <section id="team" className="section team"><div className="container"><SectionTitle overline="تیم حرفه‌ای باران" title="هنرمندانی که به تو گوش می‌دهند" text="هر عضو تیم ما با مهارت، تجربه و علاقه کنار توست تا نتیجه‌ای دقیقاً مطابق خواسته‌ات خلق کند."/>
    <div className="staff-grid">{staff.map((p,i)=><article className="staff-card" key={p.name}><div className="staff-photo"><img src={p.img} alt={`تصویر نمایشی ${p.name}`}/><span><Instagram/></span></div><div><h3>{p.name}</h3><p>{p.role}</p><small>{p.years}</small></div><button aria-label="مشاهده پروفایل"><ArrowLeft/></button></article>)}</div>
  </div></section>
}

function Credentials() {
  const certs = [
    ['مدرک تخصصی رنگ و لایت','آکادمی بین‌المللی Pivot Point','۱۴۰۱'],
    ['گواهینامه گریم حرفه‌ای','Make Up For Ever Academy','۱۴۰۰'],
    ['دوره مدیریت سالن زیبایی','سازمان فنی و حرفه‌ای','۱۳۹۹']
  ];
  return <section id="credentials" className="section credentials"><div className="container credentials-grid">
    <div><SectionTitle overline="رزومه و گواهینامه‌ها" title="تجربه‌ای که می‌توانی به آن اعتماد کنی"/><p>یادگیری برای ما یک مسیر همیشگی است. تخصص‌های تیم باران با آموزش مستمر، مدارک معتبر و سال‌ها تجربه عملی به‌روز می‌ماند.</p>
      <div className="stats"><div><strong>+۲۵</strong><span>گواهینامه تخصصی</span></div><div><strong>+۴,۸۰۰</strong><span>مراجعه موفق</span></div><div><strong>۱۲</strong><span>سال تجربه</span></div></div>
    </div>
    <div className="certificate-list">{certs.map(([a,b,c])=><article key={a}><div className="cert-icon"><FileBadge/></div><div><h3>{a}</h3><p>{b}</p><span>دریافت در سال {c}</span></div><button aria-label="مشاهده مدرک"><ArrowLeft/></button></article>)}</div>
  </div></section>
}

function Gallery() {
  const imgs=['/assets/hero-bridal.jpg','/assets/hero-hair.jpg','/assets/hero-salon.jpg','/assets/hero-bridal.jpg'];
  return <section className="section gallery"><div className="container"><div className="gallery-head"><SectionTitle overline="گالری باران" title="لحظه‌هایی از زیبایی"/><a href="https://instagram.com/baranbeauty_official" target="_blank" rel="noreferrer"><Instagram/> baranbeauty_official</a></div><div className="gallery-grid">{imgs.map((x,i)=><button key={i}><img src={x} alt="نمونه کار نمایشی سالن"/><span><Camera/> مشاهده تصویر</span></button>)}</div></div></section>
}

function Contact() {
  return <section id="contact" className="section contact"><div className="container contact-card">
    <div className="contact-copy"><SectionTitle overline="منتظر دیدارت هستیم" title="یک قدم تا تجربه باران"/><p>برای مشاوره، رزرو یا هر سوالی با ما در تماس باش. با خوشحالی راهنمایی‌ات می‌کنیم.</p>
      <div className="contact-items"><div><MapPin/><span><strong>آدرس سالن</strong><small>تهران، پاسداران، بوستان هشتم، پلاک ۲۴</small></span></div><div><Phone/><span><strong>شماره تماس</strong><small>۰۲۱-۲۲۳۳ ۴۴۵۵ &nbsp; | &nbsp; ۰۹۱۲-۱۲۳ ۴۵۶۷</small></span></div><div><Clock3/><span><strong>ساعات کاری</strong><small>شنبه تا پنجشنبه، ۹ صبح تا ۸ شب</small></span></div></div>
    </div><div className="map-mock"><div className="map-lines"/><span className="map-pin"><MapPin fill="currentColor"/></span><div className="map-label"><img src="/assets/baran-logo.png"/><div><strong>سالن زیبایی باران</strong><small>پاسداران، بوستان هشتم</small></div></div></div>
  </div></section>
}

function BookingModal({ onClose }) {
  const [step,setStep]=useState(1); const [service,setService]=useState(1); const [day,setDay]=useState(2); const [time,setTime]=useState('۱۱:۳۰');
  const picked=services.find(x=>x.id===service);
  const days=['ش','ی','د','س','چ','پ','ج']; const dates=['۱۸','۱۹','۲۰','۲۱','۲۲','۲۳','۲۴'];
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="booking-modal">
    <div className="modal-head"><div><span>رزرو آنلاین</span><h2>{step===4?'نوبت شما ثبت شد':'وقت درخشش تو رسیده'}</h2></div><button onClick={onClose}><X/></button></div>
    {step<4 && <div className="steps">{['انتخاب خدمت','زمان نوبت','اطلاعات شما'].map((x,i)=><div className={step>=i+1?'active':''} key={x}><span>{step>i+1?<Check/>:i+1}</span><small>{x}</small></div>)}</div>}
    <div className="modal-body">
      {step===1 && <><p className="prompt">کدام خدمت را برایت رزرو کنیم؟</p><div className="booking-services">{services.map(({icon:Icon,...s})=><button key={s.id} className={service===s.id?'selected':''} onClick={()=>setService(s.id)}><Icon/><span><strong>{s.title}</strong><small>{s.time} · {s.price} تومان</small></span>{service===s.id&&<Check/>}</button>)}</div></>}
      {step===2 && <><p className="prompt">روز و ساعت مناسب را انتخاب کن</p><div className="mini-calendar"><div className="month"><button><ChevronLeft/></button><strong>آبان ۱۴۰۵</strong><button><ChevronLeft className="flip"/></button></div><div className="day-row">{days.map((d,i)=><button key={i} className={day===i?'selected':''} onClick={()=>setDay(i)}><small>{d}</small><strong>{dates[i]}</strong></button>)}</div></div><div className="times">{['۱۰:۰۰','۱۱:۳۰','۱۳:۰۰','۱۵:۳۰','۱۷:۰۰','۱۸:۳۰'].map(t=><button className={time===t?'selected':''} onClick={()=>setTime(t)} key={t}>{t}</button>)}</div></>}
      {step===3 && <><p className="prompt">اطلاعات تماس را وارد کن</p><div className="form-grid"><label><span>نام و نام خانوادگی</span><input placeholder="مثلاً نازنین احمدی"/></label><label><span>شماره موبایل</span><input dir="ltr" placeholder="0912 123 4567"/></label><label className="full"><span>توضیحات (اختیاری)</span><textarea placeholder="اگر نکته‌ای هست برایمان بنویس..."/></label></div><div className="booking-summary"><span><picked.icon/></span><div><strong>{picked.title}</strong><small>سه‌شنبه ۲۰ آبان · ساعت {time}</small></div><b>{picked.price} تومان</b></div></>}
      {step===4 && <div className="success"><div><Check/></div><h3>تا دیدار تو لحظه‌شماری می‌کنیم!</h3><p>جزئیات نوبت برای شماره موبایل شما ارسال شد.</p><article><span><CalendarDays/></span><div><strong>{picked.title}</strong><small>سه‌شنبه ۲۰ آبان، ساعت {time}</small></div></article><button className="primary-btn" onClick={onClose}>بازگشت به صفحه اصلی</button></div>}
    </div>
    {step<4 && <div className="modal-foot"><button className="back-btn" onClick={()=>step===1?onClose():setStep(step-1)}>{step===1?'انصراف':'مرحله قبل'}</button><button className="primary-btn" onClick={()=>setStep(step+1)}>{step===3?'تأیید نهایی رزرو':'ادامه'} <ArrowLeft/></button></div>}
  </div></div>
}

function AdminPanel({ onClose }) {
  const [tab,setTab]=useState('overview'); const [blocked,setBlocked]=useState([3,8,15]); const [uploads,setUploads]=useState([]);
  const addFiles=e=>{const next=[...e.target.files].map(f=>({name:f.name,type:f.type,src:URL.createObjectURL(f)}));setUploads(x=>[...next,...x])};
  const menu=[['overview','نمای کلی',LayoutDashboard],['appointments','نوبت‌ها',CalendarDays],['calendar','روزهای کاری',Clock3],['media','رسانه‌ها',ImagePlus],['staff','پرسنل',UsersRound]];
  return <div className="admin-shell" dir="rtl"><aside><div className="admin-brand"><Logo compact/><span><strong>مدیریت باران</strong><small>پنل آزمایشی UI</small></span></div><nav>{menu.map(([id,label,I])=><button className={tab===id?'active':''} onClick={()=>setTab(id)} key={id}><I/>{label}</button>)}</nav><button className="exit-admin" onClick={onClose}><ArrowRight/> بازگشت به سایت</button></aside>
    <main><header><div><small>پنل مدیریت</small><h1>{menu.find(x=>x[0]===tab)?.[1]}</h1></div><div className="admin-user"><span>ب‌م</span><div><strong>باران محمودی</strong><small>مدیر سالن</small></div></div></header>
      {tab==='overview'&&<div className="dashboard"><div className="metric-grid"><article><span className="pink"><CalendarDays/></span><div><small>نوبت‌های امروز</small><strong>۱۲</strong><em>۳ نوبت باقی‌مانده</em></div></article><article><span className="gold"><UsersRound/></span><div><small>مراجعین این ماه</small><strong>۲۸۴</strong><em>۱۲٪ رشد نسبت به قبل</em></div></article><article><span className="purple"><Star/></span><div><small>رضایت مشتریان</small><strong>۴.۹</strong><em>از ۱۴۸ بازخورد</em></div></article></div><div className="admin-row"><AdminAppointments/><div className="quick"><h3>دسترسی سریع</h3><button onClick={()=>setTab('calendar')}><Clock3/><span><strong>مدیریت روزهای کاری</strong><small>بستن یا بازکردن روزها</small></span><ChevronLeft/></button><button onClick={()=>setTab('media')}><UploadCloud/><span><strong>آپلود رسانه</strong><small>تصویر و ویدئوی جدید</small></span><ChevronLeft/></button><button><Plus/><span><strong>افزودن پرسنل</strong><small>ساخت پروفایل جدید</small></span><ChevronLeft/></button></div></div></div>}
      {tab==='appointments'&&<AdminAppointments full/>}
      {tab==='calendar'&&<AdminCalendar blocked={blocked} setBlocked={setBlocked}/>} 
      {tab==='media'&&<MediaManager uploads={uploads} addFiles={addFiles}/>} 
      {tab==='staff'&&<div className="empty-panel"><UsersRound/><h2>مدیریت پرسنل</h2><p>پروفایل، تخصص و برنامه کاری اعضای تیم از این بخش مدیریت خواهد شد.</p><button className="primary-btn"><Plus/> افزودن عضو جدید</button></div>}
    </main>
  </div>
}

function AdminAppointments({full=false}) { const rows=[['۱۰:۰۰','مریم رضایی','رنگ و لایت','تأیید شده'],['۱۱:۳۰','نگار حسینی','کوتاهی و استایل','در انتظار'],['۱۳:۰۰','آوا کریمی','میکاپ و گریم','تأیید شده'],['۱۵:۳۰','سارا محمدی','خدمات ناخن','تأیید شده']]; return <section className={`panel appointments ${full?'full':''}`}><div className="panel-title"><div><h3>نوبت‌های امروز</h3><small>سه‌شنبه، ۲۰ آبان ۱۴۰۵</small></div><button>مشاهده همه <ArrowLeft/></button></div><div className="appointment-list">{rows.map((r,i)=><article key={r[0]}><time>{r[0]}</time><span className="avatar">{r[1][0]}</span><div><strong>{r[1]}</strong><small>{r[2]}</small></div><em className={r[3]==='تأیید شده'?'ok':'pending'}>{r[3]}</em><button>•••</button></article>)}</div></section> }

function AdminCalendar({blocked,setBlocked}) { const days=Array.from({length:30},(_,i)=>i+1); const toggle=n=>setBlocked(x=>x.includes(n)?x.filter(y=>y!==n):[...x,n]); return <section className="panel calendar-panel"><div className="panel-title"><div><h3>تنظیم روزهای قابل رزرو</h3><small>با انتخاب هر روز، امکان رزرو آن را فعال یا غیرفعال کنید.</small></div><div className="legend"><span><i/>قابل رزرو</span><span><i className="off"/>غیرفعال</span></div></div><div className="admin-calendar"><div className="calendar-header"><button><ChevronLeft/></button><h2>آبان ۱۴۰۵</h2><button><ChevronLeft className="flip"/></button></div><div className="weekdays">{['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'].map(x=><span key={x}>{x}</span>)}</div><div className="month-days">{days.map(d=><button className={`${blocked.includes(d)?'blocked':''} ${d===20?'today':''}`} onClick={()=>toggle(d)} key={d}><strong>{d.toLocaleString('fa-IR')}</strong><small>{blocked.includes(d)?'غیرفعال':'قابل رزرو'}</small></button>)}</div></div><div className="calendar-note"><ShieldCheck/><span><strong>{blocked.length.toLocaleString('fa-IR')} روز غیرفعال در این ماه</strong><small>مراجعین امکان انتخاب این روزها را در فرم رزرو نخواهند داشت.</small></span><button className="primary-btn">ذخیره تغییرات</button></div></section> }

function MediaManager({uploads,addFiles}) { return <section className="panel media-panel"><div className="panel-title"><div><h3>مدیریت تصاویر و ویدئوها</h3><small>رسانه‌های صفحه اصلی و گالری را مدیریت کنید.</small></div></div><label className="dropzone"><input type="file" accept="image/*,video/*" multiple onChange={addFiles}/><UploadCloud/><h3>فایل‌ها را اینجا رها کنید</h3><p>یا برای انتخاب تصویر و ویدئو کلیک کنید</p><small>JPG, PNG, WEBP, MP4 — حداکثر حجم نمایشی ۵۰ مگابایت</small></label><div className="media-toolbar"><h3>رسانه‌های اخیر</h3><div><button className="active">همه</button><button>تصاویر</button><button>ویدئوها</button></div></div><div className="media-grid">{uploads.map((f,i)=><article key={i}>{f.type.startsWith('video')?<video src={f.src}/>:<img src={f.src} alt="آپلود جدید"/>}<div><span>{f.type.startsWith('video')?<Video/>:<Camera/>}</span><small>{f.name}</small></div></article>)}{['/assets/hero-salon.jpg','/assets/hero-hair.jpg','/assets/hero-bridal.jpg'].map((x,i)=><article key={x}><img src={x}/><div><span><Camera/></span><small>تصویر صفحه اصلی {i+1}</small></div></article>)}</div></section> }

function Footer({onBooking}) { return <footer><div className="container footer-grid"><div><Logo/><p>فضایی برای آرامش، زیبایی و درخشش تو. در باران، هر مراجعه شروع یک حس خوب است.</p><div className="socials"><a href="#"><Instagram/></a><a href="#"><MessageCircle/></a></div></div><div><h4>دسترسی سریع</h4><button onClick={()=>scrollToId('services')}>خدمات</button><button onClick={()=>scrollToId('about')}>درباره ما</button><button onClick={()=>scrollToId('team')}>تیم باران</button></div><div><h4>خدمات محبوب</h4><span>رنگ و لایت</span><span>میکاپ عروس</span><span>کوتاهی و استایل</span></div><div className="footer-cta"><h3>آماده‌ای بدرخشی؟</h3><p>نوبتت را همین حالا، در کمتر از یک دقیقه رزرو کن.</p><button className="primary-btn" onClick={onBooking}>رزرو نوبت <ArrowLeft/></button></div></div><div className="copyright container"><span>© ۱۴۰۵ سالن زیبایی باران — تمامی حقوق محفوظ است.</span><span>طراحی شده با <Heart fill="currentColor"/> برای زیبایی شما</span></div></footer> }

function App() { const [booking,setBooking]=useState(false); const [admin,setAdmin]=useState(false); if(admin) return <AdminPanel onClose={()=>setAdmin(false)}/>; return <><Header onBooking={()=>setBooking(true)} onAdmin={()=>setAdmin(true)}/><main><Hero onBooking={()=>setBooking(true)}/><Services onBooking={()=>setBooking(true)}/><About/><Team/><Credentials/><Gallery/><Contact/></main><Footer onBooking={()=>setBooking(true)}/>{booking&&<BookingModal onClose={()=>setBooking(false)}/>}<button className="floating-book" onClick={()=>setBooking(true)}><CalendarDays/><span>رزرو نوبت</span></button></> }

createRoot(document.getElementById('root')).render(<App/>);
