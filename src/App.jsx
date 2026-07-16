import React, { useState, useRef, useEffect } from 'react';
import CyberAttackBg from './components/CyberAttackBg';

// Portfolyo Verileri
const ABOUT = {
  name: 'Egemen Der',
  title: 'Bilgisayar Mühendisi | Siber Güvenlik & Red Team',
  intro: 'İskenderun Teknik Üniversitesi Bilgisayar Mühendisliği mezunuyum. SOC operasyonlarında aktif olarak görev aldım ve bu süreçte SIEM yönetimi (Splunk, QRadar, Wazuh), güvenlik duvarı yapılandırmaları (FortiGate, pfSense) ve zafiyet tarama araçları (Nessus, Qualys, OpenVAS) konularında deneyim kazandım. Log analizi yapma, tehditleri erken aşamada tespit etme, ağ trafiğini inceleme ve zararlı yazılımların davranışlarını analiz etme konularında kendimi sürekli geliştirdim. Red Team alanına özel bir ilgi duyuyorum ve hem saldırı hem de savunma tarafındaki yetkinliklerimi her gün daha ileri taşımaya çalışıyorum. Detaylara önem veren, ekip çalışmasına uyumlu ve sorumluluk almaktan çekinmeyen bir yapıya sahibim. Üstlendiğim her işi titiz, planlı ve profesyonel bir yaklaşımla tamamlamayı önemsiyorum.',
  contact: {
    email: 'egemender@hotmail.com',
    phone: '+90 552 825 26 10',
    location: 'Nilüfer, Bursa, Türkiye',
    linkedin: 'https://linkedin.com/in/egemen-der',
    medium: 'https://medium.com/@egemender',
    military: 'Tamamlandı',
    languages: 'İngilizce B1, Türkçe (Anadil)'
  }
};

const SKILL_CATEGORIES = [
  {
    name: 'SIEM',
    skills: ['Splunk', 'IBM QRadar', 'Wazuh']
  },
  {
    name: 'Kali Linux Tools',
    skills: ['BurpSuite', 'Searchsploit', 'Nmap', 'Metasploit', 'Nikto']
  },
  {
    name: 'Zafiyet Analizi',
    skills: ['Nessus', 'Qualys', 'OpenVAS']
  },
  {
    name: 'Firewall',
    skills: ['FortiGate', 'pfSense']
  },
  {
    name: 'Ağ Teknolojileri',
    skills: ['TCP/IP', 'OSI Layers', 'LAN/DNS', 'TCP/UDP', 'VPN', 'Wireshark', 'Whois', 'URLVoid', 'Phishing Analysis']
  },
  {
    name: 'SOC Tecrübesi',
    skills: ['Log Analysis', 'Detection', 'Packet Analysis', 'Malware Analysis', 'Online Sandbox']
  }
];

const EXPERIENCE = [
  {
    company: 'ION Bilgi Teknolojileri | Ankara',
    role: 'SOC Stajyeri',
    date: '2025 - 2025',
    bullets: [
      'SOC operasyonları kapsamında Linux, Windows ve Windows Server platformlarında Wazuh SIEM entegrasyonunu başarıyla gerçekleştirdim.',
      'Wazuh’ta tehdit algılama yeteneklerini geliştirmek için özel kurallar ve uyarılar tasarlayıp uyguladım.',
      'Windows sistemlerinde merkezi log yönetimi sağlamak amacıyla Suricata (IDS) kurulumunu tamamlayarak Wazuh ile entegre ettim.',
      'Suricata kurulumu ve Wazuh entegrasyon süreçlerini kolaylaştırmak için kapsamlı bir teknik rapor hazırladım.',
      'SQL enjeksiyonu tespiti ve dosya bütünlüğü izleme (File Integrity Monitoring) için Wazuh yapılandırmasını optimize ettim.'
    ]
  },
  {
    company: 'BgTek Siber Güvenlik | Bursa',
    role: 'Stajyer',
    date: '2023 - 2024',
    bullets: [
      'Rastgele sayı dizilerinde belirli örüntüleri tespit etmek için bir C++ programı geliştirdim.',
      'Java’da Nesne Yönelimli Programlama (OOP) prensiplerini kullanarak basit bir “Market Yönetim Sistemi” oluşturdum.',
      'FreeRADIUS’u Kali Linux ortamına kurarak, merkezi kimlik doğrulama yönetimi için MySQL ile entegrasyonunu gerçekleştirdim.',
      'Penetrasyon testi sırasında DIWA sisteminde kritik bir “Admin NoPass” SQL açığını keşfettim ve düzeltme önerileriyle birlikte raporladım.',
      'Ağ segmentasyonu sağlamak için pfSense güvenlik duvarını kurdum ve Ubuntu Server ile yapılandırdım.',
      'Ubuntu Server üzerinde pfSense için yeni bir ağ arayüzü derledim ve başarıyla entegre ettim.'
    ]
  }
];

