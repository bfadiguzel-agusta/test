# Todo App - Jira/Trello Benzeri Proje Yönetim Uygulaması

Modern, responsive ve kullanıcı dostu bir proje yönetim uygulaması. Jira ve Trello'nun en iyi özelliklerini birleştiren bu uygulama, ekiplerin projelerini etkili bir şekilde organize etmelerini sağlar.

## 🚀 Özellikler

### 🔐 Kimlik Doğrulama ve Yetkilendirme
- JWT tabanlı güvenli authentication sistemi
- Rol bazlı erişim kontrolü (Admin, User)
- Proje bazlı roller (Admin, Developer, Viewer)

### 📊 Proje Yönetimi
- Çoklu proje desteği
- Proje bazlı kullanıcı atamaları
- Rol bazlı yetkilendirme

### 📋 Kanban Pano Sistemi
- Drag & drop ile görev yönetimi
- Özelleştirilebilir pano yapısı
- Gerçek zamanlı görev durumu güncellemeleri

### ✅ Görev Yönetimi
- Detaylı görev oluşturma ve düzenleme
- Öncelik seviyeleri (Düşük, Orta, Yüksek, Acil)
- Durum takibi (Todo, In Progress, Testing, Done)
- Kullanıcı atamaları
- Son tarih takibi

### 👥 Kullanıcı Yönetimi
- Admin paneli ile kullanıcı yönetimi
- Proje bazlı kullanıcı atamaları
- Rol değiştirme ve kullanıcı deaktivasyonu

## 🛠 Teknoloji Stack

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Tip güvenli JavaScript
- **TypeORM** - ORM ve veritabanı yönetimi
- **PostgreSQL** - İlişkisel veritabanı
- **JWT** - Authentication
- **Swagger** - API dokümantasyonu

### Frontend
- **Nuxt.js 3** - Vue.js framework
- **Vue 3** - Composition API
- **TypeScript** - Tip güvenli geliştirme
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **Vue Draggable** - Drag & drop işlevselliği

### DevOps
- **Docker** - Konteynerleştirme
- **Docker Compose** - Çoklu konteyner yönetimi

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose (opsiyonel)

### 1. Projeyi klonlayın
```bash
git clone <repository-url>
cd todo
```

### 2. Environment dosyalarını oluşturun

Backend için:
```bash
cp backend/.env.example backend/.env
```

Frontend için environment değişkenlerini `nuxt.config.ts` içinde ayarlayın.

### 3. Docker ile çalıştırma (Önerilen)
```bash
docker-compose up -d
```

Bu komut:
- PostgreSQL veritabanını başlatır
- Backend API'yi port 3001'de başlatır
- Frontend'i port 3000'de başlatır

### 4. Manuel kurulum

#### Backend
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Veritabanı
PostgreSQL'i başlatın ve `todoapp` veritabanını oluşturun:
```sql
CREATE DATABASE todoapp;
```

## 🎯 Kullanım

### İlk Kurulum
1. Uygulamaya `http://localhost:3000` adresinden erişin
2. Kayıt olun (ilk kullanıcı otomatik olarak admin olur)
3. Dashboard'dan ilk projenizi oluşturun
4. Proje içinde panolar oluşturun
5. Görevlerinizi ekleyin ve yönetin

### Kullanıcı Rolleri

#### Sistem Rolleri
- **Admin**: Tüm sistem yönetimi, kullanıcı yönetimi, tüm projelere erişim
- **User**: Atandığı projelere erişim

#### Proje Rolleri
- **Admin**: Proje ayarları, kullanıcı atamaları, tüm işlemler
- **Developer**: Görev oluşturma/düzenleme, pano yönetimi
- **Viewer**: Sadece görüntüleme

## 📱 Ekran Görüntüleri

### Dashboard
- Proje özeti ve istatistikler
- Atanan görevlerin listesi
- Hızlı erişim linkleri

### Proje Yönetimi
- Kanban panoları
- Drag & drop görev yönetimi
- Görev detayları ve düzenleme

### Admin Paneli
- Kullanıcı yönetimi
- Proje atamaları
- Sistem istatistikleri

## 🔧 API Dokümantasyonu

Backend çalıştıktan sonra Swagger dokümantasyonuna erişin:
```
http://localhost:3001/api/docs
```

## 🧪 Test

```bash
# Backend testleri
cd backend
npm run test

# Frontend testleri
cd frontend
npm run test
```

## 📝 Geliştirme

### Backend Geliştirme
```bash
cd backend
npm run start:dev  # Development mode
npm run start:debug  # Debug mode
```

### Frontend Geliştirme
```bash
cd frontend
npm run dev  # Development mode
```

### Veritabanı Migrasyonları
```bash
cd backend
npm run migration:generate  # Yeni migrasyon oluştur
npm run migration:run       # Migrasyonları çalıştır
```

## 🚀 Deployment

### Docker ile Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Manuel Deployment
1. Backend'i build edin: `npm run build`
2. Frontend'i build edin: `npm run build`
3. Production sunucusunda servisleri başlatın

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🆘 Destek

Sorunlar için GitHub Issues kullanın veya [email] ile iletişime geçin.

## 🎉 Teşekkürler

Bu projeyi geliştirirken kullanılan açık kaynak projelere teşekkürler:
- NestJS
- Nuxt.js
- Tailwind CSS
- TypeORM
- Ve diğer tüm bağımlılıklar
