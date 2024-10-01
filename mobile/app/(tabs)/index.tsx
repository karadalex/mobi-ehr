// DashboardScreen.js

import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Linking } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const DashboardScreen = () => {
  // Mock data for demonstration
  const healthInfo = {
    name: 'Jane Doe',
    age: 29,
    bloodType: 'A+',
    allergies: 'None',
  };

  const medications = [
    { name: 'Atorvastatin', dose: '20mg', frequency: 'Once daily' },
    { name: 'Metformin', dose: '500mg', frequency: 'Twice daily' },
  ];

  const vitalSigns = {
    heartRate: [72, 75, 78, 76, 74, 73, 72],
    bloodPressureSystolic: [120, 118, 122, 119, 121, 117, 120],
    bloodPressureDiastolic: [80, 78, 82, 79, 81, 77, 80],
  };

  const healthResources = [
    { title: 'Healthy Eating', url: 'https://www.choosemyplate.gov/' },
    { title: 'Exercise Guidelines', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity' },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(34, 139, 230, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '3',
      strokeWidth: '1',
      stroke: '#1E90FF',
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Basic Health Information */}
      <Card style={styles.card}>
        <Card.Title title="Basic Health Information" />
        <Card.Content>
          <Paragraph>Name: {healthInfo.name}</Paragraph>
          <Paragraph>Age: {healthInfo.age}</Paragraph>
          <Paragraph>Blood Type: {healthInfo.bloodType}</Paragraph>
          <Paragraph>Allergies: {healthInfo.allergies}</Paragraph>
        </Card.Content>
      </Card>

      {/* Medications Card */}
      <Card style={styles.card}>
        <Card.Title title="Medications" />
        <Card.Content>
          {medications.map((medication, index) => (
            <View key={index} style={styles.medicationItem}>
              <Title style={styles.medicationName}>{medication.name}</Title>
              <Paragraph>
                Dose: {medication.dose} - {medication.frequency}
              </Paragraph>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Vital Signs Graphs */}
      <Card style={styles.card}>
        <Card.Title title="Vital Signs" />
        <Card.Content>
          <Title style={styles.chartTitle}>Heart Rate (bpm)</Title>
          <LineChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  data: vitalSigns.heartRate,
                },
              ],
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisSuffix=" bpm"
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />

          <Title style={styles.chartTitle}>Blood Pressure (mmHg)</Title>
          <LineChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  data: vitalSigns.bloodPressureSystolic,
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red
                  strokeWidth: 2,
                },
                {
                  data: vitalSigns.bloodPressureDiastolic,
                  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue
                  strokeWidth: 2,
                },
              ],
              legend: ['Systolic', 'Diastolic'],
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisSuffix=" mmHg"
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Links to Health Resources */}
      <Card style={styles.card}>
        <Card.Title title="Health Resources" />
        <Card.Content>
          {healthResources.map((resource, index) => (
            <Button
              key={index}
              mode="contained"
              onPress={() => Linking.openURL(resource.url)}
              style={styles.resourceButton}
            >
              {resource.title}
            </Button>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 15,
    borderRadius: 8,
  },
  medicationItem: {
    marginBottom: 10,
  },
  medicationName: {
    fontSize: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartTitle: {
    marginVertical: 8,
    fontSize: 16,
  },
  resourceButton: {
    marginBottom: 10,
  },
});

export default DashboardScreen;