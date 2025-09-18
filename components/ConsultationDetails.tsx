import { consultationDetailsStyles } from "@/styles/consultation.styles";
import { Text, View } from "react-native";

const ConsultationDetails = ({
  date,
  startTime,
  endTime,
}: {
  date: string;
  startTime: string;
  endTime: string;
}) => {
  return (
    <View style={consultationDetailsStyles.container}>
      <View style={consultationDetailsStyles.detailContainer}>
        <View style={consultationDetailsStyles.detailItem}>
          <Text style={consultationDetailsStyles.label}>Date</Text>
          <Text style={consultationDetailsStyles.value}>{date}</Text>
        </View>
        <View style={consultationDetailsStyles.divider} />
        <View style={consultationDetailsStyles.detailItem}>
          <Text style={consultationDetailsStyles.label}>Time</Text>
          <View style={consultationDetailsStyles.timeRow}>
            <Text style={consultationDetailsStyles.value}>{startTime}</Text>
            <Text style={consultationDetailsStyles.toText}>-</Text>
            <Text style={consultationDetailsStyles.value}>{endTime}</Text>
          </View>
        </View>
      </View>
      <View style={consultationDetailsStyles.detailContainer}>
        <View style={consultationDetailsStyles.detailItem}>
          <Text style={consultationDetailsStyles.label}>Floor</Text>
          <Text style={consultationDetailsStyles.value}>04</Text>
        </View>
        <View style={consultationDetailsStyles.divider} />
        <View style={consultationDetailsStyles.detailItem}>
          <Text style={consultationDetailsStyles.label}>Room</Text>
          <Text style={consultationDetailsStyles.value}>08</Text>
        </View>
      </View>
    </View>
  );
};

export default ConsultationDetails;
