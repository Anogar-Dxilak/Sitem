import React, { useEffect, useRef } from 'react';

const ATTACK_TYPES = [
  { name: 'DDoS', color: '#ff3333' },
  { name: 'SQLi', color: '#ffcc00' },
  { name: 'MALWARE', color: '#00ff66' },
  { name: 'EXPLOIT', color: '#ff00ff' },
  { name: 'BRUTEFORCE', color: '#3399ff' },
  { name: 'PHISHING', color: '#ff6600' },
  { name: 'RANSOMWARE', color: '#e60000' }
];

// Ülkelerin siber rolleri (ISO 3166-1 alpha-2)
const COUNTRY_ROLES = {
  // Saldırganlar
  ru: 'attacker', cn: 'attacker', kp: 'attacker',
  // Hem saldırgan hem savunmacı
  us: 'both', in: 'both', br: 'both', ir: 'both',
  // Diğer herkes savunmacı
};

// SVG path "d" attribute'ünü {x,y}[] dizisine çevirir (sadece M, L, l, z komutlarını destekler - yeterince iyi)
function parseSVGPathToPoints(d) {
  const points = [];
  let cx = 0, cy = 0;

  // Tüm komutları ve sayıları ayrıştır
  const tokens = d.match(/[MLHVCSQTAZmlhvcsqtaz]|[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/g);
  if (!tokens) return points;

  let i = 0;
  let cmd = '';

  const nextNum = () => {
    while (i < tokens.length && /^[A-Za-z]$/.test(tokens[i])) {
      cmd = tokens[i];
      i++;
    }
    if (i >= tokens.length) return NaN;
    return parseFloat(tokens[i++]);
  };

  while (i < tokens.length) {
    const token = tokens[i];
    if (/^[A-Za-z]$/.test(token)) {
      cmd = token;
      i++;
    }

    if (cmd === 'M') {
      cx = nextNum(); cy = nextNum();
      points.push({ x: cx, y: cy });
      cmd = 'L'; // Sonraki implicit L
    } else if (cmd === 'm') {
      cx += nextNum(); cy += nextNum();
      points.push({ x: cx, y: cy });
      cmd = 'l';
    } else if (cmd === 'L') {
      cx = nextNum(); cy = nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 'l') {
      cx += nextNum(); cy += nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 'H') {
      cx = nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 'h') {
      cx += nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 'V') {
      cy = nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 'v') {
      cy += nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 'C') {
      // Cubic bezier - sadece son noktayı al
      nextNum(); nextNum(); nextNum(); nextNum();
      cx = nextNum(); cy = nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 'c') {
      nextNum(); nextNum(); nextNum(); nextNum();
      const dx = nextNum(), dy = nextNum();
      cx += dx; cy += dy;
      points.push({ x: cx, y: cy });
    } else if (cmd === 'S') {
      nextNum(); nextNum();
      cx = nextNum(); cy = nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 's') {
      nextNum(); nextNum();
      cx += nextNum(); cy += nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 'Q') {
      nextNum(); nextNum();
      cx = nextNum(); cy = nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 'q') {
      nextNum(); nextNum();
      cx += nextNum(); cy += nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 'T') {
      cx = nextNum(); cy = nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 't') {
      cx += nextNum(); cy += nextNum();
      points.push({ x: cx, y: cy });
    } else if (cmd === 'A' || cmd === 'a') {
      // Arc: rx ry rotation large-arc sweep x y
      nextNum(); nextNum(); nextNum(); nextNum(); nextNum();
      if (cmd === 'A') {
        cx = nextNum(); cy = nextNum();
      } else {
        cx += nextNum(); cy += nextNum();
      }
      points.push({ x: cx, y: cy });
    } else if (cmd === 'Z' || cmd === 'z') {
      // Path kapandı, devam et
    } else {
      i++;
    }
  }

  return points;
}

// Ray-casting point-in-polygon
function isPointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    const intersect = ((yi > y) !== (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Poligon bounding box
function getBBox(polygon) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const pt of polygon) {
    if (pt.x < minX) minX = pt.x;
    if (pt.x > maxX) maxX = pt.x;
    if (pt.y < minY) minY = pt.y;
    if (pt.y > maxY) maxY = pt.y;
  }
  return { minX, maxX, minY, maxY };
}

// Polygon içinde rastgele nokta üret
function randomPointInPolygon(polygon, bbox) {
  for (let attempt = 0; attempt < 80; attempt++) {
    const x = bbox.minX + Math.random() * (bbox.maxX - bbox.minX);
    const y = bbox.minY + Math.random() * (bbox.maxY - bbox.minY);
    if (isPointInPolygon(x, y, polygon)) {
      return { x, y };
    }
  }
  // Fallback: centroid
  let sumX = 0, sumY = 0;
  polygon.forEach(p => { sumX += p.x; sumY += p.y; });
  return { x: sumX / polygon.length, y: sumY / polygon.length };
}

export default function CyberAttackBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let landPolygons = []; // { id, polygon, bbox, role, area }
    let activeNodes = [];
    let attacks = [];
    let hits = [];
    let spawnTimer = 0;
    let ready = false;

    const SVG_VB = { x: 30.767, y: 241.591, w: 784.077, h: 458.627 };
    const SVG_RATIO = SVG_VB.w / SVG_VB.h;

    // SVG'den gerçek ülke sınırlarını yükle
    fetch('/world-map.svg')
      .then(res => res.text())
      .then(svgText => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');

        // Tüm path elemanlarını topla
        const paths = doc.querySelectorAll('path');
        const MIN_AREA_THRESHOLD = 50; // Çok küçük adaları eleme eşiği

        paths.forEach(pathEl => {
          const d = pathEl.getAttribute('d');
          if (!d) return;

          // Ülke ID'sini bul (path'in kendi id'si veya parent g'nin id'si)
          let countryId = pathEl.getAttribute('id') || '';
          if (!countryId || countryId.startsWith('_')) {
            const parentG = pathEl.closest('g[id]');
            if (parentG) countryId = parentG.getAttribute('id');
          }
          if (!countryId) return;

          const points = parseSVGPathToPoints(d);
          if (points.length < 3) return;

          const bbox = getBBox(points);
          const bboxArea = (bbox.maxX - bbox.minX) * (bbox.maxY - bbox.minY);
          if (bboxArea < MIN_AREA_THRESHOLD) return; // Çok küçük parçaları atla

          const role = COUNTRY_ROLES[countryId] || 'defender';

          landPolygons.push({
            id: countryId,
            polygon: points,
            bbox,
            role,
            area: bboxArea
          });
        });

        // Büyük ülkelere ağırlık ver - daha fazla nokta doğsun
        // Normalize edilmiş alan toplamını hesapla
        const totalArea = landPolygons.reduce((s, lp) => s + lp.area, 0);
        landPolygons.forEach(lp => {
          lp.weight = lp.area / totalArea;
        });

        ready = true;
        updateNodePositions();
      });

    // Projeksiyon fonksiyonları (SVG viewBox -> Canvas pixel)
    let projCache = { offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 };

    const updateProjection = () => {
      const containerRatio = width / height;
      let renderWidth, renderHeight, offsetX, offsetY;

      if (containerRatio > SVG_RATIO) {
        renderWidth = width;
        renderHeight = width / SVG_RATIO;
        offsetX = 0;
        offsetY = (height - renderHeight) / 2;
      } else {
        renderHeight = height;
        renderWidth = height * SVG_RATIO;
        offsetX = (width - renderWidth) / 2;
        offsetY = 0;
      }

      projCache = {
        offsetX,
        offsetY,
        scaleX: renderWidth / SVG_VB.w,
        scaleY: renderHeight / SVG_VB.h
      };
    };

    const svgToCanvas = (svgX, svgY) => ({
      x: projCache.offsetX + (svgX - SVG_VB.x) * projCache.scaleX,
      y: projCache.offsetY + (svgY - SVG_VB.y) * projCache.scaleY
    });

    const updateNodePositions = () => {
      updateProjection();
      activeNodes.forEach(node => {
        const pos = svgToCanvas(node.svgX, node.svgY);
        node.x = pos.x;
        node.y = pos.y;
      });
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      updateNodePositions();
    };

    window.addEventListener('resize', handleResize);

    // Ağırlıklı rastgele ülke seçimi
    const pickRandomLand = () => {
      const r = Math.random();
      let cumulative = 0;
      for (const lp of landPolygons) {
        cumulative += lp.weight;
        if (r <= cumulative) return lp;
      }
      return landPolygons[landPolygons.length - 1];
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.03)';
      ctx.lineWidth = 0.5;
      const spacing = 18;
      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    };

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      if (!ready) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const time = timestamp * 0.002;

      // ──── 1. Dinamik Düğüm Üretimi ────
      // Türkiye kalıcı düğümü
      const hasTurkey = activeNodes.some(n => n.countryId === 'tr' && n.state !== 'fadeout');
      if (!hasTurkey) {
        const trLand = landPolygons.find(lp => lp.id === 'tr');
        if (trLand) {
          const pt = randomPointInPolygon(trLand.polygon, trLand.bbox);
          activeNodes.push({
            id: 'turkey-' + Math.random(),
            countryId: 'tr',
            svgX: pt.x,
            svgY: pt.y,
            x: 0, y: 0,
            opacity: 0,
            maxOpacity: 0.85,
            life: 99999999,
            state: 'fadein',
            role: 'defender',
            pulsePhase: Math.random() * Math.PI * 2
          });
        }
      }

      // Ekranda ~25-30 nokta olsun
      if (activeNodes.length < 28 && Math.random() < 0.06) {
        const land = pickRandomLand();
        const pt = randomPointInPolygon(land.polygon, land.bbox);
        activeNodes.push({
          id: Math.random().toString(),
          countryId: land.id,
          svgX: pt.x,
          svgY: pt.y,
          x: 0, y: 0,
          opacity: 0,
          maxOpacity: 0.4 + Math.random() * 0.4,
          life: 180 + Math.random() * 320,
          state: 'fadein',
          role: land.role,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }

      updateNodePositions();

      // ──── 2. Düğümleri Güncelle ve Çiz ────
      for (let i = activeNodes.length - 1; i >= 0; i--) {
        const node = activeNodes[i];

        if (node.state === 'fadein') {
          node.opacity += 0.02;
          if (node.opacity >= node.maxOpacity) {
            node.opacity = node.maxOpacity;
            node.state = 'active';
          }
        } else if (node.state === 'active') {
          node.life--;
          if (node.life <= 0) node.state = 'fadeout';
        } else if (node.state === 'fadeout') {
          node.opacity -= 0.02;
          if (node.opacity <= 0) {
            activeNodes.splice(i, 1);
            continue;
          }
        }

        const pulse = Math.sin(time + node.pulsePhase) * 1.5 + 3.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 102, ${node.opacity * 0.35})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 102, ${node.opacity})`;
        ctx.fill();
      }

      // ──── 3. Siber Saldırı Üretimi ────
      spawnTimer++;
      if (spawnTimer > 40 && activeNodes.length > 2) {
        spawnTimer = 0;

        const attackerNodes = activeNodes.filter(n => (n.role === 'attacker' || n.role === 'both') && n.state === 'active');
        const defenderNodes = activeNodes.filter(n => (n.role === 'defender' || n.role === 'both') && n.state === 'active');

        if (attackerNodes.length > 0 && defenderNodes.length > 0) {
          const start = attackerNodes[Math.floor(Math.random() * attackerNodes.length)];
          let end = defenderNodes[Math.floor(Math.random() * defenderNodes.length)];
          let retries = 0;
          while (end.id === start.id && retries < 5) {
            end = defenderNodes[Math.floor(Math.random() * defenderNodes.length)];
            retries++;
          }

          if (end.id !== start.id) {
            const typeInfo = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)];
            const mx = (start.x + end.x) / 2;
            const my = (start.y + end.y) / 2;
            const dist = Math.sqrt((start.x - end.x) ** 2 + (start.y - end.y) ** 2);
            const cy = my - dist * 0.05;

            attacks.push({
              x1: start.x, y1: start.y,
              x2: end.x, y2: end.y,
              cx: mx, cy,
              progress: 0,
              speed: 0.006 + Math.random() * 0.009,
              color: typeInfo.color,
              type: typeInfo.name,
            });
          }
        }
      }

      // ──── 4. Saldırıları Çiz ────
      for (let i = attacks.length - 1; i >= 0; i--) {
        const att = attacks[i];
        att.progress += att.speed;

        if (att.progress >= 1) {
          hits.push({
            x: att.x2, y: att.y2,
            radius: 1,
            maxRadius: 15 + Math.random() * 8,
            opacity: 1,
            color: att.color,
            type: att.type,
            labelY: att.y2 - 8,
          });
          attacks.splice(i, 1);
          continue;
        }

        const t = att.progress;
        const px = (1 - t) ** 2 * att.x1 + 2 * (1 - t) * t * att.cx + t ** 2 * att.x2;
        const py = (1 - t) ** 2 * att.y1 + 2 * (1 - t) * t * att.cy + t ** 2 * att.y2;

        ctx.beginPath();
        ctx.moveTo(att.x1, att.y1);
        ctx.quadraticCurveTo(att.cx, att.cy, px, py);

        const grad = ctx.createLinearGradient(att.x1, att.y1, px, py);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(0.3, `${att.color}05`);
        grad.addColorStop(0.8, `${att.color}25`);
        grad.addColorStop(1, `${att.color}65`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = att.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = att.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ──── 5. Hit dalgaları ve etiketler ────
      for (let i = hits.length - 1; i >= 0; i--) {
        const hit = hits[i];
        hit.radius += (hit.maxRadius - hit.radius) * 0.1;
        hit.opacity -= 0.025;
        hit.labelY -= 0.3;

        if (hit.opacity <= 0) {
          hits.splice(i, 1);
          continue;
        }

        const hex = Math.floor(hit.opacity * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(hit.x, hit.y, hit.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${hit.color}${hex}`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.fillStyle = `${hit.color}${hex}`;
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(hit.type, hit.x, hit.labelY);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none overflow-hidden">
      <img
        src="/world-map.svg"
        alt="World Map"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-[0.30] z-0"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
    </div>
  );
}
