import { Text, View, Button } from "react-native";
import { router } from "expo-router";
import { fontFamily } from "@/theme/fontFamily";



export default function index() {

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontFamily: fontFamily.bold }}>Olá, Expo Router</Text>
            <Button title="Nova Meta" onPress={() => router.navigate("/target")}></Button>
            <Button title="Transação" onPress={() => router.navigate("/transaction/129222")}></Button>
            <Button title="Progresso" onPress={() => router.navigate("/in-progress/12")}></Button>
        </View>
    )
}