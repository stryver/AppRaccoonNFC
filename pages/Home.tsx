import React, { useState } from "react";
import { View, Text, Button, Alert, TextInput } from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { MenuWrapper } from "../components/Menu";

NfcManager.start();

export default function Home() {
  const [message, setMessage] = useState("");

  const writeNfcTag = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(message)]);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        Alert.alert("Succès", "Message écrit sur le tag NFC !");
      }
    } catch (ex) {
      console.warn(ex);
      Alert.alert("Erreur", "Impossible d'écrire sur le tag NFC.");
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <MenuWrapper active="Home">
      <Text>Pas utilisée</Text>
    </MenuWrapper>
  );
}
