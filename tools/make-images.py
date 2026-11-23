"""Membuat gambar dummy SVG di assets/img/. Jalankan: python3 tools/make-images.py
Semua gambar ini PLACEHOLDER: ganti file/ path-nya dengan screenshot & foto asli kapan saja."""
import os
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img")
os.makedirs(os.path.join(OUT, "portfolio"), exist_ok=True)
BLUE, TEAL, INK, SOFT, GREEN, AMBER = "#2f5bea", "#14b8a6", "#0b1f3a", "#e8eefc", "#1fa855", "#f5a524"

def save(name, w, h, body, defs=""):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">' \
          f'<defs>{defs}</defs>{body}</svg>'
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(svg)

def grad(i, a, b, x2="1", y2="1"):
    return f'<linearGradient id="{i}" x1="0" y1="0" x2="{x2}" y2="{y2}"><stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient>'

def bar(x, y, w, h=10, c="#d6def0", r=5):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{c}"/>'

def window(x, y, w, h, inner, bar_c="#f3f6fb"):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="14" fill="#fff" stroke="#d6def0"/>'
            f'<path d="M{x} {y+14}a14 14 0 0 1 14-14h{w-28}a14 14 0 0 1 14 14v18h-{w}z" fill="{bar_c}"/>'
            f'<circle cx="{x+18}" cy="{y+16}" r="4" fill="#ff6b6b"/><circle cx="{x+32}" cy="{y+16}" r="4" fill="{AMBER}"/><circle cx="{x+46}" cy="{y+16}" r="4" fill="{GREEN}"/>'
            f'{inner}')

# ---------------- HERO ----------------
hero = f'''
<ellipse cx="320" cy="290" rx="290" ry="230" fill="url(#bg)" opacity=".5"/>
<circle cx="110" cy="110" r="62" fill="url(#gl)"/>
<g fill="none" stroke="#fff" stroke-width="2" opacity=".9"><circle cx="110" cy="110" r="46"/><ellipse cx="110" cy="110" rx="20" ry="46"/><path d="M64 110h92M72 82h76M72 138h76"/></g>
<rect x="64" y="56" width="92" height="26" rx="13" fill="{INK}" opacity="0"/>
{window(120, 150, 400, 270,
  f'<rect x="138" y="196" width="364" height="100" rx="12" fill="url(#hh)"/>'
  f'{bar(156,214,170,14,"#ffffff")}{bar(156,238,230,9,"#ffffff99")}<rect x="156" y="262" width="96" height="22" rx="11" fill="{GREEN}"/>'
  f'<circle cx="440" cy="246" r="30" fill="#ffffff22"/><circle cx="470" cy="226" r="16" fill="#ffffff33"/>'
  + "".join(f'<rect x="{138+i*125}" y="312" width="114" height="78" rx="10" fill="{SOFT}"/>{bar(150+i*125,360,70,8)}{bar(150+i*125,374,46,8,"#c4d0ea")}<circle cx="{195+i*125}" cy="332" r="12" fill="{[BLUE,TEAL,AMBER][i]}" opacity=".85"/>' for i in range(3)))}
<rect x="130" y="428" width="380" height="12" rx="6" fill="#c9d4ec" opacity=".7"/>
<g transform="translate(430 215)">
  <rect width="150" height="270" rx="26" fill="{INK}"/><rect x="8" y="10" width="134" height="250" rx="20" fill="#fff"/>
  <rect x="16" y="22" width="118" height="70" rx="10" fill="url(#hh)"/>{bar(24,36,60,8,"#fff")}{bar(24,50,84,6,"#ffffffaa")}
  <rect x="24" y="68" width="42" height="14" rx="7" fill="{GREEN}"/>
  <rect x="16" y="102" width="56" height="50" rx="8" fill="{SOFT}"/><rect x="78" y="102" width="56" height="50" rx="8" fill="{SOFT}"/>
  <rect x="16" y="160" width="56" height="50" rx="8" fill="{SOFT}"/><rect x="78" y="160" width="56" height="50" rx="8" fill="{SOFT}"/>
  <rect x="16" y="222" width="118" height="26" rx="13" fill="{GREEN}"/>{bar(40,232,70,6,"#fff")}
</g>
<g transform="translate(40 345)"><rect width="150" height="58" rx="29" fill="{GREEN}"/><circle cx="29" cy="29" r="15" fill="#fff"/>
  <path d="M22 30l5 5 10-11" stroke="{GREEN}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  {bar(54,20,76,8,"#fff")}{bar(54,34,52,7,"#ffffffbb")}</g>
<g transform="translate(470 120)"><rect width="104" height="40" rx="20" fill="#fff" stroke="#d6def0"/>
  <text x="52" y="26" font-family="system-ui,Arial,sans-serif" font-size="17" font-weight="800" fill="{INK}" text-anchor="middle">ID | EN</text></g>
<g fill="{AMBER}"><path d="M560 60l6 14 14 6-14 6-6 14-6-14-14-6 14-6z"/><path d="M40 250l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" fill="{TEAL}"/></g>'''
save("hero.svg", 640, 520, hero,
     grad("bg", "#dbe5ff", "#c9f5ef") + grad("gl", BLUE, TEAL) + grad("hh", BLUE, TEAL, "1", "0"))

