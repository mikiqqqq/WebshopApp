CREATE TABLE BRAND
(
    ID    NUMBER PRIMARY KEY AUTO_INCREMENT,
    NAZIV VARCHAR(255)
);


CREATE TABLE PROIZVOD
(
    ID       NUMBER(11) PRIMARY KEY AUTO_INCREMENT,
    NAZIV    VARCHAR(41),
    OPIS     VARCHAR(255),
    CIJENA   DECIMAL,
    KOLICINA NUMBER,
    BRAND_ID NUMBER,
    FOREIGN KEY (BRAND_ID) REFERENCES BRAND(ID)
);

CREATE TABLE NACIN_PLACANJA
(
    ID    NUMBER PRIMARY KEY AUTO_INCREMENT,
    NAZIV VARCHAR
);

CREATE TABLE POPUST_KODOVI
(
    ID         NUMBER PRIMARY KEY AUTO_INCREMENT,
    KOD        VARCHAR,
    POPUST     DECIMAL,
    ISKORISTEN BOOLEAN
);

CREATE TABLE NARUDZBA
(
    ID                  NUMBER(11) PRIMARY KEY AUTO_INCREMENT,
    DATUM               DATETIME,
    UKUPNA_CIJENA_BEZ_P DECIMAL,
    UKUPNA_CIJENA_S_P   DECIMAL,
    KOD_ZA_POPUST_ID    NUMBER,
    NACIN_PLACANJA_ID   NUMBER,
    BROJ_KARTICE        VARCHAR(19),
    EMAIL               VARCHAR(255),
    BROJ_MOBITELA       NUMBER(15),
    ADRESA_DOSTAVE      VARCHAR(255),
    NAPOMENA            VARCHAR(255),
    FOREIGN KEY (KOD_ZA_POPUST_ID) REFERENCES POPUST_KODOVI(ID),
    FOREIGN KEY (NACIN_PLACANJA_ID) REFERENCES NACIN_PLACANJA(ID)
);


CREATE TABLE NARUDZBA_PROIZVODI
(
    ID          NUMBER PRIMARY KEY AUTO_INCREMENT,
    NARUDZBA_ID NUMBER,
    PROIZVOD_ID NUMBER,
    FOREIGN KEY (NARUDZBA_ID) REFERENCES NARUDZBA(ID),
    FOREIGN KEY (PROIZVOD_ID) REFERENCES PROIZVOD(ID)
);

INSERT INTO BRAND (NAZIV) VALUES ('Asus'), ('Razer'), ('Samsung'), ('Apple'),
                                 ('Xiaomi'), ('LG'), ('Speedlink'), ('Noa'),
                                 ('Logitech'), ('Fenix'), ('Lenovo'), ('Vivax');

INSERT INTO PROIZVOD (NAZIV, OPIS, BRAND_ID, CIJENA)
VALUES ('Speedlink Miš S50', 'Specifikacije za Speedlink Miš S50', 7, 250.00),
        ('Razer Miš T350', 'Specifikacije za Razer Miš T350', 2, 360.00),
        ('PC Fenix Ultima R9-5950X', 'Specifikacije za Stolno računalo PC Fenix Ultima R9-5950X, 64GB, 2TB M.2, RTX2060 8GB, PWS 1000W', 10, 23560.99),
        ('Lenovo ThinkStation Xeon W-2133', 'Specifikacije za Stolno računalo Lenovo ThinkStation Xeon W-2133/64GB/512GB/Quadro P4000/W10P', 11, 2350.96),
        ('Lenovo V50t Gen2','Specifikacije za Lenovo V50t Gen2 i3/8GB/256GB/IntHD/W10P/5god', 11, 5665.29),
        ('Lenovo M70s SFF G6400','Specifikacije za za Lenovo M70s SFF G6400/4GB/256GB/IntHD/W10P', 11, 4758.84),
        ('Iphone SE', 'Specifikacije za Iphone SE', 4, 8459.29),
        ('MacBook Air', 'Specifikacije za MacBook Air', 4, 11239.59),
        ('iPad Pro','Specifikacije za iPad Pro', 4, 3480),
        ('Vivax LED TV-49S60T2S2SM', 'Novi Smart TV s Android sustavom 7.1 omogućava povezanost putem interneta ili društvenih mreža, a sve to na velikom ekranu.', 12, 2359.29),
        ('Vivax IMAGO LED TV-32LE95T2', 'Posebno ergonomski dizajniran televizor koji umjesto klasičnog postolja ima nogice koje doprinose ukupnoj eleganciji televizora.', 12, 3380.79),
        ('Xiaomi 11 Lite 5G NE', 'Specifikacije za Xiaomi 11 Lite 5G NE', 5, 6679.59),
        ('Noa Element Mobitel', 'Specifikacije za Noa Element Mobitel', 8, 899.49),
        ('LOGITECH H820E HEADSET', 'Bežične slušalice za poslovne razgovore', 9, 349.89),
        ('Galaxy Z Fold3 5G', 'Specifkacije za Galaxy Z Fold3 5G', 3, 8129.59),
        ('LG 75" (189 cm) 4K HDR Smart Nano Cell TV', 'Čiste boje (Pure Colors) u razlučivosti Real 4K, Tehnologija NanoCell, 4K procesor LG α5 Gen5 AI', 6, 5579.29),
        ('16" ProArt Studiobook Pro 16 OLED', 'Windows 11 Pro, Intel® Core™ i9-12900H processor, NVIDIA RTX™ A3000 12GB graphics', 1, 8888.88);







INSERT INTO NACIN_PLACANJA (NAZIV) VALUES ('KARTIČNO'), ('GOTOVINSKO');

INSERT INTO POPUST_KODOVI (KOD, ISKORISTEN) VALUES ('12EY-18U3-FDO1-VR34', true), ('1111-2222-3333-4444', false);