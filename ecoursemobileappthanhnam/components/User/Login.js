import { View,Text } from "react-native"
import MyStyles from "../../styles/MyStyles"

const Login = () => {

    const info=[{
        label:"Tên đăng nhập",
        field:"usename",
        secureTextEntry:false,
        Icon:"text"
    },{
        label:"Mật khẩu",
        field:"password",
        secureTextEntry:true,
        Icon:"eye"
    }]

    const [user,setUser]=useState({});
    const [msg,setMsg]=useState(null);
    const [loading,setLoading]=useState(false);
    const nav=useNavigation();

    const setState=(field,value)=>{
        setUser({
            ...user,
            [field]:value 
            // bỏ [] để ra đối tượng
        })
    }


    const validate=()=> {
        for (let i of info) {
            if(!(i.field in user)||user[i.field]==="") {
                setMsg(`Vui lòng nhập ${i.label}`);
                return false;
            }
        }

        return true;
    }


    const login=async()=> {
        if(validate()===true) {
            try{
                let res =await Apis.post(endpoints['login'],{
                    ...user,
                    'grant_type':'password',
                    'client_id': 'Vbe8euZZQJoWJ2UzW9wDThg4hJEZHHbhFmnfj7UR',
                    'client_secret': 'cVm4w4hSdy4MtwbP4KuNgXkGPeQJ9yrQdBvXHGR6b3e97F2bYqQ81XJ49FEufzjcw4SKwpuOZQiCLsNelHY1MkuYTGBRcSqtWmSlebSUk27WfyDskCB2VeCQihnEKdZ2'
                });
                console.info(res.data);
                await AsyncStorage.setItem('token',res.data.access_token);
            } catch(ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <ScrollView>
            <HelperText style={MyStyles.m} type="error" visible={msg}>
                {msg}
            </HelperText>
            {info.map(i=><TextInput value={user[i.field]} onChangeText={t=>setState(t,i.field)} style={MyStyles.m} key={`${i.label}${i.field}`} label={i.label} secureTextEntry={i.secureTextEntry} right={<TextInput.Icon Icon={i.Icon}/>}/>)}
            

            <Button onPress={login} disabled={loading} loading={loading} mode='contained-tonal'>Đăng nhập</Button>
        
        </ScrollView>


    );
}

export default Login;