# ---------------- SERVICE CARDS (400x220) ----------------
def svc(name, inner, a, b):
    save(name, 400, 220, f'<rect width="400" height="220" rx="0" fill="url(#s)"/>{inner}', grad("s", a, b))

svc("service-landing.svg", window(60, 30, 280, 170,
     f'<rect x="76" y="72" width="248" height="62" rx="10" fill="{BLUE}"/>{bar(90,86,110,10,"#fff")}{bar(90,104,150,7,"#ffffffaa")}'
     f'<rect x="90" y="142" width="74" height="20" rx="10" fill="{GREEN}"/>{bar(76,172,248,8)}'
     f'<path d="M300 40l16 8-8 16z" fill="{AMBER}"/>'), "#e8eefc", "#d3e1ff")
svc("service-company.svg", window(60, 30, 280, 170,
     f'{bar(76,66,120,12,INK)}{bar(76,86,180,7)}' +
     "".join(f'<circle cx="{110+i*90}" cy="136" r="22" fill="{[BLUE,TEAL,AMBER][i]}" opacity=".85"/><circle cx="{110+i*90}" cy="130" r="7" fill="#fff"/><path d="M{97+i*90} 150a13 11 0 0 1 26 0z" fill="#fff"/>{bar(88+i*90,168,44,6)}' for i in range(3))), "#e6fbf8", "#cdf3ee")
svc("service-store.svg",
    "".join(f'<rect x="{38+i*112}" y="34" width="100" height="150" rx="14" fill="#fff" stroke="#d6def0"/>'
            f'<rect x="{46+i*112}" y="42" width="84" height="70" rx="10" fill="{[SOFT,"#dff7f3","#fff1d6"][i]}"/>'
            f'<rect x="{74+i*112}" y="56" width="28" height="44" rx="8" fill="{[BLUE,TEAL,AMBER][i]}"/><rect x="{80+i*112}" y="50" width="16" height="9" rx="3" fill="{INK}" opacity=".7"/>'
            f'{bar(50+i*112,124,60,8,INK)}{bar(50+i*112,140,38,7,"#c4d0ea")}<rect x="{50+i*112}" y="156" width="76" height="20" rx="10" fill="{GREEN}"/>' for i in range(3)), "#fff7e6", "#ffe9c2")
