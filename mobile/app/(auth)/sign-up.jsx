import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      setError("");
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Sign-up failed", "Please check your email and password.");
      setError("Failed to sign up. Please check your input.");
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      setError("");
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/");
      } else {
        setError("Verification incomplete. Please try again.");
        Alert.alert("Verification incomplete", "Please try again.");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError("Invalid verification code.");
      Alert.alert(
        "Invalid code",
        "The verification code you entered is invalid."
      );
    }
  };

  if (pendingVerification) {
    return (
      <View style={[styles.container, styles.verificationContainer]}>
        <View style={styles.verificationHeader}>
          <MaterialCommunityIcons
            name="email-check-outline"
            size={48}
            color="#0277BD"
            style={styles.verificationIcon}
          />
          <Text style={styles.verificationHeading}>Verify Your Email</Text>
        </View>

        <Text style={styles.verificationText}>
          We've sent a 6-digit code to your email address. Please enter it below
          to verify your account.
        </Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Verification Code</Text>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons
              name="key-outline"
              size={22}
              color="#222"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={code}
              placeholder="XXXXXX"
              placeholderTextColor="#888"
              onChangeText={setCode}
              keyboardType="number-pad"
              autoFocus
              textContentType="oneTimeCode"
              maxLength={6}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.verifyButton]}
          onPress={onVerifyPress}
          disabled={!code}
        >
          <Text style={styles.buttonText}>Verify Account</Text>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendLink} onPress={onSignUpPress}>
          <Text style={styles.resendText}>Didn't receive a code? Resend</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.heading}>Create Your Account</Text>
        <Text style={styles.subtitle}>
          Join ClearSpend to start tracking your expenses effortlessly
        </Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color="#222"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              value={emailAddress}
              placeholder="your@email.com"
              placeholderTextColor="#888"
              onChangeText={setEmailAddress}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={22}
              color="#222"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Create a password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={setPassword}
              textContentType="password"
              autoComplete="password"
            />
          </View>
          <Text style={styles.passwordHint}>
            Use at least 8 characters with a mix of letters and numbers
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            !(emailAddress && password) && styles.buttonDisabled,
          ]}
          onPress={onSignUpPress}
          disabled={!(emailAddress && password)}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Link href="/sign-in" style={styles.footerLink}>
          <Text style={styles.footerLinkText}> Sign In</Text>
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    backgroundColor: "#fff",
    justifyContent:"center"
  },
  verificationContainer: {
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  verificationHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  verificationIcon: {
    marginBottom: 16,
  },
  verificationHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 8,
  },
  verificationText: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 300,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    height: "100%",
  },
  passwordHint: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
    marginLeft: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0277BD",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  verifyButton: {
    marginTop: 32,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#000",
  },
  footerLink: {
    textDecorationLine: "none",
  },
  footerLinkText: {
    fontSize: 14,
    color: "#0277BD",
    fontWeight: "500",
  },
  resendLink: {
    alignSelf: "center",
    marginTop: 24,
  },
  resendText: {
    fontSize: 14,
    color: "#0277BD",
    fontWeight: "500",
  },
});
