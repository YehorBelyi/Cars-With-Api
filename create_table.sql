CREATE TABLE Autos(
	id int identity(1,1) primary key,
	[name] nvarchar(50) not null check ([name]<>''),
	quantity int not null,
	[image_url] nvarchar(150) not null
)

