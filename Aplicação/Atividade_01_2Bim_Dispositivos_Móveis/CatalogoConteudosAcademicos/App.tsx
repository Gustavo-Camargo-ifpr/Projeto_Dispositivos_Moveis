import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";

import ItemCatalogo from "./src/components/ItemCatalogo/ItemCatalogo";
import { styles } from "./src/styles/styles";

type Material = {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
};

export default function App() {
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);

  const materiais: Material[] = [
    {
      id: "1",
      nome: "Oficina de React Native",
      descricao: "Introdução ao desenvolvimento mobile.",
      categoria: "Oficina",
    },
    {
      id: "2",
      nome: "E-book de Git",
      descricao: "Conceitos básicos de versionamento.",
      categoria: "E-book",
    },
    {
      id: "3",
      nome: "Guia de PostgreSQL",
      descricao: "Fundamentos de banco de dados.",
      categoria: "Publicação",
    },
    {
      id: "4",
      nome: "Manual de TypeScript",
      descricao: "Tipagem no JavaScript.",
      categoria: "E-book",
    },
    {
      id: "5",
      nome: "Introdução ao NestJS",
      descricao: "Criação de APIs com Node.js.",
      categoria: "Oficina",
    },
  ];

  function selecionarMaterial() {
    setQuantidadeSelecionada(quantidadeSelecionada + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Catálogo de Materiais Acadêmicos
      </Text>

      <Text style={styles.subtitulo}>
        Materiais disponíveis em projetos de extensão.
      </Text>

      <Text style={styles.contador}>
        Materiais selecionados: {quantidadeSelecionada}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollCategorias}
      >
        <Text style={styles.categoria}>Oficinas</Text>

        <Text style={styles.categoria}>E-books</Text>

        <Text style={styles.categoria}>Publicações</Text>
      </ScrollView>

      <FlatList
        data={materiais}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCatalogo
            nome={item.nome}
            descricao={item.descricao}
            categoria={item.categoria}
          >
            <Pressable
              style={styles.botao}
              onPress={selecionarMaterial}
            >
              <Text style={styles.textoBotao}>
                Selecionar
              </Text>
            </Pressable>
          </ItemCatalogo>
        )}
      />
    </View>
  );
}