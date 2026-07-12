import React, { useState, useRef, useEffect } from 'react';

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
    languages: 'English B1, Turkish Native'
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
    role: 'SOC Stajyer',
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
  activities: 'Başkan Yardımcılığı, ISTE Siber Kulübü (2023–2024)',
  focus: 'Offensive Cybersecurity, Ağ ve Sistem Savunması',
  certifications: [
    'Cisco CyberOps Associate',
    'CCNAv7',
    'ISO 27001',
    'Turkcell Pentesting',
    'ICCW',
    'Siber Güvenlik Uzmanlığı',
    'English B1 Certificate'
  ]
};

const PROJECTS = [
  { title: 'Truck Automation System', tech: 'JavaFX / Java', desc: 'Üniversite kapsamında geliştirilmiş kapsamlı lojistik ve otomasyon sistemi projesi.' }
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
    'Welcome to Egemen\'s CyberOS v1.0.0...',
    'Type "help" to see available commands.',
    ''
  ]);
  const terminalBottomRef = useRef(null);

  // Terminale yeni yazı geldikçe otomatik aşağı kaydır
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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
          'Available commands:',
          '  about       - Professional summary',
          '  skills      - List cybersecurity & development skills',
          '  experience  - View work experience details',
          '  education   - Education history and certifications',
          '  contact     - Contact links and information',
          '  clear       - Clear terminal screen'
        ];
        break;
      case 'about':
        response = [
          'EGEMEN DER - Bilgisayar Mühendisi',
          'Red Team & Offensive Security enthusiast with SOC background.',
          '',
          ABOUT.intro
        ];
        break;
      case 'skills':
        response = [
          'TECHNICAL SKILLS:',
          ...SKILL_CATEGORIES.map(cat => `  [+] ${cat.name}: ${cat.skills.join(', ')}`)
        ];
        break;
      case 'experience':
        response = [
          'WORK HISTORY:',
          ...EXPERIENCE.flatMap(exp => [
            `  * ${exp.company} (${exp.date})`,
            `    Position: ${exp.role}`,
            ...exp.bullets.map(b => `    - ${b}`),
            ''
          ])
        ];
        break;
      case 'education':
        response = [
          'EDUCATION:',
          `  School:         ${EDUCATION.school}`,
          `  Degree:         ${EDUCATION.degree} (${EDUCATION.date})`,
          `  Club:           ${EDUCATION.activities}`,
          `  Core Focus:     ${EDUCATION.focus}`,
          '  Certifications:',
          ...EDUCATION.certifications.map(cert => `    - ${cert}`)
        ];
        break;
      case 'contact':
        response = [
          'CONTACT INFO:',
          `  Email:       ${ABOUT.contact.email}`,
          `  Phone:       ${ABOUT.contact.phone}`,
          `  Location:    ${ABOUT.contact.location}`,
          `  LinkedIn:    ${ABOUT.contact.linkedin}`,
          `  Medium:      ${ABOUT.contact.medium}`,
          `  Military:    ${ABOUT.contact.military}`,
          `  Languages:   ${ABOUT.contact.languages}`
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        response = [`Command not found: "${cmd}". Type "help" for list of commands.`];
    }

    setTerminalHistory(prev => [...prev, `guest@egemender:~$ ${terminalInput}`, ...response, '']);
    setTerminalInput('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-[#00ff66] selection:text-black">
      
      {/* HEADER / HERO SECTION */}
      <header className="border-b border-gray-900 bg-[#0f0f0f]/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-[#00ff66] animate-pulse"></span>
          <h1 className="font-mono font-bold text-xl tracking-wider text-white">EGEMEN DER PORTFOLIO</h1>
        </div>
        <nav className="hidden md:flex space-x-6 font-mono text-sm">
          <a href="#about" className="hover:text-[#00ff66] transition">About</a>
          <a href="#skills" className="hover:text-[#00ff66] transition">Skills</a>
          <a href="#experience" className="hover:text-[#00ff66] transition">Experience</a>
          <a href="#education" className="hover:text-[#00ff66] transition">Education</a>
          <a href="#projects" className="hover:text-[#00ff66] transition">Projects & Articles</a>
          <a href="#references" className="hover:text-[#00ff66] transition">References</a>
        </nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL VE ORTA ALAN (2 Kolon Kaplar) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* ABOUT / INTRO SECTION */}
          <section id="about" className="bg-[#0f0f0f] border border-gray-900 rounded-lg p-6 space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profil Resmi Alanı (Harika bir cyber-avatar tasarımı) */}
              <div className="relative group flex-shrink-0">
                <div className="absolute -inset-0.5 bg-[#00ff66] rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
                <div className="relative w-24 h-24 rounded-full bg-gray-955 border border-gray-800 flex items-center justify-center text-3xl font-mono text-[#00ff66] overflow-hidden">
                  ED
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
          <section id="skills" className="space-y-6">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-900 pb-2">Skills & Specializations</h2>
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
          <section id="experience" className="space-y-6">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-900 pb-2">Professional History</h2>
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
          <section id="education" className="bg-[#0f0f0f] border border-gray-900 rounded-lg p-5 space-y-5">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-950 pb-2">Education & Certifications</h2>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-white font-bold text-base">{EDUCATION.school}</h3>
                  <p className="text-sm text-gray-400 font-mono mt-0.5">{EDUCATION.degree}</p>
                  <p className="text-xs text-gray-500 font-mono mt-1">🎯 Odak: {EDUCATION.focus}</p>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">👥 {EDUCATION.activities}</p>
                </div>
                <span className="text-xs font-mono bg-gray-950 text-gray-400 px-2.5 py-1 rounded border border-gray-800 self-start">{EDUCATION.date}</span>
              </div>

              {/* Sertifikalar Grid */}
              <div className="pt-4 border-t border-gray-950 space-y-2">
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Certifications:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
                  {EDUCATION.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-gray-950 border border-gray-900 px-3 py-2 rounded">
                      <span className="text-[#00ff66] font-bold">✓</span>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PROJECTS & PUBLICATIONS */}
          <section id="projects" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-900 pb-2">System Automation</h2>
              {PROJECTS.map((proj, index) => (
                <div key={index} className="bg-[#0f0f0f] border border-gray-900 rounded p-5 h-full flex flex-col justify-between hover:border-gray-800 transition">
                  <div>
                    <h3 className="text-white font-bold mb-2">{proj.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{proj.desc}</p>
                  </div>
                  <span className="text-xs font-mono text-[#00ff66] mt-4">{proj.tech}</span>
                </div>
              ))}
            </div>

            <div id="articles" className="space-y-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-900 pb-2">Vulnerability Research</h2>
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
          <section id="references" className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] border-b border-gray-900 pb-2">References</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REFERENCES.map((ref, idx) => (
                <div key={idx} className="bg-[#0f0f0f] border border-gray-900 rounded-lg p-5 space-y-3">
                  <div>
                    <h3 className="text-white font-bold">{ref.name}</h3>
                    <p className="text-xs text-gray-500 font-mono">{ref.company} / {ref.role}</p>
                  </div>
                  <div className="space-y-1 text-xs font-mono text-gray-400 pt-2 border-t border-gray-955">
                    <div>📱 Phone: {ref.phone}</div>
                    <div>📧 Email: <a href={`mailto:${ref.email}`} className="hover:text-[#00ff66] transition">{ref.email}</a></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SAĞ ALAN: INTERACTIVE TERMINAL WIDGET (1 Kolon Kaplar) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border border-gray-900 rounded-lg overflow-hidden shadow-2xl bg-[#050505]">
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
            <div className="p-4 h-[450px] overflow-y-auto font-mono text-xs text-[#00ff66] space-y-2 flex flex-col">
              <div className="flex-1">
                {terminalHistory.map((line, index) => (
                  <div key={index} className="whitespace-pre-wrap leading-relaxed">{line}</div>
                ))}
                <div ref={terminalBottomRef} />
              </div>
              
              {/* Terminal Input Form */}
              <form onSubmit={handleCommand} className="flex items-center pt-2 border-t border-gray-900/50">
                <span className="text-[#00ff66] mr-2 select-none">guest@egemen:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono p-0 focus:ring-0"
                  autoFocus
                  placeholder="type help..."
                />
              </form>
            </div>
          </div>
        </div>

      </main>

      <footer className="border-t border-gray-900 mt-24 py-8 text-center text-xs font-mono text-gray-600">
        &copy; {new Date().getFullYear()} Egemen Der. All rights reserved. Secure connection guaranteed.
      </footer>
    </div>
  );
}