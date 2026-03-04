import { useCallback, useState } from "react";
import { Alert, View, StatusBar } from "react-native";


import { useFocusEffect, router } from "expo-router";

import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { Target, TargetProps } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";

import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";



export default function Index() {
    const [targets, setTargets] = useState<TargetProps[]>([]);
    const targetDatabase = useTargetDatabase();
    const [isFetching, setIsFetching] = useState(true);
    const [summary, setSummary] = useState<HomeHeaderProps>();
    const transactionsDatabase  = useTransactionsDatabase();


    async function  fetchTargets(): Promise<TargetProps[]> {
        try {
            const response = await targetDatabase.listByClosestTarget()
            
            return response.map((item) => ({
                id: String(item.id),
                name: item.name,
                current: numberToCurrency(item.current),
                percentage: item.percentage.toFixed(0) + "%",
                target: numberToCurrency(item.amount)
            }))
            
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as metas.")
            console.log(error);
        }
    }

    async function fetchSummary(): Promise<HomeHeaderProps> {
        try {
            const response = await transactionsDatabase.summary()            

            return {
                total: numberToCurrency(response.input + response.output),
                input: {
                    label: "Entradas",
                    value: numberToCurrency(response.input)
                },
                output: {
                    label:"Saídas",
                    value: numberToCurrency(response.output)
                }
            }
        } catch (error) {
            Alert.alert("Erro", "Não possível carregar o resumo.")
            console.log(error)
        }
    }

    async function fetchData() {
        const targetDataPromise = fetchTargets()
        const dataSummaryPromise = fetchSummary()

       const [targetData, dataSummary] =  await Promise.all([targetDataPromise, dataSummaryPromise]);
       setTargets(targetData);
       setIsFetching(false);
       setSummary(dataSummary)
    }

    useFocusEffect(
        useCallback(() => {fetchData()}, [])
    )

    if(isFetching){
        return(
            <Loading />
        )
    }

    return (
        <View style={{ flex: 1 }}>

            <StatusBar barStyle="light-content"/>

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