import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../styles/styles";

type Props = {
  nome: string;
  descricao: string;
  categoria: string;
  children?: React.ReactNode;
};

export default function ItemCatalogo({
  nome,
  descricao,
  categoria,
  children,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.nomeMaterial}>
        {nome}
      </Text>

      <Text style={styles.descricao}>
        {descricao}
      </Text>

      <Text style={styles.tipo}>
        Categoria: {categoria}
      </Text>

      {children}
    </View>
  );
}