<p align="center">
  <a href="https://agentx.js.org">
    <picture>
      <source srcset="agentx-logo.svg" media="(prefers-color-scheme: dark)">
      <source srcset="agentx-logo.svg" media="(prefers-color-scheme: light)">
      <img src="agentx-logo.svg" alt="AgentX Code logo">
    </picture>
  </a>
</p>
<p align="center">AgentX Code je open source AI agent za programiranje.</p>
<p align="center">
  <a href="https://agentx.js.org/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/@agent-qofeno/agentx-cli"><img alt="npm" src="https://img.shields.io/npm/v/@agent-qofeno/agentx-cli?style=flat-square" /></a>
  <a href="https://github.com/SohailKhan0525/agentxcode/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/SohailKhan0525/agentxcode/publish.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![AgentX Code Terminal UI](screenshot.svg)](https://agentx.js.org)

---

### Instalacija

```bash
# YOLO
curl -fsSL https://agentx.js.org/install | bash

# Package manageri
npm i -g @agent-qofeno/agentx-cli@latest        # ili bun/pnpm/yarn
scoop install opencode             # Windows
choco install opencode             # Windows
brew install SohailKhan0525/agentx/agentx # macOS i Linux (preporučeno, uvijek ažurno)
brew install opencode              # macOS i Linux (zvanična brew formula, rjeđe se ažurira)
sudo pacman -S opencode            # Arch Linux (Stable)
paru -S opencode-bin               # Arch Linux (Latest from AUR)
mise use -g opencode               # Bilo koji OS
nix run nixpkgs#opencode           # ili github:SohailKhan0525/agentxcode za najnoviji dev branch
```

> [!TIP]
> Ukloni verzije starije od 0.1.x prije instalacije.

### Desktop aplikacija (BETA)

AgentX Code je dostupan i kao desktop aplikacija. Preuzmi je direktno sa [stranice izdanja](https://github.com/SohailKhan0525/agentxcode/releases) ili sa [opencode.ai/download](https://agentx.js.org/download).

| Platforma             | Preuzimanje                        |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `opencode-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `opencode-desktop-mac-x64.dmg`     |
| Windows               | `opencode-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, ili AppImage       |

```bash
# macOS (Homebrew)
brew install --cask opencode-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/opencode-desktop
```

#### Instalacijski direktorij

Instalacijska skripta koristi sljedeći redoslijed prioriteta za putanju instalacije:

1. `$OPENCODE_INSTALL_DIR` - Prilagođeni instalacijski direktorij
2. `$XDG_BIN_DIR` - Putanja usklađena sa XDG Base Directory specifikacijom
3. `$HOME/bin` - Standardni korisnički bin direktorij (ako postoji ili se može kreirati)
4. `$HOME/.opencode/bin` - Podrazumijevana rezervna lokacija

```bash
# Primjeri
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://agentx.js.org/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://agentx.js.org/install | bash
```

### Agenti

AgentX Code uključuje dva ugrađena agenta između kojih možeš prebacivati tasterom `Tab`.

- **build** - Podrazumijevani agent sa punim pristupom za razvoj
- **plan** - Agent samo za čitanje za analizu i istraživanje koda
  - Podrazumijevano zabranjuje izmjene datoteka
  - Traži dozvolu prije pokretanja bash komandi
  - Idealan za istraživanje nepoznatih codebase-ova ili planiranje izmjena

Uključen je i **general** pod-agent za složene pretrage i višekoračne zadatke.
Koristi se interno i može se pozvati pomoću `@general` u porukama.

Saznaj više o [agentima](https://agentx.js.org/docs/agents).

### Dokumentacija

Za više informacija o konfiguraciji AgentX Code-a, [**pogledaj dokumentaciju**](https://agentx.js.org/docs).

### Doprinosi

Ako želiš doprinositi AgentX Code-u, pročitaj [upute za doprinošenje](./CONTRIBUTING.md) prije slanja pull requesta.

### Gradnja na AgentX Code-u

Ako radiš na projektu koji je povezan s AgentX Code-om i koristi "opencode" kao dio naziva, npr. "opencode-dashboard" ili "opencode-mobile", dodaj napomenu u svoj README da projekat nije napravio AgentX Code tim i da nije povezan s nama.

---

**Pridruži se našoj zajednici** [Discord](https://discord.gg/opencode) | [X.com](https://x.com/opencode)
