import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 15,
    marginBottom: 15,
  },

  contador: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },

  scrollCategorias: {
    maxHeight: 50,
    marginBottom: 20,
  },

  categoria: {
    backgroundColor: "#d9d9d9",
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
  },

  card: {
    backgroundColor: "#f4f4f4",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,

    flexDirection: "column",
    justifyContent: "center",
  },

  nomeMaterial: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  descricao: {
    marginBottom: 8,
  },

  tipo: {
    marginBottom: 12,
    fontStyle: "italic",
  },

  botao: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",

    backgroundColor: "#4f6bed",
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});