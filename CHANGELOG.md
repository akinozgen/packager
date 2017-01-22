22.01.2017
----------
1. URI komutlarını yakalamak ve işlemek için c# ile bir handler yazıldı.
2. Handler için özel çıktılar türetildi. -t parametresi değerine göre farklı çıktılar ayarlandı.
3. Handler bu farklı çıktıları kendi içinde yorumlayıp özet formunda listeleyebiliyor.
4. Logo tasarlandı. Handler için icon olarak kullanıldı. Artık boş packager kısayollarında bu ikon görünüyor.


19.01.2017
----------
1. Çalıştır komutu
2. URI komutlarını yakalama ve işleme


17.01.2017
----------
1. İndirime sırasında indirme durumunu göstermek için progress bar eklendi.
2. Spesifik sürüm belirtme eklendi.
3. Kurulabilecek paketler komutu eklendi.
4. Kurulabilecek paketler ve kurulumuş paketleri komutlarının çıktılarına paket kodu sütunu eklendi.
5. Belirtilen paketin sürümlerini listeleme eklendi. Depo sürüm yapısında değişiklik yapıldı.


14.01.2017
----------
1. Package isminde tekil paket için özel nesne sınıfı eklendi.
2. Package sınıfında paketin kurulumu, kontrolleri ve kaldırma işlemleri yapılabiliyor.
3. Yeni sınıf ile işlemler daha basit ve modüler hale getirildi. Kod ve zamandan tasarruf edildi.
4. Anlık loglamalar fazlalaştırıldı. Log sisteminde log-timestamp modülü kullanıldı.
5. Loglarda renk tüm satıra verildi. Durum parametresinin yerini zaman damgası aldı.
6. Özel modüller modules/ dizini altında toplanarak kalabalık önlendi.
