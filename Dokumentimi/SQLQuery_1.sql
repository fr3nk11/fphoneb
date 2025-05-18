-- Kontrollo dhe fshi databazen ekzistuese nese eshte e nevojshme
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'FPhone')
BEGIN
    DROP DATABASE FPhone;
END
GO

-- Krijo databazen FPhone
CREATE DATABASE FPhone;
GO

-- Përdor databazën FPhone
USE FPhone;
GO

-- Krijo tabelën 'Perdoruesit'
CREATE TABLE Perdoruesit (
    PerdoruesID INT PRIMARY KEY,
    Emri NVARCHAR(100),
    Mbiemri NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE,
    Fjalekalimi NVARCHAR(100),
    Roli NVARCHAR(50)
);
GO

-- Krijo tabelën 'Produktet'
CREATE TABLE Produktet (
    ProduktID INT PRIMARY KEY,
    Emri NVARCHAR(100),
    Cmimi DECIMAL(10, 2),
    Kategoria NVARCHAR(50),
    Stoku INT
);
GO

-- Krijo tabelën 'Porosite'
CREATE TABLE Porosite (
    PorosiID INT PRIMARY KEY,
    PerdoruesID INT,
    Data DATETIME,
    Statusi NVARCHAR(50),
    FOREIGN KEY (PerdoruesID) REFERENCES Perdoruesit(PerdoruesID)
);
GO

-- Krijo tabelën 'Detajet_e_Porosise'
CREATE TABLE Detajet_e_Porosise (
    DetajID INT PRIMARY KEY,
    PorosiID INT,
    ProduktID INT,
    Sasi INT,
    FOREIGN KEY (PorosiID) REFERENCES Porosite(PorosiID),
    FOREIGN KEY (ProduktID) REFERENCES Produktet(ProduktID)
);
GO

-- Krijo tabelën 'Pagesat'
CREATE TABLE Pagesat (
    PagaID INT PRIMARY KEY,
    PorosiID INT,
    Shuma DECIMAL(10, 2),
    Data_Pageses DATETIME,
    FOREIGN KEY (PorosiID) REFERENCES Porosite(PorosiID)
);
GO

-- Krijo triggerin per uljen e stokut
CREATE TRIGGER trg_UlStokun
ON Detajet_e_Porosise
FOR INSERT
AS
BEGIN
    UPDATE Produktet
    SET Stoku = Stoku - (SELECT Sasi FROM inserted WHERE inserted.ProduktID = Produktet.ProduktID)
    WHERE Produktet.ProduktID IN (SELECT ProduktID FROM inserted);
END;
GO

-- Krijo proceduren per shtimin e nje perdoruesi
CREATE PROCEDURE Shto_Perdorues
    @Emri NVARCHAR(100),
    @Mbiemri NVARCHAR(100),
    @Email NVARCHAR(100),
    @Fjalekalimi NVARCHAR(100),
    @Roli NVARCHAR(50)
AS
BEGIN
    INSERT INTO Perdoruesit (Emri, Mbiemri, Email, Fjalekalimi, Roli)
    VALUES (@Emri, @Mbiemri, @Email, @Fjalekalimi, @Roli);
END;
GO

-- Krijo view per shikimin e porosive te perdoruesve
CREATE VIEW Shiko_Porosite_Perdoruesit AS
SELECT p.PerdoruesID, p.Emri, p.Mbiemri, po.PorosID, po.Data, po.Statusi
FROM Perdoruesit p
INNER JOIN Porosite po ON p.PerdoruesID = po.PerdoruesID;
GO

-- Krijo view per shfaqjen e produkteve me stok te ulet
CREATE VIEW Produktet_Stok_Ulet AS
SELECT ProduktID, Emri, Stoku
FROM Produktet
WHERE Stoku < 5;
GO

-- Krijo rolet dhe lejet
-- Krijo rolin Administrator dhe dhene te drejtat
CREATE ROLE Administrator;
GRANT SELECT, INSERT, UPDATE, DELETE ON DATABASE::FPhone TO Administrator;
GO

-- Krijo rolin Perdorues dhe dhene te drejtat
CREATE ROLE Perdorues;
GRANT SELECT, INSERT ON DATABASE::FPhone TO Perdorues;
GO
