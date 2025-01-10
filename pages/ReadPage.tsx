import React, {useState} from 'react';
import {Alert, Button, Text} from 'react-native';
import { MenuWrapper } from "../components/Menu";
import NfcManager, {Ndef, NfcTech} from "react-native-nfc-manager";

export default function ReadPage() {

    const [tagContent, setTagContent] = useState<string | null>(null);

    const readNfcTag = async () => {
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);

            const tag = await NfcManager.getTag();
            console.log('Tag NFC lu :', JSON.stringify(tag, null, 2));

            if (tag?.ndefMessage) {
                const record = tag.ndefMessage[0];
                console.log('Enregistrement NFC :', record);

                // Vérifie et convertit `record.type` en tableau de nombres
                const typeArray = Array.isArray(record.type) ? record.type : [];
                const type = String.fromCharCode(...typeArray);
                const payload = Uint8Array.from(record.payload);

                let text = '';

                // Identifier le type d'enregistrement
                if (type === 'U') {
                    // Type URI
                    text = Ndef.uri.decodePayload(payload);
                } else if (type === 'T') {
                    // Type Texte
                    text = Ndef.text.decodePayload(payload);
                } else {
                    text = `Type de contenu non supporté : ${type}`;
                }

                setTagContent(text);
                Alert.alert('Tag NFC lu', text);
            } else {
                setTagContent('Aucun contenu détecté sur le tag.');
                Alert.alert('Erreur', 'Tag vide ou non lisible.');
            }
        } catch (error) {
            console.warn(error);
            Alert.alert('Erreur', 'Impossible de lire le tag NFC.');
        } finally {
            await NfcManager.cancelTechnologyRequest();
        }
    };

    return (
        <MenuWrapper active="Read">            <Text>Lecture de Tag NFC</Text>
            <Button title="Lire un Tag NFC" onPress={readNfcTag} />
            {tagContent && <Text>{`Contenu du tag : ${tagContent}`}</Text>}
        </MenuWrapper>
    );

}
