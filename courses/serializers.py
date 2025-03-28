from rest_framework import serializers
from courses.models import Category, Course, Lesson, Tag, User, Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ItemSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.image: # and instance.image.name.startswith('image/upload/')
            data['image'] = instance.image.url
        return data

class CourseSerializer(ItemSerializer):
    class Meta:
        model = Course
        fields = ['id', 'subject', 'created_date', 'image', 'category_id']


class LessonSerializer(ItemSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'subject', 'created_date', 'image', 'course_id']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class LessonDetailsSerializer(LessonSerializer):
    tags = TagSerializer(many=True)

    #Xuất trạng thái liek = true/false
    # liked không phải là một trường dữ liệu có sẵn trong model Lesson, mà là một trạng thái phụ thuộc vào người dùng hiện tại
    # tags có sẵn trong model Lesson nên DRF lấy trực tiếp được, còn liked là trạng thái của từng user nên phải kiểm tra thủ công
    liked = serializers.SerializerMethodField()

    def get_liked(self, lesson):
        request = self.context.get('request') # thông tin đưa vào serializer thông qua biến context
        if request and request.user.is_authenticated:
            return lesson.like_set.filter(user=request.user, active=True).exists()
    ###
    
    class Meta:
        model = LessonSerializer.Meta.model
        fields = LessonSerializer.Meta.fields + ['content', 'tags', 'liked']

class UserSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['avatar'] = instance.avatar.url if instance.avatar else ""

        return data

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'avatar']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()
        u = User(**data)
        u.set_password(u.password)
        u.save()

        return u


class CommentSerializer(serializers.ModelSerializer):
    # user = UserSerializer()

    def to_representation(self, instance): # chỉ ảnh hưởng serializer
        data= super().to_representation(instance)
        data['user']=UserSerializer(instance.user).data
        return data

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'updated_date','user','lesson']
        extra_kwargs={
            'lesson': {
                'write_only':True
            }
        }