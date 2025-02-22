from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.index), #callback
# gọi views.index() sẽ sai,views.index() sẽ được gọi ngay khi Django đọc file urls.py, nhưng lúc này chưa có request nào.
# path() cần một hàm (callable), nhưng views.index() trả về một HttpResponse, không phải function.
]