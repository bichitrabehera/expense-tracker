import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils";

// Define icons for each category
const CATEGORY_ICONS = {
  "Fast Food": { name: "hamburger", type: "FontAwesome5" },        // 🍔
  Groceries: { name: "shopping-basket", type: "FontAwesome5" },    // 🛒
  Transport: { name: "car-side", type: "FontAwesome5" },           // 🚗
  Entertainment: { name: "film", type: "FontAwesome5" },           // 🎬
  Bills: { name: "file-invoice-dollar", type: "FontAwesome5" },    // 🧾
  Cash: { name: "money-bill-wave", type: "FontAwesome5" },         // 💵
  Others: { name: "ellipsis-h", type: "FontAwesome5" },            // …
};


export const TransactionItem = ({ item, onDelete }) => {
  const isIncome = parseFloat(item.amount) > 0;
  const icon = CATEGORY_ICONS[item.category] || {
    name: "pricetag-outline",
    type: "Ionicons",
  };

  const IconComponent = icon.type === "FontAwesome5" ? FontAwesome5 : Ionicons;

  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <IconComponent
            name={icon.name}
            size={22}
            color={isIncome ? COLORS.income : COLORS.expense}
          />
        </View>

        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionCategory}>{item.category}</Text>
        </View>

        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: isIncome ? COLORS.income : COLORS.expense },
            ]}
          >
            {isIncome ? "+" : "-"}₹
            {Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(item.created_at)}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};
