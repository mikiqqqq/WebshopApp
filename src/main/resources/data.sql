CREATE TABLE BRAND
(
    ID    NUMBER PRIMARY KEY AUTO_INCREMENT,
    NAZIV VARCHAR(255)
);


CREATE TABLE PROIZVOD
(
    ID       NUMBER PRIMARY KEY AUTO_INCREMENT,
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
    ID                  NUMBER PRIMARY KEY AUTO_INCREMENT,
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
    FOREIGN KEY (PROIZVOD_ID) REFERENCES NARUDZBA(ID)
);

INSERT INTO PROIZVOD (NAZIV, OPIS) VALUES ('mis', 'mis za igranje');
INSERT INTO PROIZVOD (NAZIV, OPIS) VALUES ('laptop', 'laptop za igranje');

INSERT INTO NACIN_PLACANJA (NAZIV) VALUES ('KARTIČNO'), ('GOTOVINSKO');