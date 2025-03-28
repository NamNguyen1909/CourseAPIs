from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from django.db.models import CASCADE
from cloudinary.models import CloudinaryField

# Create your models here.

class User(AbstractUser):
    avatar=CloudinaryField(null=True)

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
    image= CloudinaryField()
    category= models.ForeignKey(Category, on_delete=models.PROTECT)

    def __str__(self):
        return self.subject

    class Meta:
        ordering=['-id']

class Lesson(BaseModel):
    subject= models.CharField(max_length=255)
    content=RichTextField(null=True)
    image= CloudinaryField()
    course= models.ForeignKey(Course, on_delete=models.CASCADE)
    tags=models.ManyToManyField('Tag')

    def __str__(self):
        return self.subject

    class Meta:
        unique_together=('subject','course')

class Tag(BaseModel):
    name = models.CharField(max_length=50,unique=True) #max_length bắt buộc phải khai báo

    def __str__(self):
        return self.name

class Interaction(BaseModel):
    lesson=models.ForeignKey(Lesson,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)

    class Meta:
        abstract=True

class Comment(Interaction):
    content=models.CharField(max_length=255)

    def __str__(self):
        return self.content

class Like(Interaction):
    class Meta:
        unique_together:('user','lesson')