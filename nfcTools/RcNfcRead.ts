import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import { Alert } from "react-native";

export const RcNfcRead = async () => {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();

    if (tag?.ndefMessage) {
      const record = tag.ndefMessage[0];

      const typeArray = Array.isArray(record.type) ? record.type : [];
      const type = String.fromCharCode(...typeArray);
      const payload = Uint8Array.from(record.payload);

      let text = "";

      if (type === "U") {
        // Type URI
        text = Ndef.uri.decodePayload(payload);
      } else if (type === "T") {
        // Type Texte
        text = Ndef.text.decodePayload(payload);
      } else {
        text = `Type de contenu non supporté : ${type}`;
      }
      return text;
    } else {
      return "Aucun contenu détecté sur le tag.";
      Alert.alert("Erreur", "Tag vide ou non lisible.");
    }
  } catch (error) {
    console.warn(error);
    Alert.alert("Erreur", "Impossible de lire le tag NFC.");
  } finally {
    await NfcManager.cancelTechnologyRequest();
  }
};