const EDUCATION = {
  school: 'İskenderun Teknik Üniversitesi',
  degree: 'Bilgisayar Mühendisliği',
  date: '2020 - 2025',
  activities2: 'İletişim Sorumlusu, ISTE Siber Kulübü (2021–2023)',
  activities: 'Başkan Yardımcısı, ISTE Siber Kulübü (2023–2025)',
  focus: 'Offensive Cybersecurity, Ağ ve Sistem Savunması',
  certifications: [
    { name: 'Certified Cybersecurity Foundations', link: 'https://hackviser.com/verify?id=HV-CORE-TFEQPOJ3' },
    { name: 'Cisco CyberOps Associate', link: 'https://www.credly.com/badges/9bc1d95b-efc4-4c74-957c-6d26580bd8ef/linked_in_profile' },
    { name: 'CCNAv7', link: 'https://www.credly.com/badges/100976fb-b9a6-42bf-b0fe-6106e60fdf61/public_url' },
    { name: 'ISO 27001', link: 'https://drive.google.com/file/d/1xpQm88qs5qgyZgCiyUNRNWcVlHOCuNjw/view' },
    { name: 'Turkcell Pentesting', link: 'https://gelecegiyazanlar.turkcell.com.tr/sertifika/da9c44cb87984c91b39d1db287027924' },
    { name: 'ICCW', link: 'https://drive.google.com/file/d/1yQY_RNAvsfKQtd15oHPQayZ9XMS4ajcf/view' },
    { name: 'Siber Güvenlik Uzmanlığı', link: 'https://drive.google.com/file/d/19UEmqx23aW2g21TaiN-OlrBdHxoEhTvM/view' },
    { name: 'English B1 Certificate', link: 'https://drive.google.com/file/d/1gP9dzQ_i_RrGtKkGiqAEtGs12b6tGZVk/view' }
  ]
};

const PROJECTS = [
  {
    title: 'Sefer Otomasyon Sistemi',
    tech: 'C# / .NET',
    desc: 'İSTE kapsamında geliştirilen veritabanı destekli görsel programlama projesi. Lojistik ve sefer yönetimi süreçlerini otomatize eder.',
    link: 'https://github.com/Anogar-Dxilak/Sefer_otomasyon'
  },
  {
    title: 'CV Oluşturma Uygulaması',
    tech: 'PHP / HTML / CSS / AJAX',
    desc: 'Ajax, PHP, HTML ve CSS teknolojilerini geliştirmek amacıyla yazılmış dinamik CV oluşturma web uygulaması.',
    link: 'https://github.com/Anogar-Dxilak/CV-olusturma'
  },
  {
    title: 'Tır Otomasyon Sistemi',
    tech: 'JavaFX / Java',
    desc: 'Üniversite kapsamında geliştirilmiş kapsamlı lojistik ve tır otomasyon sistemi projesi. Araç takibi, sefer planlaması ve yük yönetimi özelliklerini içermektedir.',
    link: 'https://github.com/Anogar-Dxilak/Tir-Otomasyonu'
  }
];

const ARTICLES = [
  { title: 'Server-Side Template Injection (SSTI)', platform: 'Medium', desc: 'Sunucu taraflı şablon enjeksiyonu zafiyetleri ve sömürme yöntemleri üzerine teknik inceleme.' },
  { title: 'Client-Side Template Injection (CSTI)', platform: 'Medium', desc: 'İstemci taraflı şablon enjeksiyonu mekanizmaları ve korunma yolları.' }
];

const REFERENCES = [
  {
    name: 'Alican Göktepe',
    company: 'ION Bilgi Teknolojileri',
    role: 'Founder',
    phone: '+90 535 550 72 39',
    email: 'alican.goktepe@ion.net.tr'
  }
];

