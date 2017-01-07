Packager Windows Paket Yöneticisi 0.0.1
=================================

Packager sayesinde GNU/Linux tabanlı sistemlerde kullanılan paket yönetimi ile programlarınızı buradan yönetebileceksiniz.

Aktif Özellikler
----------------
1. Liste güncelleme
2. Kaldırma
3. Listeleme

Kullanımı
---------
>Not: Güncelleme işlemi için updateRepositories.js dosyasındaki url değişkeninin düzenlenmesi gerekmektedir. Sunucu dosyaları ana dizindeki server içindedir.


```
Usage: packager [options]
-h, --help           output usage information
-V, --version        output the version number
guncelle             Paket Listesini Günceller.
kur [paket_kodu]     Belirtilen Paketi Kurar.
kaldir [paket_kodu]  Belirtilen Paketi Kaldırır.
listele              Kurulu Paketleri Gösterir.
nerede [paket_kodu]  İstenilen Paketin Kurulum Dizinini Gösterir.
```

İleride Eklenecekler
====================

1. Paket Kurulumu
2. Paket Kurulum Dizini Sorgulama
3. Paket Kurulumuna Kurulacak Dizini Belirtme
4. Aktif Sunucu (PHP)
