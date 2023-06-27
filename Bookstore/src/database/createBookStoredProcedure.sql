
-- create new book stored procedure
CREATE OR ALTER PROCEDURE CreateBook
@BookID INT,
@Title VARCHAR (255),
@Author VARCHAR (255),
@PublicationYear DATE,
@Status VARCHAR (255)
AS
BEGIN 
        DECLARE @BookID INT
SELECT @BookID = ISNULL(MAX(@BookID),0) +1 from Books
INSERT INTO dbo.Books (BookID, Title , Author, PublicationYear, Status)
VALUES (@BookID, @Title, @Author, @PublicationYear, @Status);
END;

 -- Return the generated BookID
    SELECT @BookIDID AS GeneratedBookID;

-- EXEC CreateBook 108, 'The Rock', 'Jane rael', '1814-12-10', 'Available';


--- select book by BookID
CREATE PROCEDURE fetchBookID(
    @ID INT
)
AS 
BEGIN 
    SELECT *
    FROM dbo.Books 
    WHERE BookID = @ID;
END;    


EXEC fetchBookByID 
@ID = 103  