svc("service-custom.svg", window(46, 28, 308, 176,
     f'{bar(62,62,60,8,INK)}' +
     "".join(f'<rect x="{66+i*30}" y="{150-h}" width="20" height="{h}" rx="5" fill="{[BLUE,TEAL][i%2]}"/>' for i, h in enumerate([34, 56, 42, 74, 60, 88])) +
     f'<g transform="translate(262 92)"><circle r="28" fill="{SOFT}"/><circle r="10" fill="#fff"/><circle r="22" fill="none" stroke="{BLUE}" stroke-width="6" stroke-dasharray="8 7"/></g>'
     f'{bar(240,142,90,8)}{bar(240,158,60,8,"#c4d0ea")}'), "#ece9ff", "#d9d3ff")

# ---------------- PORTFOLIO DUMMY SCREENSHOTS (800x500) ----------------
def site(name, accent, accent2, body):
    save("portfolio/" + name, 800, 500,
         f'<rect width="800" height="500" fill="url(#p)"/>' + window(40, 30, 720, 440, body),
         grad("p", accent, accent2))

site("rumahijo.svg", "#16a34a", "#065f46",
     f'<rect x="40" y="62" width="720" height="40" fill="#fff"/><circle cx="70" cy="82" r="10" fill="#16a34a"/>{bar(88,77,80,10,INK)}'
     + "".join(bar(520+i*64, 77, 48, 9) for i in range(3)) +
     f'<rect x="60" y="116" width="680" height="170" rx="16" fill="#dcfce7"/>{bar(84,146,250,18,"#14532d")}{bar(84,176,310,10,"#4d7c5b")}{bar(84,194,260,10,"#4d7c5b")}<rect x="84" y="226" width="110" height="30" rx="15" fill="#16a34a"/>'
     f'<g fill="#16a34a"><circle cx="600" cy="205" r="58" opacity=".25"/><circle cx="640" cy="170" r="34" opacity=".35"/><path d="M590 250c0-60 40-90 90-90 0 50-30 90-90 90z" opacity=".85"/></g>'
     + "".join(f'<rect x="{60+i*232}" y="304" width="216" height="140" rx="14" fill="#f0fdf4" stroke="#bbf7d0"/><circle cx="{90+i*232}" cy="340" r="14" fill="#16a34a" opacity="{.9-i*.2}"/>{bar(76+i*232,370,150,10,"#14532d")}{bar(76+i*232,390,170,7,"#86a894")}{bar(76+i*232,406,120,7,"#86a894")}' for i in range(3)))

site("sehatku.svg", "#2563eb", "#1e3a8a",
     f'<rect x="40" y="62" width="720" height="44" fill="#fff"/><rect x="60" y="72" width="26" height="26" rx="8" fill="#2563eb"/>{bar(94,80,72,10,INK)}'
     f'<rect x="300" y="72" width="300" height="26" rx="13" fill="#eef3ff" stroke="#c9d6f7"/>{bar(316,82,90,7,"#9db0e0")}'
     f'<circle cx="700" cy="85" r="14" fill="#eef3ff"/><circle cx="718" cy="73" r="7" fill="#ef4444"/>'
     f'<rect x="60" y="120" width="680" height="76" rx="14" fill="url(#bn)"/>{bar(84,142,220,14,"#fff")}{bar(84,166,150,8,"#ffffffaa")}'
     + "".join(
        f'<rect x="{60+i*172}" y="212" width="160" height="238" rx="14" fill="#fff" stroke="#d6def0"/>'
        f'<rect x="{68+i*172}" y="220" width="144" height="112" rx="10" fill="#eef3ff"/>'
        f'<rect x="{120+i*172}" y="236" width="40" height="78" rx="10" fill="{["#2563eb","#14b8a6","#f59e0b","#8b5cf6"][i]}"/><rect x="{130+i*172}" y="226" width="20" height="14" rx="4" fill="{INK}" opacity=".75"/>'
        f'{bar(74+i*172,346,100,9,INK)}{bar(74+i*172,364,60,8,"#2563eb")}<rect x="{74+i*172}" y="388" width="132" height="26" rx="13" fill="{GREEN}"/>{bar(104+i*172,398,72,6,"#fff")}' for i in range(4)))
