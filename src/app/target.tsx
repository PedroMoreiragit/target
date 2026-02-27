import { View } from "react-native";

import { CurrencyInput } from "@/components/CurrencyInput";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Target() {
    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader title="Meta" subtitle="Economize para alcançar sua meta financeira." />

            <View style={{ marginTop: 32, gap: 24 }}>

                <Input label="Nome da meta" placeholder="Ex: Viagem para praia, 5090" />

                <CurrencyInput label="Valor alvo" value={0}/>

                <Button title="Salvar" />

            </View>

        </View>
    )
}