import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { MenuWrapper } from "../components/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faNfcSymbol } from "@fortawesome/free-brands-svg-icons";
import { WaveIndicator } from "react-native-indicators";
import { RcNfcRead } from "../nfcTools";
import { Button } from "@rneui/themed";

export default function ReadPage() {
  const [tagContent, setTagContent] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const readNfcTag = async () => {
    setTagContent(undefined);
    setLoading(true);
    setTagContent(await RcNfcRead());
    setLoading(false);
  };

  return (
    <MenuWrapper active="Read">
      <View style={{ alignItems: "center", marginTop: 40, marginBottom: 40 }}>
        <FontAwesomeIcon icon={faNfcSymbol} size={100} color={"white"} />
      </View>
      <Button
        buttonStyle={{
          backgroundColor: "#2d2a55",
          borderRadius: 5,
          padding: 10,
        }}
        title={loading ? "En attente de lecture" : "Lire un Tag NFC"}
        onPress={readNfcTag}
        disabled={loading}
      />
      {loading && (
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <WaveIndicator size={100} color="#6c8677" />
        </View>
      )}
      {tagContent && (
        <View
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#6c8677",
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Contenu du tag :
          </Text>
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 14,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {tagContent}
          </Text>
        </View>
      )}
    </MenuWrapper>
  );
}