# gradient banner definisi tambahan untuk sehatku
p = os.path.join(OUT, "portfolio", "sehatku.svg"); s = open(p).read().replace("<defs>", '<defs><linearGradient id="bn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#14b8a6"/></linearGradient>'); open(p, "w").write(s)

# ---------------- BLOG COVERS (800x420) ----------------
save("blog-umkm.svg", 800, 420,
     f'<rect width="800" height="420" fill="url(#c)"/>'
     f'<g transform="translate(90 120)"><rect x="0" y="40" width="260" height="170" rx="10" fill="#fff"/><path d="M-10 40l30-40h220l30 40z" fill="{GREEN}"/>'
     + "".join(f'<path d="M{-10+i*58} 40l12-40h46l-12 40z" fill="#fff" opacity=".35"/>' for i in range(5)) +
     f'<rect x="30" y="100" width="90" height="110" rx="8" fill="{SOFT}"/><rect x="140" y="90" width="90" height="70" rx="8" fill="{SOFT}"/>{bar(146,176,76,9,"#c4d0ea")}</g>'
     + window(380, 110, 320, 210, f'<rect x="396" y="154" width="288" height="66" rx="10" fill="url(#hh)"/>{bar(410,170,110,11,"#fff")}{bar(410,190,160,7,"#ffffffaa")}'
              + "".join(f'<rect x="{396+i*98}" y="236" width="90" height="62" rx="8" fill="{SOFT}"/>' for i in range(3))) +
     f'<path d="M345 270c25 0 20-26 45-26" stroke="{AMBER}" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="2 10"/>',
     grad("c", "#e8eefc", "#cdf3ee") + grad("hh", BLUE, TEAL, "1", "0"))
save("blog-global.svg", 800, 420,
     f'<rect width="800" height="420" fill="url(#c)"/>'
     f'<g transform="translate(400 215)"><circle r="130" fill="url(#gl)"/><g fill="none" stroke="#fff" stroke-width="3" opacity=".85"><circle r="104"/><ellipse rx="46" ry="104"/><path d="M-104 0h208M-90 -52h180M-90 52h180"/></g>'
     f'<path d="M-40 -40c30-20 70-10 80 20-30 30-70 25-80-20z" fill="#fff" opacity=".35"/></g>'
     f'<g transform="translate(120 90)"><rect width="150" height="64" rx="32" fill="#fff"/><text x="75" y="42" font-family="system-ui,Arial,sans-serif" font-size="26" font-weight="800" fill="{INK}" text-anchor="middle">Halo!</text></g>'
     f'<g transform="translate(530 280)"><rect width="150" height="64" rx="32" fill="{GREEN}"/><text x="75" y="42" font-family="system-ui,Arial,sans-serif" font-size="26" font-weight="800" fill="#fff" text-anchor="middle">Hello!</text></g>'
     f'<g fill="{AMBER}"><path d="M690 80l7 16 16 7-16 7-7 16-7-16-16-7 16-7z"/></g>',
     grad("c", "#e8eefc", "#d3e1ff") + grad("gl", BLUE, TEAL))

# ---------------- AVATARS (96x96) ----------------
for i, (a, b) in enumerate([(BLUE, TEAL), (TEAL, GREEN), (AMBER, "#ef6c3c")], 1):
    skin = ["#f1c9a5", "#d9a37c", "#e8b98f"][i - 1]
    save(f"avatar-{i}.svg", 96, 96,
         f'<circle cx="48" cy="48" r="48" fill="url(#g)"/><circle cx="48" cy="38" r="17" fill="{skin}"/>'
         f'<path d="M14 92c2-24 18-34 34-34s32 10 34 34z" fill="#fff" opacity=".95"/>'
         f'<path d="M31 36c0-12 8-18 18-18s18 6 18 18c-6-6-12-8-18-8s-12 2-18 8z" fill="{INK}"/>',
         grad("g", a, b))
print("gambar dibuat di", os.path.abspath(OUT))
