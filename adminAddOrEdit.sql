CREATE DEFINER=`root`@`localhost` PROCEDURE `adminAddOrEdit` (
IN _admin_id INT,
IN _admin_name INT,
IN _admin_email INT,
IN _admin_password INT
)
BEGIN
IF _admin_id = 0 THEN
INSERT INTO admins (name, email, password)
VALUES (_admin_name,_admin_email,_admin_password);
ELSE
UPDATE admins
SET
name = _admin_name,
email = _admin_email,
password = _admin_password
WHERE id = admin_id;
END IF;
SELECT _admin_id AS 'admin_id';
END