CREATE TABLE [employee_name] (
  [id] int PRIMARY KEY,
  [full_name] nvarchar(255),
  [department] nvarchar(255),
  [computer] nvarchar(255)
)
GO

CREATE TABLE [employee_department] (
  [id] int PRIMARY KEY,
  [employee_name] nvarchar(255),
  [department_name] nvarchar(255)
)
GO

CREATE TABLE [employee_computer] (
  [id] int PRIMARY KEY,
  [employee_name] nvarchar(255),
  [computer_name] nvarchar(255)
)
GO

ALTER TABLE [employee_name] ADD FOREIGN KEY ([department]) REFERENCES [employee_department] ([department_name])
GO

ALTER TABLE [employee_name] ADD FOREIGN KEY ([full_name]) REFERENCES [employee_department] ([employee_name])
GO

ALTER TABLE [employee_name] ADD FOREIGN KEY ([computer]) REFERENCES [employee_computer] ([computer_name])
GO

ALTER TABLE [employee_name] ADD FOREIGN KEY ([full_name]) REFERENCES [employee_computer] ([employee_name])
GO
