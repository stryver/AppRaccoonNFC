import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigation from "./components/AppNavigator";

function App(): React.JSX.Element {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNavigation />
        </GestureHandlerRootView>
    );
}

export default App;
