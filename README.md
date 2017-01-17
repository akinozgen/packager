Packager Windows Paket Yöneticisi 0.0.1
=================================

Packager sayesinde GNU/Linux tabanlı sistemlerde kullanılan paket yönetimi ile windows programlarınızı buradan yönetebileceksiniz.

Aktif Özellikler
----------------
1. Liste güncelleme
2. Kaldırma
3. Listeleme
5. Kurulum (özel dizin belirtme, özel sürüm belirtme)
6. Nerede özelliği

17.01.2017 - Eklenen Özellikler
-------------------------------
1. İndirime sırasında indirme durumunu göstermek için progress bar eklendi.
2. Spesifik sürüm belirtme eklendi.
3. Kurulabilecek paketler komutu eklendi.
4. Kurulabilecek paketler ve kurulumuş paketleri komutlarının çıktılarına paket kodu sütunu eklendi.


14.01.2017 - Eklenen Özellikler
----------------------------
1. Package isminde tekil paket için özel nesne sınıfı eklendi.
2. Package sınıfında paketin kurulumu, kontrolleri ve kaldırma işlemleri yapılabiliyor.
3. Yeni sınıf ile işlemler daha basit ve modüler hale getirildi. Kod ve zamandan tasarruf edildi.
4. Anlık loglamalar fazlalaştırıldı. Log sisteminde log-timestamp modülü kullanıldı.
5. Loglarda renk tüm satıra verildi. Durum parametresinin yerini zaman damgası aldı.
6. Özel modüller modules/ dizini altında toplanarak kalabalık önlendi.

Kullanımı
---------
>Not: Güncelleme işlemi için updateRepositories.js dosyasındaki url değişkeninin düzenlenmesi gerekmektedir. Sunucu dosyaları ana dizindeki server içindedir.


```
Kullanım: packager [seçenekler]
-h, --help                                 Kullanım yardımı
-V, --version                              Sürü bilgisi
guncelle                      [            Paket listesini Günceller.
kur [paket_kodu[, sürüm, kurulacak_dizin]] Belirtilen paketi kurar.
kaldir [paket_kodu]                        Belirtilen paketi kaldırır.
listele                                    Kurulu paketleri gösterir.
nerede [paket_kodu]                        İstenilen paketin kurulum dizinini gösterir.
nelervar                                   Kurulabilecek paketleri gösterir.
```

İleride Eklenecekler
====================
1. Modules/ dizini içindeki modüllerin dosya hali yerine npm modülü gibi alt bir klasör ve kendilerine ait bağımlılıkların bu klasörlerde toplanması
2. URI protokol ile programlar 'packager://calistir/npp' örneğindeki gibi çalıştırılacak ve kısayollar internet kısayolu formatında olacak (Steam gibi)
3. Aktif Sunucu (PHP)
4. Kurulabilecek paketler komutu gibi belirtilen paket için sürümleri gösterme özelliği

Demo Kurulum Yönergeleri
------------------------
Server klasörü içindeki dosyaları sanal sunucunuzun ana dizine veya ayarladığınız herhangi bir dizine atın. updateRepositories.js dosyası içinde url stringindeki url'yi attığınız sunucu dosyaları ile aynı olarak değiştirin. İlk çalıştırmada oluşturulacak dizinler ve kaydedilecek ortam değişkenleri sebebiyle yönetici olarak çalıştırmak gerekebilir. Paket kurulumu için internete ihtiyaç duyar. Şu an sadece Notepad++ 6.0.9 sürümü mevcut (npp paket kodu ile).

Açıklamadaki komutlar ile paket kaldırma, kurma, listeleme depo güncelleme gibi işlemleri yapabilmektedir.
