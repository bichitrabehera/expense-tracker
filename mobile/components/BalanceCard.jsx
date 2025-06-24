import { View, Text , StyleSheet } from "react-native";
// import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

// Utility function for consistent currency formatting
const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);

export const BalanceCard = ({
  summary = { balance: 0, income: 0, expense: 0 },
}) => {
  return (
    <View style={styles.balanceCard}>
      <View style={styles.balanceHeader}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <View style={styles.balancePill}>
          <Text style={styles.balancePillText}>Current</Text>
        </View>
      </View>
      
      <Text style={styles.balanceAmount}>
        {formatCurrency(summary.balance)}
      </Text>

      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <View style={styles.statIconContainer}>
            <View style={[styles.statIcon, { backgroundColor: COLORS.income }]} />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.balanceStatLabel}>Income</Text>
            <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
              +{formatCurrency(summary.income)}
            </Text>
          </View>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.balanceStatItem}>
          <View style={styles.statIconContainer}>
            <View style={[styles.statIcon, { backgroundColor: COLORS.expense }]} />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.balanceStatLabel}>Expenses</Text>
            <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
              -{formatCurrency(Math.abs(summary.expense))}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  balancePill: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  balancePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
  },
  balanceStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    marginRight: 10,
  },
  statIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statTextContainer: {
    flex: 1,
  },
  balanceStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  balanceStatAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 12,
  },
});