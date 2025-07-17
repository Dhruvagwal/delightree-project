import { StyleSheet } from "react-native";

export const form_styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    color: '#333',
    marginBottom: 5,
    borderRadius: 5,
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  error: { color: 'red', marginBottom: 8, fontSize: 12 },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { color: 'blue', textDecorationLine: 'underline' },
});