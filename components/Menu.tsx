import React, { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../types/RootStack";

interface MenuWrapperProps {
    children: ReactNode;
    active: "Read" | "Write" | "Advanced" | "Home";
}

export const MenuWrapper: React.FC<MenuWrapperProps> = ({ children, active }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.menu}>
                <View style={[styles.menuItem, active === "Read" && styles.activeMenuItem]}>
                    <Text
                        style={styles.menuText}
                        onPress={() => navigation.navigate('ReadPage')}
                    >
                        Lire
                    </Text>
                </View>
                <View style={[styles.menuItem, active === "Write" && styles.activeMenuItem]}>
                    <Text style={styles.menuText}>Écrire</Text>
                </View>
                <View style={[styles.menuItem, active === "Advanced" && styles.activeMenuItem]}>
                    <Text style={styles.menuText}>Avancé</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    menu: {
        flexDirection: 'row',
    },
    menuItem: {
        width: "33%",
        backgroundColor: '#30d158',
    },
    activeMenuItem: {
        backgroundColor: "#6200EE",
    },
    menuText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        padding: 10,
    },
    scrollContent: {
        padding: 20,
    },
});
