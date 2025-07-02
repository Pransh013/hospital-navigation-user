import { doctorCardStyles } from "@/styles/consultation.styles";
import React from "react";
import { Image, Text, View } from "react-native";

const DoctorCard = ({
  name,
  designation,
}: {
  name: string;
  designation: string;
}) => {
  return (
    <View style={doctorCardStyles.container}>
      <Image
        source={require("@/assets/images/maleDoctor.png")}
        style={doctorCardStyles.image}
      />
      <View style={doctorCardStyles.infoContainer}>
        <View>
          <Text style={doctorCardStyles.name}>Dr. {name}</Text>
          <View style={doctorCardStyles.specialityRow}>
            <Text style={doctorCardStyles.speciality}>{designation}</Text>
          </View>
        </View>
        <View style={doctorCardStyles.statsRow}>
          <View style={doctorCardStyles.statItem}>
            <Text style={doctorCardStyles.statLabel}>Experience</Text>
            <Text style={doctorCardStyles.statValue}>6 years</Text>
          </View>
          <View style={doctorCardStyles.statItem}>
            <Text style={doctorCardStyles.statLabel}>Treated</Text>
            <Text style={doctorCardStyles.statValue}>50+</Text>
          </View>
          <View style={doctorCardStyles.statItem}>
            <Text style={doctorCardStyles.statLabel}>Rating</Text>
            <Text style={doctorCardStyles.statValue}>4.3 ⭐</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoctorCard;
