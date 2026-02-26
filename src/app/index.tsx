import { View } from "react-native";
import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";


const summary = {
    total: "R$ 2.680,00",
    input: { label: "Entradas", value: "R$ 6,184.90" },
    output: { label: "Saídas", value: "-R$ 883.65" },
}

const targets = [
    {
        id: "1",
        name: "Apple Watch",
        percentage: "50%",
        current: "R$ 580,00",
        target: "R$ 1.790,00",
    },
    {
        id: "2",
        name: "Comprar uma cadeira ergonômica",
        percentage: "75%",
        current: "R$ 900,00",
        target: "R$ 1.200,00",
    },
    {
        id: "3",
        name: "Fazer uma viagem para o Rio de Janeiro",
        percentage: "55%",
        current: "R$ 1.200,00",
        target: "R$ 3.200,00",
    },
]

export default function Index() {

    return (
        <View style={{ flex: 1 }}>

            <StatusBar style="light"/>

            <HomeHeader data={summary} />


            <List
                title="Metas"
                data={targets}
                renderItem={({ item }) => <Target data={item}  onPress={() => router.navigate(`/in-progress/${item.id}`)}/>}
                keyExtractor={(item) => item.id}
                emptyMessage="Nenhuma Meta. Toque em nova meta para criar!"
                containerStyle={{ paddingHorizontal: 24 }}
            />

            <View style={{padding: 24, paddingBottom: 32}}>
                <Button title="Nova Meta" onPress={() => router.navigate("/target")}/>
            </View>
        </View>
    )
}