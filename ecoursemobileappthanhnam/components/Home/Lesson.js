import { ActivityIndicator, List } from "react-native-paper";
import MyStyles from "../../styles/MyStyles"
import { View,Text, TouchableOpacity, FlatList, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Apis, { endpoints } from "../../configs/Apis";


const Lesson = ({route}) => {
    const courseId=route.params?.courseId;

    const [lessons,setLessons]=useState([]);
    const [loading,setLoading]=useState(false);

    const nav =useNavigation();

    const loadLessons = async () => {
        if (courseId) {
            try {
                setLoading(true);
                let res = await Apis.get(endpoints['lessons'](courseId));
                console.info(res.data)
                setLessons(res.data);
                console.info(res.data)
            } catch(ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        loadLessons();
    }, [courseId]);

    return (
        <View>
            <Text style={MyStyles.subject}>Lesson</Text>

            <FlatList
                data={lessons}
                ListFooterComponent={loading && <ActivityIndicator />}
                renderItem={({ item }) => (
                    <List.Item
                        style={MyStyles.listItem}
                        title={item.subject}
                        description={item.created_date}
                        left={() => (
                            <TouchableOpacity>
                                <Image
                                    style={MyStyles.avatar}
                                    source={{ uri: item.image }}
                                />
                            </TouchableOpacity>
                        )}
                    />
                )}
            />
        </View>
    )
}

export default Lesson;