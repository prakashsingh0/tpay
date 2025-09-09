import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'



const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor:"lightblue",
            tabBarInactiveTintColor:'#9ca3af',
            tabBarStyle:{
                backgroundColor:'#1e293b',
                borderTopWidth:1,
                borderTopColor:'yellow',
                height:90,
                paddingBottom:30,
                paddingTop:10
            },
            tabBarLabelStyle:{
                fontSize:12,
                fontWeight:600,
            },
            headerShown:false
        }}>
           
            <Tabs.Screen
                name='index'
                options={{
                    title: "Home",
                    tabBarIcon:({color,size})=>(
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }} />
                {/* <Tabs.Screen
                name='qrscan'
                options={{
                    title: "Scan",
                    tabBarIcon:({color,size})=>(
                        <Ionicons name="camera" size={size} color={color} />
                    ),
                }} /> */}
               
                <Tabs.Screen
                name='history'
                options={{
                    title: "History",
                    tabBarIcon:({color,size})=>(
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }} />
                
        </Tabs>
    )
}

export default TabsLayout