export default function App() {
  // Terminal için state yapıları
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { text: "Welcome to Egemen's CyberOS v1.0.0...", type: 'system' },
    { text: 'Type "help" to see available commands.', type: 'system' },
    { text: '', type: 'system' }
  ]);
  const terminalBodyRef = useRef(null);

  // Terminale yeni yazı geldikçe sadece terminal kutusunu aşağı kaydır (tüm sayfayı değil!)
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Terminal Komut İşleyici
  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = [];
    switch (cmd) {
      case 'help':
        response = [
          'Kullanılabilir komutlar:',
          '  about       - Profesyonel özet',
          '  skills      - Siber güvenlik & geliştirme yeteneklerini listele',
          '  experience  - İş deneyimi detaylarını görüntüle',
          '  education   - Eğitim geçmişi ve sertifikalar',
          '  contact     - İletişim bağlantıları ve bilgileri',
          '  clear       - Terminal ekranını temizle'
        ];
        break;
      case 'about':
        response = [
          'EGEMEN DER - Bilgisayar Mühendisi',
          'SOC geçmişine sahip Red Team & Offensive Security meraklısı.',
          '',
          ABOUT.intro
        ];
        break;
      case 'skills':
        response = [
          'TEKNİK YETENEKLER:',
          ...SKILL_CATEGORIES.map(cat => `  [+] ${cat.name}: ${cat.skills.join(', ')}`)
        ];
        break;
      case 'experience':
        response = [
          'İŞ GEÇMİŞİ:',
          ...EXPERIENCE.flatMap(exp => [
            `  * ${exp.company} (${exp.date})`,
            `    Pozisyon: ${exp.role}`,
            ...exp.bullets.map(b => `    - ${b}`),
            ''
          ])
        ];
        break;
      case 'education':
        response = [
          'EĞİTİM:',
          `  Okul:           ${EDUCATION.school}`,
          `  Bölüm:          ${EDUCATION.degree} (${EDUCATION.date})`,
          `  Kulüp:          ${EDUCATION.activities}`,
          `  Ana Odak:       ${EDUCATION.focus}`,
          '  Sertifikalar:',
          ...EDUCATION.certifications.map(cert => `    - ${cert.name} (Doğrula: ${cert.link})`)
        ];
        break;
      case 'contact':
        response = [
          'İLETİŞİM BİLGİLERİ:',
          `  E-posta:     ${ABOUT.contact.email}`,
          `  Telefon:     ${ABOUT.contact.phone}`,
          `  Konum:       ${ABOUT.contact.location}`,
          `  LinkedIn:    ${ABOUT.contact.linkedin}`,
          `  Medium:      ${ABOUT.contact.medium}`,
          `  Askerlik:    ${ABOUT.contact.military}`,
          `  Diller:      ${ABOUT.contact.languages}`
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        response = [`Komut bulunamadı: "${cmd}". Komut listesi için "help" yazın.`];
    }

    setTerminalHistory(prev => [
      ...prev,
      { text: `guest@egemender:~$ ${terminalInput}`, type: 'input' },
      ...response.map(line => ({ text: line, type: 'output' })),
      { text: '', type: 'system' }
    ]);
    setTerminalInput('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-[#00ff66] selection:text-black">
      
      <header className="border-b border-gray-900 bg-[#0f0f0f]/85 backdrop-blur sticky top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 flex flex-col items-center gap-2 sm:gap-2.5 overflow-hidden relative">
        <CyberAttackBg />
        <div className="relative z-10 flex items-center space-x-2 w-full justify-center">
          <h1 className="font-mono font-bold text-base sm:text-xl tracking-wider text-white">EGEMEN DER PORTFOLYO</h1>
        </div>
        <nav className="relative z-10 flex flex-wrap justify-center gap-x-3 sm:gap-x-6 gap-y-1.5 sm:gap-y-2 font-mono text-[11px] sm:text-sm w-full">
          <a href="#about" className="text-gray-300 hover:text-[#00ff66] transition">Hakkımda</a>
          <a href="#skills" className="text-gray-300 hover:text-[#00ff66] transition">Yetenekler</a>
          <a href="#experience" className="text-gray-300 hover:text-[#00ff66] transition">Deneyim</a>
          <a href="#education" className="text-gray-300 hover:text-[#00ff66] transition">Eğitim</a>
          <a href="#projects" className="text-gray-300 hover:text-[#00ff66] transition">Projeler</a>
          <a href="#references" className="text-gray-300 hover:text-[#00ff66] transition">Referanslar</a>
        </nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL VE ORTA ALAN (2 Kolon Kaplar) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* ABOUT / INTRO SECTION */}
          <section id="about" className="bg-[#0f0f0f] border border-gray-900 rounded-lg p-4 sm:p-6 space-y-6 scroll-mt-32">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profil Resmi Alanı (Harika bir cyber-avatar tasarımı) */}
              <div className="relative group flex-shrink-0">
                <div className="absolute -inset-0.5 bg-[#00ff66] rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
                <div className="relative w-24 h-24 rounded-full bg-gray-955 border border-gray-800 flex items-center justify-center overflow-hidden">
                  <img src="/profil.jpg" alt="Egemen Der" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-wide">{ABOUT.name}</h2>
                <p className="text-sm font-mono text-[#00ff66]">{ABOUT.title}</p>
                <p className="text-sm leading-relaxed text-gray-400 mt-3">{ABOUT.intro}</p>
              </div>
            </div>

            {/* Hızlı İletişim Detayları Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-900 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">📍 Konum:</span>
                <span className="text-gray-300">{ABOUT.contact.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">📧 E-posta:</span>
                <a href={`mailto:${ABOUT.contact.email}`} className="text-gray-300 hover:text-[#00ff66] transition">{ABOUT.contact.email}</a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">📞 Telefon:</span>
                <a href={`tel:${ABOUT.contact.phone}`} className="text-gray-300 hover:text-[#00ff66] transition">{ABOUT.contact.phone}</a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">🎖️ Askerlik:</span>
                <span className="text-gray-300">{ABOUT.contact.military}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">🗣️ Diller:</span>
                <span className="text-gray-300">{ABOUT.contact.languages}</span>
              </div>
              <div className="flex items-center space-x-3 pt-1">
                <a href={ABOUT.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-900 border border-gray-800 text-gray-400 hover:text-[#00ff66] hover:border-[#00ff66] px-2 py-1 rounded transition">LinkedIn</a>
                <a href={ABOUT.contact.medium} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-900 border border-gray-800 text-gray-400 hover:text-[#00ff66] hover:border-[#00ff66] px-2 py-1 rounded transition">Medium</a>
              </div>
            </div>
          </section>
          
          {/* SKILLS */}
          <section id="skills" className="space-y-6 scroll-mt-32">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-900 pb-2">Yetenekler & Uzmanlıklar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="bg-[#0f0f0f]/40 border border-gray-900 rounded p-4 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">{cat.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, index) => (
                      <span key={index} className="bg-[#0f0f0f] border border-gray-800 text-gray-400 font-mono text-[11px] px-2.5 py-1 rounded hover:border-[#00ff66]/60 transition">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="space-y-6 scroll-mt-32">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-900 pb-2">Mesleki Geçmiş</h2>
            <div className="space-y-6">
              {EXPERIENCE.map((exp, index) => (
                <div key={index} className="bg-[#0f0f0f] border border-gray-900 rounded-lg p-5 space-y-4 hover:border-gray-800 transition">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h3 className="text-white font-bold text-base">{exp.company}</h3>
                      <p className="text-sm text-[#00ff66] font-mono mt-0.5">{exp.role}</p>
                    </div>
                    <span className="text-xs font-mono bg-gray-950 text-gray-400 px-2.5 py-1 rounded border border-gray-800 self-start">{exp.date}</span>
                  </div>
                  
                  {/* Başarılar ve Görevler Listesi */}
                  <ul className="space-y-2 text-sm text-gray-400 list-inside list-disc pl-1 leading-relaxed">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="hover:text-gray-300 transition-colors">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section id="education" className="bg-[#0f0f0f] border border-gray-900 rounded-lg p-5 space-y-5 scroll-mt-32">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-955 pb-2">Eğitim & Sertifikalar</h2>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-white font-bold text-base">{EDUCATION.school}</h3>
                  <p className="text-sm text-gray-400 font-mono mt-0.5">{EDUCATION.degree}</p>
                  <p className="text-xs text-gray-500 font-mono mt-1">🎯 Odak: {EDUCATION.focus}</p>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">👥 {EDUCATION.activities}</p>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">👥 {EDUCATION.activities2}</p>
                </div>
                <span className="text-xs font-mono bg-gray-950 text-gray-400 px-2.5 py-1 rounded border border-gray-800 self-start">{EDUCATION.date}</span>
              </div>

              {/* Sertifikalar Grid */}
              <div className="pt-4 border-t border-gray-950 space-y-2">
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Sertifikalar:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
                  {EDUCATION.certifications.map((cert, idx) => (
                    <a key={idx} href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-gray-955 border border-gray-900 px-3 py-2 rounded hover:border-[#00ff66]/30 transition group text-gray-400">
                      <div className="flex items-center space-x-2">
                        <span className="text-[#00ff66] font-bold">✓</span>
                        <span className="text-gray-400 group-hover:text-white transition">{cert.name}</span>
                      </div>
                      <span className="text-[10px] text-gray-600 font-mono group-hover:text-[#00ff66] transition">Doğrula →</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-32">
            <div className="space-y-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-900 pb-2">Projeler</h2>
              {PROJECTS.map((proj, index) => {
                const cardClass = "block bg-[#0f0f0f] border border-gray-900 rounded p-5 flex flex-col justify-between hover:border-[#00ff66]/40 transition group";
                const inner = (
                  <>
                    <div>
                      <h3 className="text-white font-bold mb-2 group-hover:text-[#00ff66] transition">{proj.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{proj.desc}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs font-mono text-[#00ff66]">{proj.tech}</span>
                      {proj.link && <span className="text-[10px] font-mono text-gray-600 group-hover:text-[#00ff66] transition">GitHub →</span>}
                    </div>
                  </>
                );
                return proj.link
                  ? <a key={index} href={proj.link} target="_blank" rel="noopener noreferrer" className={cardClass}>{inner}</a>
                  : <div key={index} className={cardClass}>{inner}</div>;
              })}
            </div>

            <div id="articles" className="space-y-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-900 pb-2">Zafiyet Araştırmaları</h2>
              <div className="space-y-4">
                {ARTICLES.map((art, index) => (
                  <a key={index} href={ABOUT.contact.medium} target="_blank" rel="noopener noreferrer" className="block bg-[#0f0f0f] border border-gray-900 rounded p-4 hover:border-[#00ff66]/30 transition group">
                    <h3 className="text-white font-semibold text-sm group-hover:text-[#00ff66] transition">{art.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{art.desc}</p>
                    <span className="inline-block text-[10px] font-mono text-[#00ff66] bg-gray-955 border border-gray-800 px-2 py-0.5 mt-3 rounded">Medium / Write-up</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* REFERENCES */}
          <section id="references" className="space-y-4 scroll-mt-32">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-900 pb-2">Referanslar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REFERENCES.map((ref, idx) => (
                <div key={idx} className="bg-[#0f0f0f] border border-gray-900 rounded-lg p-5 space-y-3">
                  <div>
                    <h3 className="text-white font-bold">{ref.name}</h3>
                    <p className="text-xs text-gray-500 font-mono">{ref.company} / {ref.role}</p>
                  </div>
                  <div className="space-y-1 text-xs font-mono text-gray-400 pt-2 border-t border-gray-955">
                    <div>📱 Telefon: <a href={`tel:${ref.phone}`} className="text-gray-400 hover:text-[#00ff66] transition">{ref.phone}</a></div>
                    <div>📧 E-posta: <a href={`mailto:${ref.email}`} className="text-gray-400 hover:text-[#00ff66] transition">{ref.email}</a></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SAĞ ALAN: INTERACTIVE TERMINAL WIDGET (1 Kolon Kaplar) */}
        <div className="lg:col-span-1">
          <div className="sticky top-[236px] border border-gray-900 rounded-lg overflow-hidden shadow-2xl bg-[#050505]">
            {/* Terminal Top Bar */}
            <div className="bg-[#0f0f0f] px-4 py-2 flex items-center justify-between border-b border-gray-900">
              <div className="flex space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/70 block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/70 block"></span>
                <span className="w-3 h-3 rounded-full bg-[#00ff66]/70 block"></span>
              </div>
              <span className="text-xs font-mono text-gray-500 select-none">bash - egemen@redteam</span>
            </div>

            {/* Terminal Body */}
            <div ref={terminalBodyRef} className="p-3 sm:p-4 h-[280px] sm:h-[380px] lg:h-[450px] overflow-y-auto font-mono text-xs space-y-2 flex flex-col text-left">
              <div className="flex-1">
                {terminalHistory.map((line, index) => {
                  let colorClass = 'text-[#00ff66]'; // varsayılan neon yeşil
                  if (line.type === 'input') {
                    colorClass = 'text-white font-bold'; // kullanıcının kendi yazdığı
                  } else if (line.type === 'system') {
                    colorClass = 'text-gray-400'; // sistem logları/boşluklar
                  }
                  return (
                    <div key={index} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
                      {line.text}
                    </div>
                  );
                })}
              </div>
              
              {/* Terminal Input Form */}
              <form onSubmit={handleCommand} className="flex items-center pt-2 border-t border-gray-900/50 text-left">
                <span className="text-[#00ff66] mr-2 select-none">guest@egemen:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono p-0 focus:ring-0 text-left"
                  autoFocus
                  placeholder="help yazın..."
                />
              </form>
            </div>
          </div>
        </div>

      </main>

      <footer className="border-t border-gray-900 mt-24 py-8 text-center text-xs font-mono text-gray-600">
        &copy; {new Date().getFullYear()} Egemen Der. Tüm hakları saklıdır. Güvenli bağlantı garantilenmiştir.
      </footer>
    </div>
  );
}