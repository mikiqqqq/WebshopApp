CREATE TABLE PROIZVOD
(
    ID       NUMBER PRIMARY KEY AUTO_INCREMENT,
    NAZIV    VARCHAR(41),
    OPIS     VARCHAR(255),
    CIJENA   DECIMAL,
    KOLICINA NUMBER,
    BRAND_ID NUMBER
);

CREATE TABLE BRAND
(
    ID    NUMBER PRIMARY KEY AUTO_INCREMENT,
    NAZIV VARCHAR(255)
);

CREATE TABLE NARUDZBA
(
    ID                  NUMBER PRIMARY KEY AUTO_INCREMENT,
    DATUM               DATETIME,
    UKUPNA_CIJENA_BEZ_P DECIMAL,
    UKUPNA_CIJENA_S_P   DECIMAL,
    KOD_ZA_POPUST_ID    NUMBER,
    NACIN_PLACANJA_ID   NUMBER,
    BROJ_KARTICE        VARCHAR(12),
    EMAIL               VARCHAR(255),
    BROJ_MOBITELA       NUMBER(15),
    ADRESA_DOSTAVE      VARCHAR(255),
    NAPOMENA            VARCHAR(255)
);

CREATE TABLE NARUDZBA_PROIZVODI
(
    ID          NUMBER PRIMARY KEY AUTO_INCREMENT,
    NARUDZBA_ID NUMBER,
    PROIZVOD_ID NUMBER
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

INSERT INTO PROIZVOD (NAZIV, OPIS) VALUES ('mis', 'mis za igranje');
INSERT INTO PROIZVOD (NAZIV, OPIS) VALUES ('laptop', 'laptop za igranje');