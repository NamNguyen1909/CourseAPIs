from tkinter.constants import CASCADE
from tkinter.font import names

from django.db import models
from django.contrib.auth.models import AbstractUser



# Create your models here.

class User(AbstractUser):
    pass

class BaseModel(models.Model): #khi có models.Model thì class sẽ thành enetity class(một model trong Django ORM) - > khi chạy sẽ tạo table trong DB
    active=models.BooleanField(default=True)
    created_date=models.DateTimeField(auto_now_add=True)
    updated_date=models.DateTimeField(auto_now=True)

    class Meta:
        abstract=True

class Category(BaseModel):
    name = models.CharField(max_length=50,unique=True) #max_length bắt buộc phải khai báo

    def __str__(self):
        return self.name

class Course(BaseModel):
    subject= models.CharField(max_length=255)
    description=models.TextField(null=True)
    image= models.ImageField(upload_to='courses/%Y/%m',null=True)
    category= models.ForeignKey(Category, on_delete=models.PROTECT)

    def __str__(self):
        return self.subject

class Lesson(BaseModel):
    subject= models.CharField(max_length=255)
    description=models.TextField(null=True)
    image= models.ImageField(upload_to='lessons/%Y/%m',null=True)
    course= models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return self.subject

    class Meta:
        unique_together=('subject','course')