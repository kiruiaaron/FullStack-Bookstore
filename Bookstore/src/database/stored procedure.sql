
--select member by id
CREATE OR ALTER PROCEDURE select_member_id
    @id INT
AS
BEGIN
    SELECT *
    FROM Members
    WHERE MemberID = @id;
END;

--select member by email
CREATE OR ALTER PROCEDURE select_member_Email
    @EmailAddress VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Members
    WHERE EmailAddress = @EmailAddress;
END;

exec select_member_Email
@EmailAddress ="cosmars@gmail.com"

select * from Members

--Add new member
CREATE OR ALTER PROCEDURE add_New_Member
    @name VARCHAR(255),
    @EmailAddress VARCHAR(255),
    @Password VARCHAR(1000)
AS
BEGIN
    DECLARE @MemberID INT;

    -- Retrieve the last used MemberID and increment it by 1
    SELECT @MemberID = ISNULL(MAX(MemberID), 0) + 1 FROM Members;

    -- Insert the new member with the generated MemberID
    INSERT INTO Members (MemberID, Name, EmailAddress, Password)
    VALUES (@MemberID, @name, @EmailAddress, @Password);

    -- Return the generated MemberID
    SELECT @MemberID AS GeneratedMemberID;
END;
GO


--get all members who have borrowed a book
CREATE OR ALTER PROCEDURE getMembersWithBorrowedBook
AS
BEGIN
SELECT DISTINCT M.*
FROM Members M
JOIN Loans L ON M.MemberID =L.MemberID
END






