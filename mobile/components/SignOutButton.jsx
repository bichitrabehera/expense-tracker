import { Feather } from "@expo/vector-icons";
import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../assets/styles/home.styles";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const [loading, setLoading] = React.useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={handleSignOut}
      accessibilityRole="button"
      disabled={loading}
    >
      <Feather name="log-out" size={20} color="#000" />
    </TouchableOpacity>
  );
};
