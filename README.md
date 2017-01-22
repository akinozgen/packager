Packager Windows Paket Yöneticisi
=================================

Packager sayesinde GNU/Linux tabanlı sistemlerde kullanılan paket yönetimi mantığı ile windows programlarınızı buradan yönetebileceksiniz.
Gelişmeleri twitter hesabı (@winpackager) üzerinden takip edebilirsiniz...

Değişiklikler için CHANGELOG.md dosyasına göz atabilirsiniz. Değişiklikleri twitter üzerinden duyurmaya çalışacağım...

Aktif Özellikler
----------------
1. Çalıştır
2. Kaldırma
3. Listeleme
5. Kurulum (özel dizin belirtme, özel sürüm belirtme)
6. Nerede özelliği
7. Kurulabilecek paketleri listeleme
8. İstenilen paketin sürümlerini listeleme
9. Liste güncelleme
10. URI protokol ile komut yürütme (packager://calistir/npp örneğindeki gibi)

Kullanımı
---------
>Not: Güncelleme işlemi için updateRepositories.js dosyasındaki url değişkeninin düzenlenmesi gerekmektedir. Sunucu dosyaları ana dizindeki server içindedir. İndirmeler için de uzak sunucu dosyaları içindeki packages.json dosyasındaki bazı url strignlerinin değiştirilmesi gerekebilir...


```
Kullanım: packager [seçenekler] [--seçenekler]
-h, --help                                 Kullanım yardımı
-V, --version                              Sürü bilgisi
calistir [paket_kodu]                      İstenilen pakete ait program çalıştırılır.
guncelle                                   Paket listesini Günceller.
kur [paket_kodu[, sürüm, kurulacak_dizin]] Belirtilen paketi kurar.
kaldir [paket_kodu]                        Belirtilen paketi kaldırır.
listele                                    Kurulu paketleri gösterir.
nerede [paket_kodu]                        İstenilen paketin kurulum dizinini gösterir.
nelervar                                   Kurulabilecek paketleri gösterir.
surumler [paket_kodu]                      Belirtilen paketin sürümlerini listeler.

Seçenekler:
-t --tip=<konsol|handle>                   Çıktıyı komut satırı veya handle için değiştirir. Öntanımlı olarak konsol seçilidir                                   
```

İleride Eklenecekler
====================
1. Aktif Sunucu (PHP)
2. Handler ile kısayol oluşturma, kayıt defterine işleme ve silme, URI protokol komutlarını yakalama ve işleme yapılacak.
3. Kurulmamış paketler arasında arama seçeneği eklenecek.

Demo Kurulum Yönergeleri
------------------------
Server klasörü içindeki dosyaları sanal sunucunuzun ana dizine veya ayarladığınız herhangi bir dizine atın. updateRepositories.js dosyası içinde url stringindeki url'yi attığınız sunucu dosyaları ile aynı olarak değiştirin. İlk çalıştırmada oluşturulacak dizinler ve kaydedilecek ortam değişkenleri sebebiyle yönetici olarak çalıştırmak gerekebilir. Paket kurulumu için internete ihtiyaç duyar. Şu an sadece Notepad++ 6.0.9 sürümü mevcut (npp paket kodu ile).

Açıklamadaki komutlar ile paket kaldırma, kurma, listeleme depo güncelleme gibi işlemleri yapabilmektedir.
