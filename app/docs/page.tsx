import { BookOpen, Download, Lock, Phone, Server, Shield, Terminal, Wifi } from "lucide-react";
import Link from "next/link";

import Footer from "@/components/sections/footer/default";
import Navbar from "@/components/sections/navbar/default";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { getLatestRelease } from "@/lib/releases";

const sections = [
  { id: "quick-start", label: "Quick Start" },
  { id: "installation", label: "Installation" },
  { id: "build-from-source", label: "Build from Source" },
  { id: "usage", label: "Usage Guide" },
  { id: "web-ui", label: "Web UI" },
  { id: "how-it-works", label: "How It Works" },
  { id: "protocol", label: "Wire Protocol" },
  { id: "api-reference", label: "API Reference" },
  { id: "security", label: "Security Model" },
  { id: "configuration", label: "Configuration" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

export const metadata = {
  title: "Documentation",
  description: "Comprehensive documentation for OnionCall — secure P2P voice over Tor.",
};

function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 border-l-2 border-transparent hover:border-primary pl-4 -ml-4"
    >
      {children}
    </a>
  );
}

export default async function DocsPage() {
  // Pull the live release tag so every install command below always points at
  // the latest version — no manual updates when a new release is tagged.
  const release = await getLatestRelease();
  const v = release.version.replace(/^v/, "");

  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <Navbar showNavigation={false} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-28 space-y-1">
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <BookOpen className="h-4 w-4" />
                <span>Contents</span>
              </div>
              {sections.map((s) => (
                <SectionLink key={s.id} href={`#${s.id}`}>
                  {s.label}
                </SectionLink>
              ))}
            </div>
          </aside>

          {/* Content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <div className="mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-3">
                Documentation
              </h1>
              <p className="text-lg text-muted-foreground">
                Everything you need to install, configure, and use OnionCall for secure P2P voice communication over Tor.
              </p>
            </div>

            {/* ── Quick Start ── */}
            <section id="quick-start" className="scroll-mt-24 mb-16">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                Quick Start
              </h2>
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <p>Get OnionCall running in under a minute:</p>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono">
                    <code>{`# 1. Download the latest Linux binary
curl -L -o onioncall.tar.gz https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/onioncall_${v}_Linux_x86_64.tar.gz
tar xzf onioncall.tar.gz

# 2. Run OnionCall
./onioncall

# 3. Open http://localhost:8080/ in your browser
# 4. Wait for Tor to bootstrap (green checkmark)
# 5. Share your .onion address with a peer
# 6. Start talking!`}</code>
                  </pre>
                </div>
                <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-1">Prerequisites</strong>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Linux or Windows (macOS coming soon)</li>
                      <li>Tor (bundled automatically)</li>
                      <li>libopus (for Opus audio codec)</li>
                      <li>Browser (Chrome, Firefox, or Safari)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Installation ── */}
            <section id="installation" className="scroll-mt-24 mb-16">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Installation
              </h2>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Linux (Debian/Ubuntu)</h3>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono">
                    <code>{`# Install dependencies
sudo apt-get update
sudo apt-get install -y tor libopus-dev

# Download and run
curl -L -o onioncall.tar.gz https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/onioncall_${v}_Linux_x86_64.tar.gz
tar xzf onioncall.tar.gz
./onioncall`}</code>
                  </pre>
                </div>

                <h3 className="text-xl font-semibold">Linux Desktop App (recommended)</h3>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono">
                    <code>{`# .deb (Debian/Ubuntu) — install with:
curl -L -o OnionCall_${v}_amd64.deb https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/OnionCall_${v}_amd64.deb
sudo dpkg -i OnionCall_${v}_amd64.deb

# Or the AppImage — runs on any Linux distro, no install:
curl -L -o OnionCall.AppImage https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/OnionCall_${v}_amd64.AppImage
chmod +x OnionCall.AppImage
./OnionCall.AppImage`}</code>
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground">
                  The desktop app wraps the same Go backend and web UI in a native window —
                  Tor starts automatically, and your <code>.onion</code> address is ready to share.
                </p>

                <h3 className="text-xl font-semibold">Windows (64-bit)</h3>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono">
                    <code>{`# Download the Windows build
curl -L -o onioncall_Windows_x86_64.zip https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/onioncall_${v}_Windows_x86_64.zip

# Extract the zip (right-click → Extract All), then run:
onioncall.exe`}</code>
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground">
                  macOS builds are planned. For a one-click Windows setup with Tor and SoX bundled,
                  use the NSIS installer (see <code>terminalphone/scripts/windows/</code>).
                </p>

                <h3 className="text-xl font-semibold">Using the Installer</h3>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono">
                    <code>{`# The installer ships in its own archive
curl -L -o onioncall-installer.tar.gz https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/onioncall-installer_${v}_Linux_x86_64.tar.gz
tar xzf onioncall-installer.tar.gz

# Run installer (installs Tor and libopus system dependencies)
./onioncall-installer

# Dry run mode (see what would be installed)
./onioncall-installer --dry-run`}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* ── Build from Source ── */}
            <section id="build-from-source" className="scroll-mt-24 mb-16">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Build from Source
              </h2>
              <div className="space-y-4">
                <p>Requires <strong>Go ≥1.20</strong> and <strong>libopus-dev</strong> (or equivalent).</p>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono">
                    <code>{`# Clone the repository
git clone https://gitlab.com/kumaranubhav20026/terminalphone.git
cd terminalphone

# Install dependencies
sudo apt-get install -y tor libopus-dev

# Build the binary (embeds the web UI automatically)
go mod tidy
CGO_ENABLED=1 go build -o onioncall ./cmd/terminalphone

# Run
./onioncall`}</code>
                  </pre>
                </div>

                <h3 className="text-xl font-semibold mt-6">Development Mode (hot-reload frontend)</h3>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono">
                    <code>{`# Terminal 1: Start Go backend
cd terminalphone
go run ./cmd/terminalphone

# Terminal 2: Start Vite dev server
cd terminalphone/ui
npm install
npm run dev`}</code>
                  </pre>
                </div>

                <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <Shield className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>CGO note:</strong> OnionCall uses <code>go-sqlite3</code> which requires CGO. Cross-compilation for different platforms needs a C cross-compiler (e.g., <code>mingw-w64</code> for Windows).
                  </div>
                </div>
              </div>
            </section>

            {/* ── Usage Guide ── */}
            <section id="usage" className="scroll-mt-24 mb-16">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Wifi className="h-5 w-5 text-primary" />
                Usage Guide
              </h2>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Making a Call</h3>
                <ol className="space-y-3 list-decimal pl-5">
                  <li>Launch OnionCall — it starts Tor automatically and generates your <code>.onion</code> address</li>
                  <li>On the <strong>Calls</strong> page, your <code>.onion</code> address is displayed — copy it</li>
                  <li>Send your address to a peer through any channel (Signal, Telegram, in person)</li>
                  <li>Enter their <code>.onion</code> address in the &quot;Call&quot; field and press <strong>Call</strong></li>
                  <li>Once connected, hold the <strong>PTT (Push-to-Talk)</strong> button to speak</li>
                  <li>Release to listen — it works like a walkie-talkie!</li>
                </ol>

                <h3 className="text-xl font-semibold">Receiving a Call</h3>
                <ol className="space-y-3 list-decimal pl-5">
                  <li>Click <strong>Listen</strong> on the Calls page to start listening for incoming connections</li>
                  <li>Share your <code>.onion</code> address with peers who want to call you</li>
                  <li>When someone connects, you&apos;ll hear a chime and the session state will show &quot;Connected&quot;</li>
                  <li>Hold PTT to reply</li>
                </ol>

                <h3 className="text-xl font-semibold">Text Messaging</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Once connected, switch to the <strong>Chat</strong> tab to send encrypted text messages</li>
                  <li>Messages are encrypted end-to-end with the same shared secret as audio</li>
                  <li>Perfect for sharing links, notes, or quick replies without breaking voice flow</li>
                </ul>

                <h3 className="text-xl font-semibold">Audio Settings</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li><strong>Gain:</strong> Adjust microphone sensitivity (0-3.0) in Settings or Audio panel</li>
                  <li><strong>Loopback Test:</strong> Test your audio setup by recording and playing back locally</li>
                  <li><strong>Mute:</strong> Toggle microphone on/off during a call</li>
                  <li><strong>Spectroscope:</strong> Visual audio frequency analyzer to monitor your signal</li>
                </ul>
              </div>
            </section>

            {/* ── Web UI ── */}
            <section id="web-ui" className="scroll-mt-24 mb-16">
              <h2 className="text-2xl font-bold mb-4">Web UI</h2>
              <p className="mb-4">OnionCall provides a complete web interface at <code>http://localhost:8080/</code>:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 pr-4 font-semibold">Page</th>
                      <th className="text-left py-3 pr-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3 pr-4 font-medium">Dashboard</td>
                      <td className="py-3 text-muted-foreground">Tor bootstrap progress, secret status, session state, audio capture status</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium">Calls</td>
                      <td className="py-3 text-muted-foreground">Listen for calls, dial .onion addresses, PTT button, hangup</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium">Audio</td>
                      <td className="py-3 text-muted-foreground">Start/stop audio pipeline, capture controls, loopback test, spectroscope, gain</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium">Chat</td>
                      <td className="py-3 text-muted-foreground">Send and receive encrypted text messages during a call</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium">Settings</td>
                      <td className="py-3 text-muted-foreground">Relay mode, Snowflake proxy, auto-listen, mute, gain, dark mode</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── How It Works ── */}
            <section id="how-it-works" className="scroll-mt-24 mb-16">
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <p className="mb-4">OnionCall uses a push-to-talk (PTT) audio model, similar to a walkie-talkie:</p>
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <div className="text-center text-sm text-muted-foreground space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Badge>🎤 Mic</Badge>
                    <span className="text-lg">→</span>
                    <Badge variant="secondary">Opus Encode</Badge>
                    <span className="text-lg">→</span>
                    <Badge variant="secondary">Encrypt</Badge>
                    <span className="text-lg">→</span>
                    <Badge variant="outline">🌐 Tor Network</Badge>
                    <span className="text-lg">→</span>
                    <Badge variant="secondary">Decrypt</Badge>
                    <span className="text-lg">→</span>
                    <Badge variant="secondary">Opus Decode</Badge>
                    <span className="text-lg">→</span>
                    <Badge>🔊 Speaker</Badge>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                When you press the PTT button, the microphone captures audio in 20ms frames. These are
                Opus-encoded at 48kHz mono (32kbps), encrypted with AES-256-CBC (key derived
                from your shared secret), and transmitted over the Tor hidden service connection.
                The receiver decrypts, decodes, and plays the audio.
              </p>
            </section>

            {/* ── Wire Protocol ── */}
            <section id="protocol" className="scroll-mt-24 mb-16">
              <h2 className="text-2xl font-bold mb-4">Wire Protocol</h2>
              <p className="mb-4">The protocol is newline-delimited text over a TCP connection routed through Tor:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 pr-4 font-semibold">Message</th>
                      <th className="text-left py-3 pr-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr><td className="py-3 pr-4 font-mono text-xs">ID:&lt;onion&gt;</td><td className="py-3 text-muted-foreground">Caller&apos;s .onion address</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">CIPHER:&lt;name&gt;</td><td className="py-3 text-muted-foreground">Encryption cipher name</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">PING</td><td className="py-3 text-muted-foreground">Keepalive heartbeat</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">PTT_START / PTT_STOP</td><td className="py-3 text-muted-foreground">Push-to-talk state change</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">AUDIO:&lt;base64&gt;</td><td className="py-3 text-muted-foreground">Encrypted Opus audio frame</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">MSG:&lt;base64&gt;</td><td className="py-3 text-muted-foreground">Encrypted text message</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">HANGUP</td><td className="py-3 text-muted-foreground">End the call</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── API Reference ── */}
            <section id="api-reference" className="scroll-mt-24 mb-16">
              <h2 className="text-2xl font-bold mb-4">API Reference</h2>
              <p className="mb-4">The backend exposes a REST API at <code>http://localhost:8080/api/</code>:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 pr-4 font-semibold">Endpoint</th>
                      <th className="text-left py-3 pr-4 font-semibold">Method</th>
                      <th className="text-left py-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/status</td><td className="py-3 pr-4">GET</td><td className="py-3 text-muted-foreground">Full app, Tor, secret, session, and audio state</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/tor/start</td><td className="py-3 pr-4">POST</td><td className="py-3 text-muted-foreground">Start Tor and hidden service</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/tor/stop</td><td className="py-3 pr-4">POST</td><td className="py-3 text-muted-foreground">Stop Tor</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/tor/onion</td><td className="py-3 pr-4">GET</td><td className="py-3 text-muted-foreground">Current .onion address</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/tor/rotate</td><td className="py-3 pr-4">POST</td><td className="py-3 text-muted-foreground">Generate new .onion address</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/session/listen</td><td className="py-3 pr-4">POST</td><td className="py-3 text-muted-foreground">Start listening for incoming calls</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/session/call</td><td className="py-3 pr-4">POST</td><td className="py-3 text-muted-foreground">Call a .onion address</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/session/hangup</td><td className="py-3 pr-4">POST</td><td className="py-3 text-muted-foreground">Hang up current call</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/session/ptt</td><td className="py-3 pr-4">POST</td><td className="py-3 text-muted-foreground">Send PTT start/stop</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/session/message</td><td className="py-3 pr-4">POST</td><td className="py-3 text-muted-foreground">Send encrypted text message</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/audio/start</td><td className="py-3 pr-4">POST</td><td className="py-3 text-muted-foreground">Initialize audio pipeline</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/audio/stop</td><td className="py-3 pr-4">POST</td><td className="py-3 text-muted-foreground">Shutdown audio pipeline</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/audio/gain</td><td className="py-3 pr-4">GET/POST</td><td className="py-3 text-muted-foreground">Microphone gain level (0-3)</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/api/audio/loopback/start</td><td className="py-3 pr-4">POST</td><td className="py-3 text-muted-foreground">Start loopback test</td></tr>
                    <tr><td className="py-3 pr-4 font-mono text-xs">/healthz</td><td className="py-3 pr-4">GET</td><td className="py-3 text-muted-foreground">Health check</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── Security Model ── */}
            <section id="security" className="scroll-mt-24 mb-16">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Security Model
              </h2>
              <div className="space-y-4">
                <div className="bg-card border rounded-lg p-5">
                  <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    All audio and text is encrypted with AES-256-CBC (PBKDF2-derived key)
                    before entering the Tor network. Only your peer with the shared secret can decrypt.
                  </p>
                </div>
                <div className="bg-card border rounded-lg p-5">
                  <h3 className="font-semibold mb-2">Transport Security</h3>
                  <p className="text-sm text-muted-foreground">
                    All data routes through Tor hidden service circuits — three layers of encryption
                    bounced through volunteer-operated relays. Neither party&apos;s IP address is exposed.
                    No cleartext traffic ever leaves your machine.
                  </p>
                </div>
                <div className="bg-card border rounded-lg p-5">
                  <h3 className="font-semibold mb-2">Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    The shared secret serves as implicit authentication. If both parties don&apos;t have
                    the same secret, decryption fails. No accounts, no usernames, no passwords to leak.
                  </p>
                </div>
                <div className="bg-card border rounded-lg p-5">
                  <h3 className="font-semibold mb-2">No Metadata</h3>
                  <p className="text-sm text-muted-foreground">
                    OnionCall does not log call metadata — no call duration, no IP addresses,
                    no timestamps, no contact lists. Tor hidden services ensure the Tor network
                    itself cannot learn who is communicating with whom.
                  </p>
                </div>
                <div className="bg-card border rounded-lg p-5">
                  <h3 className="font-semibold mb-2">Replay Protection</h3>
                  <p className="text-sm text-muted-foreground">
                    Every protocol message includes a random nonce. Seen nonces are tracked
                    to prevent replay attacks.
                  </p>
                </div>
              </div>
            </section>

            {/* ── Configuration ── */}
            <section id="configuration" className="scroll-mt-24 mb-16">
              <h2 className="text-2xl font-bold mb-4">Configuration</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Tor Configuration</h3>
                <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
                  <li>Tor is managed automatically — no manual configuration needed</li>
                  <li>Hidden service keys are stored in <code>data/tor/hidden_service/</code></li>
                  <li>Use <strong>Rotate</strong> in the UI to generate a new .onion address</li>
                  <li>Use <strong>Snowflake</strong> in Settings to enable censorship circumvention</li>
                </ul>

                <h3 className="text-xl font-semibold">Shared Secret</h3>
                <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
                  <li>Stored in <code>data/shared_secret</code> (plaintext by default)</li>
                  <li>Can be passphrase-encrypted at rest (AES-256-CBC, 100K PBKDF2 iterations)</li>
                  <li>Must match between caller and receiver for decryption to work</li>
                </ul>

                <h3 className="text-xl font-semibold">Data Directory</h3>
                <p className="text-sm text-muted-foreground">
                  All data is stored in the <code>data/</code> directory relative to the binary location,
                  or set via the <code>TP_DATA_DIR</code> environment variable.
                </p>
              </div>
            </section>

            {/* ── Troubleshooting ── */}
            <section id="troubleshooting" className="scroll-mt-24 mb-16">
              <h2 className="text-2xl font-bold mb-4">Troubleshooting</h2>
              <div className="space-y-4">
                <div className="bg-card border rounded-lg p-5">
                  <h3 className="font-semibold mb-2">Tor won&apos;t start</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                    <li>Ensure Tor is installed: <code>sudo apt install tor</code></li>
                    <li>Check the Tor logs in the Dashboard tab</li>
                    <li>Try restarting OnionCall</li>
                    <li>On some systems, you may need to stop the system Tor service first</li>
                  </ul>
                </div>
                <div className="bg-card border rounded-lg p-5">
                  <h3 className="font-semibold mb-2">No audio / microphone not working</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                    <li>Run <code>arecord -l</code> to check if your microphone is detected</li>
                    <li>Ensure <code>libopus-dev</code> is installed</li>
                    <li>Try the loopback test in the Audio panel</li>
                    <li>Adjust the gain level in Settings</li>
                  </ul>
                </div>
                <div className="bg-card border rounded-lg p-5">
                  <h3 className="font-semibold mb-2">Call connects but no audio</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                    <li>Ensure both parties have the same shared secret</li>
                    <li>Check that both parties have Tor connected</li>
                    <li>Verify your microphone isn&apos;t muted</li>
                    <li>If using Snowflake, connection may be slower — try without it</li>
                  </ul>
                </div>
                <div className="bg-card border rounded-lg p-5">
                  <h3 className="font-semibold mb-2">Browser shows blank page</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                    <li>Check the terminal for startup errors</li>
                    <li>Ensure port 8080 isn&apos;t in use by another application</li>
                    <li>Try accessing <code>http://127.0.0.1:8080/</code> instead of localhost</li>
                    <li>Clear your browser cache and reload</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Footer nav ── */}
            <div className="mt-16 pt-8 border-t flex items-center justify-between">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                ← Back to Home
              </Link>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                View on GitLab →
              </a>
            </div>
          </article>
        </div>
      </div>

      <Footer />
    </main>
  );
}
