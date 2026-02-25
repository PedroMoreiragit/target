import { Stack } from "expo-router";

import { colors } from "@/theme/colors";
import { useFonts } from "expo-font"
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
} from "@expo-google-fonts/inter";
import { Loading } from "@/components/Loading";

export default function Layout() {

    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold
    })

    if (!fontLoaded) {
        return (
            <Loading />
        )
    }

    return (
        <Stack screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.white }
        }} />
    )
}