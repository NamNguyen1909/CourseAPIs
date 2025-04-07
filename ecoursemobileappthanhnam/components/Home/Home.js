import MyStyles from "../../styles/MyStyles";
import { useEffect, useState } from "react";
import { FlatList, Image, Text,View } from "react-native";
import { ActivityIndicator, Chip, List, Searchbar } from "react-native-paper";
import Apis, { endpoints } from "../../configs/Apis";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const [categories,setCategories]=useState([]);
    const [courses,setCourses]=useState([]);
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [q,setQ]=useState([]);
    const [cateId,setCateId]=useState(null);
    const nav =useNavigation();



    const loadCates=async () => {
        let res = await Apis.get(endpoints['categories']);
        setCategories(res.data);
    }

    // useEffect(() => {
    //     // Khi `q` hoặc `cateId` thay đổi, reset lại danh sách khóa học và trang
    //     setCourses([]); // Xóa danh sách cũ
    //     setPage(1); // Reset về trang đầu
    // }, [q, cateId]);

    const loadCourses = async() => {
        if (page>0) {
            try {
                setLoading(true);
                let url =`${endpoints['courses']}?page=${page}`;
    
                if (q){
                    url=`${url}&q=${q}`;
                }
    
                if (cateId){
                    url=`${url}&category_id=${cateId}`;
                }
    
                let res =await Apis.get(url);
                //array destructuring 
                setCourses([...courses,...res.data.results]);
                // Kiểm tra nếu không còn dữ liệu thì quay về trang đầu
                if (res.data.next===null)
                    setPage(0);
            } catch {
                //...
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(()=>{
        loadCates();
    },[]);

    
    useEffect(()=>{
        let timer =setTimeout(()=> {
            loadCourses();
        },500);
        return ()=> clearTimeout(timer)
    },[q,page,cateId]);

    const loadMore= ()=> {
        if (!loading && page>0)
            setPage(page+1);
    }

    // Hàm chung reset lại danh sách khóa học và trang
    // Khi người dùng chọn danh mục hoặc tìm kiếm
    const search=(value,callback) => {
        setPage(1); // Reset về trang đầu
        setCourses([]); // Xóa danh sách cũ
        callback(value); // Cập nhật giá trị tìm kiếm hoặc danh mục
    }
    return (
        <SafeAreaView style={[MyStyles.container,MyStyles.p]}>
            <Text style={MyStyles.subject}>DANH SÁCH KHOÁ HỌC</Text>

            {/* Danh sách danh mục */}
            <View style={[MyStyles.row,MyStyles.wrap]}>

                <TouchableOpacity onPress={()=>search(null,setCateId)}>
                    <Chip  icon="label" style={MyStyles.m}>Tất cả</Chip>
                </TouchableOpacity>

                {/* {categories.map(c=><TouchableOpacity key={c.id} onPress={()=>search(c.id,setCateId)}>
                    <Chip icon="label" style={MyStyles.m}>{c.name}</Chip>
                </TouchableOpacity>)} */}
                {categories.map((c, index) => (
                    <TouchableOpacity key={`${c.id}-${index}`} onPress={() => search(c.id, setCateId)}>
                        <Chip icon="label" style={MyStyles.m}>{c.name}</Chip>
                    </TouchableOpacity>
                ))}

            </View>

            {/* Khung tìm kiếm */}
            <Searchbar
                placeholder="Tìm kiếm khóa học..."
                onChangeText={t=> search(t,setQ)}
                value={q}
            />
            
            {/* Danh sách khóa học */}
            <FlatList
                data={courses}
                onEndReached={loadMore}
                ListFooterComponent={loading && <ActivityIndicator />}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.subject}
                        description={item.created_date}
                        left={() => (
                            <TouchableOpacity onPress={() => nav.navigate("Lesson", { courseId: item.id })}>
                                <Image
                                    style={MyStyles.avatar}
                                    source={{ uri: item.image }}
                                />
                            </TouchableOpacity>
                        )}
                    />
                )}
            />
        </SafeAreaView>
    );
}
export default Home;