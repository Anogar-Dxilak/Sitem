import React, { useState, useRef, useEffect } from 'react';

// Portfolyo Verileri (Düzenlemesi kolay olsun diye yukarıda topladık)
const SKILLS = ['Offensive Security', 'Red Teaming', 'Penetration Testing', 'SOC Operations', 'JavaFX', 'React'];
const EXPERIENCE = [
  { company: 'ION Bilgi Teknolojileri', role: 'SOC Intern', date: '2025' },
  { company: 'BgTek Cyber Security', role: 'Cyber Security Intern', date: '2023 - 2024' }
];
const PROJECTS = [
  { title: 'Truck Automation System', tech: 'JavaFX / Java', desc: 'Üniversite kapsamında geliştirilmiş kapsamlı lojistik ve otomasyon sistemi projesi.' }
];
const ARTICLES = [
  { title: 'Server-Side Template Injection (SSTI)', platform: 'Medium', desc: 'Sunucu taraflı şablon enjeksiyonu zafiyetleri ve sömürme yöntemleri üzerine teknik inceleme.' },
  { title: 'Client-Side Template Injection (CSTI)', platform: 'Medium', desc: 'İstemci taraflı şablon enjeksiyonu mekanizmaları ve korunma yolları.' }
];

export default function App() {
  // Terminal için state yapıları
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    'Welcome to Egemen\'s OS v1.0.0...',
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
          '  about    - Display professional summary',
          '  skills   - List cybersecurity & development skills',
          '  clear    - Clear terminal screen'
        ];
        break;
      case 'about':
        response = ['Red Team & Offensive Security enthusiast. Student / Graduate of Iskenderun Technical University Computer Engineering.'];
        break;
      case 'skills':
        response = ['Skills: ' + SKILLS.join(', ')];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        response = [`Command not found: "${cmd}". Type "help" for a list of commands.`];
    }

    setTerminalHistory(prev => [...prev, `> ${terminalInput}`, ...response, '']);
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
        <nav className="space-x-6 font-mono text-sm">
          <a href="#experience" className="hover:text-[#00ff66] transition">Experience</a>
          <a href="#projects" className="hover:text-[#00ff66] transition">Projects</a>
          <a href="#articles" className="hover:text-[#00ff66] transition">Articles</a>
        </nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL VE ORTA ALAN: MODERN SİBER DASHBOARD (2 Kolon Kaplar) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* SKILLS */}
          <section>
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] mb-4">Specializations</h2>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill, index) => (
                <span key={index} className="bg-[#121212] border border-gray-800 text-gray-400 font-mono text-xs px-3 py-1.5 rounded hover:border-[#00ff66] transition duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] mb-4">Professional History</h2>
            <div className="space-y-4">
              {EXPERIENCE.map((exp, index) => (
                <div key={index} className="bg-[#0f0f0f] border border-gray-900 rounded p-5 flex justify-between items-start hover:border-gray-800 transition">
                  <div>
                    <h3 className="text-white font-bold">{exp.company}</h3>
                    <p className="text-sm text-gray-500 font-mono mt-1">{exp.role}</p>
                  </div>
                  <span className="text-xs font-mono bg-gray-900 text-gray-400 px-2 py-1 rounded border border-gray-800">{exp.date}</span>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS & PUBLICATIONS */}
          <section id="projects" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] mb-4">System Automation</h2>
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

            <div id="articles">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#00ff66] mb-4">Vulnerability Research (Medium)</h2>
              <div className="space-y-4">
                {ARTICLES.map((art, index) => (
                  <div key={index} className="bg-[#0f0f0f] border border-gray-900 rounded p-4 hover:border-[#00ff66]/30 transition group">
                    <h3 className="text-white font-semibold text-sm group-hover:text-[#00ff66] transition">{art.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{art.desc}</p>
                  </div>
                ))}
              </div>
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
            <div className="p-4 h-[420px] overflow-y-auto font-mono text-xs text-[#00ff66] space-y-2 flex flex-col">
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