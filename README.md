# AI Clone Assistant - Dijital İkiziniz

Yapay zeka destekli kişisel asistanınız. Tüm freelance işlerinizi, GitHub yönetiminizi, sosyal medya hesaplarınızı ve daha fazlasını yöneten otonom bir AI sistemi.

## Özellikler

### 🐙 GitHub Yönetimi
- Repo listeleme, oluşturma, silme
- Otomatik commit ve push
- Pull request yönetimi
- Issue takibi
- Branch yönetimi

### 🚀 Otomatik Deploy
- Vercel entegrasyonu
- Netlify desteği
- Otomatik CI/CD
- Sunucu yönetimi

### 💼 Freelance İş Yönetimi
- Upwork, Freelancer, Fiverr entegrasyonu
- Otomatik iş arama
- Teklif hazırlama
- Proje takibi

### 📱 Sosyal Medya Yönetimi
- Twitter, LinkedIn, GitHub
- Otomatik post paylaşımı
- Etkileşim takibi
- Analytics

### 🌐 Web Otomasyon
- Web scraping
- Veri toplama
- Tarayıcı otomasyonu
- API entegrasyonları

### 💻 Kod Geliştirme
- Otomatik kod yazma
- Bug düzeltme
- Kod analizi
- Test yazımı

### 📊 Proje Takibi
- Görev yönetimi
- İlerleme raporları
- Zamanlanmış görevler
- Bildirimler

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Environment variables dosyasını oluştur
cp .env.example .env

# .env dosyasını düzenle ve API anahtarlarını ekle

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
npm start
```

## Environment Variables

`.env` dosyasına şu anahtarları ekleyin:

```
ANTHROPIC_API_KEY=your_key
GITHUB_TOKEN=your_token
VERCEL_TOKEN=your_token
```

## Kullanım

1. Tarayıcınızda `http://localhost:3000` adresini açın
2. Komut merkezinden istediğiniz komutu yazın
3. Önceden tanımlı butonları kullanabilirsiniz
4. Sistem loglarından işlemleri takip edin

## Komut Örnekleri

- "GitHub repolarımı listele"
- "Yeni Next.js projesi oluştur ve deploy et"
- "Sosyal medya hesaplarımı kontrol et"
- "Freelance platformlarında yeni işleri kontrol et"
- "Son projeyi Vercel'e deploy et"
- "Tüm repolarıma yeni README ekle"

## Deploy

Vercel'e deploy etmek için:

```bash
vercel deploy --prod
```

## Teknolojiler

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Anthropic Claude AI
- Octokit (GitHub API)
- Puppeteer (Web Automation)
- Node-cron (Task Scheduling)

## Güvenlik

- API anahtarları .env dosyasında saklanır
- GitHub token'ları şifrelenir
- HTTPS zorunlu
- Rate limiting aktif

## Lisans

MIT

## Destek

Herhangi bir sorun için issue açabilirsiniz.
