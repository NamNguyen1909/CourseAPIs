from tkinter.constants import CASCADE
from tkinter.font import names

from django.db import models

# Create your models here.
class Category(models.Model): #khi có models.Model thì class sẽ thành enetity class(một model trong Django ORM) - > khi chạy sẽ tạo table trong DB
    name = models.CharField(max_length=50,unique=True) #max_length bắt buộc phải khai báo

    def __str__(self):
        return self.name

class Course(models.Model):
    subject= models.CharField(max_length=100)
    description=models.TextField(null=True)
    image= models.ImageField(upload_to='courses/%Y/%m',null=True)
    category= models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.subject