from rest_framework.decorators import action
from rest_framework.response import Response
from courses.models import Category, Course, Lesson, User
from rest_framework import viewsets, generics, status, parsers,permissions
from courses import serializers,paginators


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.filter(active=True)
    serializer_class = serializers.CategorySerializer


class CourseViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Course.objects.filter(active=True)
    serializer_class = serializers.CourseSerializer
    pagination_class = paginators.ItemPaginator

    def get_queryset(self):
        query = self.queryset

        if self.action.__eq__('list'):
            q = self.request.query_params.get('q')
            if q:
                query = query.filter(subject__icontains=q)

            cate_id = self.request.query_params.get('category_id')
            if cate_id:
                query = query.filter(category_id=cate_id)

        return query

    @action(methods=['get'], detail=True, url_path='lessons')
    def get_lessons(self, request, pk):
        lessons = self.get_object().lesson_set.filter(active=True)

        q = request.query_params.get('q')
        if q:
            lessons = lessons.filter(subject__icontains=q)

        return Response(serializers.LessonSerializer(lessons, many=True).data, status=status.HTTP_200_OK)


class LessonViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Lesson.objects.prefetch_related('tags').filter(active=True)
    serializer_class = serializers.LessonDetailsSerializer

    def get_permissions(self):
        if self.action in ['get_comments'] and self.request.method.__eq__('POST'):
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get','post'], detail=True, url_path='comments')
    def get_comments(self, request, pk):
        if request.method.__eq__('POST'):
            s=serializers.CommentSerializer(data={
                'user':request.use.pk,
                'lesson':pk,
                'content':request.data.get('content')
            }) # gửi instance là cập nhật mà gửi data là thêm mới
            s.is_valid(raise_exception=True) #validate
            c=s.save()
            return Response(serializers.CommentSerializer(c).data,status=status.HTTP_201_CREATED)

        comments = self.get_object().comment_set.select_related('user').filter(active=True)
        return Response(serializers.CommentSerializer(comments, many=True).data, status=status.HTTP_200_OK)

    # không dùng generics.UpdateAPIView v api hiện ra ID => not security
class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser]
    # permission_classes = [permissions.IsAuthenticated]để đây thì tất cả phải chứng thực

    @action(methods=['get','patch'],url_path='current-user',detail=False,permission_classes = [permissions.IsAuthenticated]) #detail false để không lộ id => security | để permission_classes p73 đây thì chỉ có cái này cần chứng thực
    def get_current_user(self,request):
        u=request.user
        if request.method.__eq__('PATCH'): #cập nhật
            for k,v in request.data.items():
                if k in ['first_name','last_name']:
                    setattr(u,k,v) # u.k=v
                elif k.__eq__('password'):
                    u.set_password(v)
            u.save()
        return Response(serializers.UserSerializer(u).data)